import { strings } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import { findNodes, getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { parseFragment } from 'parse5';
import type { Attribute } from 'parse5/dist/common/token';
import type { Element } from 'parse5/dist/tree-adapters/default';
import * as ts from 'typescript';

import { getSourceFile } from '../utils';
import { PluginOptions } from './interface';

// includes ng-zorro-antd & @yelon/*
const WHITE_ICONS = [
  // - zorro: https://raw.githubusercontent.com/NG-ZORRO/ng-zorro-antd/master/components/icon/icons.ts
  // new Array(...new Set(document.querySelector('pre').innerText.split('\n').map(t => t.trim()).filter(val => /(Fill|Outline)[,]?$/g.test(val)))).map(v => v.substring(0, v.length - 1))
  'BarsOutline',
  'CalendarOutline',
  'CaretDownFill',
  'CaretDownOutline',
  'CaretUpFill',
  'CaretUpOutline',
  'CheckCircleFill',
  'CheckCircleOutline',
  'CheckOutline',
  'ClockCircleOutline',
  'CloseCircleFill',
  'CloseCircleOutline',
  'CloseOutline',
  'CopyOutline',
  'DeleteOutline',
  'DoubleLeftOutline',
  'DoubleRightOutline',
  'DownOutline',
  'EditOutline',
  'EllipsisOutline',
  'ExclamationCircleFill',
  'ExclamationCircleOutline',
  'EyeOutline',
  'FileFill',
  'FileOutline',
  'FilterFill',
  'InfoCircleFill',
  'InfoCircleOutline',
  'LeftOutline',
  'LoadingOutline',
  'PaperClipOutline',
  'QuestionCircleOutline',
  'RightOutline',
  'RotateLeftOutline',
  'RotateRightOutline',
  'SearchOutline',
  'StarFill',
  'SwapRightOutline',
  'UploadOutline',
  'UpOutline',
  'VerticalAlignTopOutline',
  'ZoomInOutline',
  'ZoomOutOutlin',
  // - @yelon: https://github.com/hbyunzai/yelon/blob/master/packages/theme/src/provide.ts#L15
  'BellOutline',
  'DeleteOutline',
  'PlusOutline',
  'InboxOutline',
  'MenuFoldOutline',
  'MenuUnfoldOutline'
];

const ATTRIBUTES = {
  'nz-input-group': ['nzAddOnBeforeIcon', 'nzAddOnAfterIcon', 'nzPrefixIcon', 'nzSuffixIcon'],
  'nz-avatar': ['nzIcon'],
  'quick-menu': ['icon']
};

const ATTRIBUTE_NAMES = Object.keys(ATTRIBUTES);
// fix parse5 auto ingore lower case all properies
ATTRIBUTE_NAMES.forEach(key => {
  const res: string[] = [];
  (ATTRIBUTES[key] as string[]).forEach(prop => {
    res.push(prop.toLowerCase());
    res.push(`[${prop.toLowerCase()}]`);
  });
  ATTRIBUTES[key] = res;
});

function findIcons(html: string): string[] {
  const res: string[] = [];
  const doc = parseFragment(html);
  const visitNodes = (nodes: Element[]): void => {
    nodes.forEach(node => {
      if (node.attrs) {
        const classIcon = genByClass(node);
        if (classIcon) res.push(classIcon);
        const compIcon = genByComp(node);
        if (compIcon) res.push(...compIcon);
        const attrIcon = genByAttribute(node);
        if (attrIcon) res.push(...attrIcon);
      }

      if (node.childNodes) {
        visitNodes(node.childNodes as Element[]);
      }
    });
  };

  visitNodes(doc.childNodes as Element[]);
  return res;
}

function genByClass(node: Element): string | null {
  const attr = node.attrs.find(a => a.name === 'class');
  if (!attr || !attr.value) return null;
  const match = attr.value.match(/anticon(-\w+)+/g);
  if (!match || match.length === 0) return null;
  return match[0];
}

function genByComp(node: Element): string[] | null {
  if (node.nodeName != 'nz-icon' && !node.attrs.find(attr => attr.name === 'nz-icon')) return null;

  const type = node.attrs.find(attr => ['type', '[type]', 'nztype', '[nztype]'].includes(attr.name));
  if (!type) return null;

  const types = getNgValue(type);
  if (types == null) return null;

  const theme = node.attrs.find(attr => ['theme', '[theme]', 'nztheme', '[nztheme]'].includes(attr.name));
  const themes = getNgValue(theme!);
  if (themes == null || themes.length === 0) return types;

  return [].concat(...types.map(a => themes.map(b => `${a}#${b}`)));
}

function genByAttribute(node: Element): string[] | null {
  if (!ATTRIBUTE_NAMES.includes(node.nodeName)) return null;

  const attributes = ATTRIBUTES[node.nodeName];
  const type = node.attrs.find(attr => attributes.includes(attr.name));
  if (!type) return null;

  const types = getNgValue(type);
  if (types == null) return null;

  return types;
}

function getNgValue(attr: Attribute): string[] | null {
  if (!attr) return null;

  const str = attr.value.trim();
  const templatVarIndex = str.indexOf('{{');

  if (templatVarIndex === -1) {
    // <nz-icon [nzType]="d.status === 'NORMAL' ? 'close1' : 'close2'"></i>
    const conMatch = /\? ['"]([^'"]+)['"] : ['"]([^'"]+)['"]/g.exec(str);
    if (conMatch != null && conMatch.length === 3) {
      return [conMatch[1], conMatch[2]];
    }
  }

  // type="icon"
  // type="{{value ? 'icon' : 'icon' }}"
  // type="align-{{value ? 'icon' : 'icon' }}"
  if (!attr.name.startsWith('[')) {
    const prefix = templatVarIndex > 0 ? str.substring(0, templatVarIndex) : '';
    if (templatVarIndex !== -1) {
      return fixValue(str.substring(templatVarIndex), prefix);
    }
    return [str];
  }

  // ingore {{ }}
  if (templatVarIndex !== -1) return null;

  return fixValue(str, '');
}

function fixValue(str: string, prefix: string): string[] {
  // value ? 'icon' : 'icon'
  // focus ? 'anticon anticon-arrow-down' : 'anticon anticon-search'
  // 'icon'
  const types = str.replace(/anticon anticon-/g, '').match(/['|"|`][-A-Za-z]+['|"|`]/g) || [];
  if (types.length > 0) {
    return types.map(t => prefix + t.replace(/['|"|`]/g, ''));
  }
  return null;
}

function fixTs(tree: Tree, path: string): string[] {
  const source = getSourceFile(tree, path);
  const nodes = getDecoratorMetadata(source, 'Component', '@angular/core');
  if (nodes.length === 0) {
    return [];
  }
  const templateNode = (nodes[0] as ts.ObjectLiteralExpression).properties.find(
    p => p.name!.getText() === `template`
  ) as ts.PropertyAssignment;
  if (!templateNode || !ts.isStringLiteralLike(templateNode.initializer)) {
    return [];
  }

  return findIcons(templateNode.initializer.getText());
}

function getIconNameByClassName(value: string): string | null {
  let res = value.replace(/anticon anticon-/g, '').replace(/anticon-/g, '');

  if (value === 'anticon-spin' || value.indexOf('-o-') !== -1) {
    return null;
  }

  if (res.includes('verticle')) {
    res = res.replace('verticle', 'vertical');
  }
  if (res.startsWith('cross')) {
    res = res.replace('cross', 'close');
  }

  if (/(-o)$/.test(res)) {
    res = res.replace(/(-o)$/, '-outline');
  } else if (/#outline/.test(res)) {
    res = res.replace(/#outline/, '-outline');
  } else if (/#fill/.test(res)) {
    res = res.replace(/#fill/, '-fill');
  } else if (/#twotone/.test(res)) {
    res = res.replace(/#twotone/, '-TwoTone');
  } else {
    res = `${res}-outline`;
  }

  return strings.classify(res);
}

function getIcons(options: PluginOptions, tree: Tree): string[] {
  const iconClassList: string[] = [];

  tree.visit(path => {
    if (~path.indexOf(`/node_modules/`) || !path.startsWith(`/${options.sourceRoot}`)) return;
    let res: string[] = [];
    try {
      if (path.endsWith('.ts')) {
        res = fixTs(tree, path);
      }
      if (path.endsWith('.html')) {
        res = findIcons(tree.read(path)!.toString());
      }
    } catch (ex) {
      console.warn(`Skip file "${path}" because parsing error: ${ex}`);
    }
    if (res.length > 0) {
      console.log(`found ${JSON.stringify(res)} icons in ${path}`);
      iconClassList.push(...res);
    }
  });

  const iconSet = new Set();
  iconClassList
    .map(value => getIconNameByClassName(value))
    .filter(w => w != null && !WHITE_ICONS.includes(w))
    .forEach(v => iconSet.add(v));

  return Array.from(iconSet).sort() as string[];
}

function genCustomIcons(options: PluginOptions, tree: Tree): void {
  const path = `${options.sourceRoot}/style-icons.ts`;
  if (!tree.exists(path)) {
    tree.create(
      path,
      `// Custom icon static resources

import { } from '@ant-design/icons-angular/icons';

export const ICONS = [ ];
`
    );
    return;
  }
  const source = getSourceFile(tree, path);

  const allImports = findNodes(source as any, ts.SyntaxKind.ImportDeclaration);
  const iconImport = allImports.find((w: ts.ImportDeclaration) =>
    w.moduleSpecifier.getText().includes('@ant-design/icons-angular/icons')
  ) as ts.ImportDeclaration;
  if (!iconImport) return;
  (iconImport.importClause!.namedBindings as ts.NamedImports)!.elements!.forEach(v =>
    WHITE_ICONS.push(v.getText().trim())
  );
}

function genIconFile(options: PluginOptions, tree: Tree, icons: string[]): void {
  const content = `/*
* Automatically generated by 'ng g ng-yunzai:plugin icon'
*/

import {
  ${icons.join(',\n  ')}
} from '@ant-design/icons-angular/icons';

export const ICONS_AUTO = [
  ${icons.join(',\n  ')}
];
`;
  const savePath = `${options.sourceRoot}/style-icons-auto.ts`;
  if (tree.exists(savePath)) {
    tree.overwrite(savePath, content);
  } else {
    tree.create(savePath, content);
  }
}

export function pluginIcon(options: PluginOptions): Rule {
  return (tree: Tree) => {
    console.log(`Analyzing files...`);
    genCustomIcons(options, tree);
    const icons = getIcons(options, tree);
    genIconFile(options, tree, icons);
    console.log(`\n\n`);
    console.log(`生成成功，如果是首次运行，需要手动引用，参考：https://ng.yunzainfo.com/theme/icon/zh`);
    console.log(
      `Finished, if it's first run, you need manually reference it, refer to: https://ng.yunzainfo.com/theme/icon/en`
    );
    console.log(`\n\n`);
  };
}
