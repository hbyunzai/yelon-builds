import { Tree, Rule } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';

import { VERSION } from './lib-versions';
import { addPackage } from './package';
import { BUILD_TARGET_LINT, getProjectFromWorkspace } from './workspace';

/**
 * 修复主要依赖的版本号
 */
export function UpgradeMainVersions(tree: Tree, version: string = VERSION): void {
  addPackage(
    tree,
    ['abc', 'acl', 'auth', 'cache', 'form', 'mock', 'theme', 'util', 'chart'].map(name => `@yelon/${name}@${version}`)
  );
  addPackage(
    tree,
    [
      `angular-eslint@19.0.2`,
      `@typescript-eslint/eslint-plugin@^8.22.0`,
      `@typescript-eslint/parser@^8.22.0`,
      `@typescript-eslint/utils@^8.22.0`,
      `eslint@^9.19.0`,
      `eslint-config-prettier@^10.0.1`,
      `eslint-plugin-import@~2.31.0`,
      `eslint-plugin-jsdoc@~50.6.3`,
      `eslint-plugin-prefer-arrow@~1.2.3`,
      `eslint-plugin-prettier@~5.2.3`,
      `eslint-plugin-unused-imports@^4.1.4`,
      `typescript-eslint@^8.22.0`,
      `prettier@^3.4.2`,
      `husky@^9.1.7`,
      `ng-yunzai@${version}`,
      `ng-yunzai-plugin-theme@latest`,
      `source-map-explorer@^2.5.3`,
      `@angular/language-service@^19.1.1`,
      `ngx-tinymce@^19.0.0`,
      `@ng-util/monaco-editor@^19.0.0`,
      `@yelon/testing@${version}`
    ],
    'devDependencies'
  );
  addPackage(tree, [`rxjs@~7.8.0`, `ng-zorro-antd@^19.0.2`]);
}

export function addESLintRule(projectName: string): Rule {
  return updateWorkspace(async workspace => {
    const project = getProjectFromWorkspace(workspace, projectName);
    if (project == null) return;

    if (project.targets.has(BUILD_TARGET_LINT)) {
      project.targets.delete(BUILD_TARGET_LINT);
    }
    project.targets.set(BUILD_TARGET_LINT, {
      builder: '@angular-eslint/builder:lint',
      options: {
        lintFilePatterns: ['src/**/*.ts', 'src/**/*.html']
      }
    });
  });
}
