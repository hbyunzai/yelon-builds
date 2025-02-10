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
    ['abc', 'acl', 'auth', 'cache', 'form', 'mock', 'theme', 'util', 'chart', 'bcs', 'bis', 'socket'].map(
      name => `@yelon/${name}@${version}`
    )
  );
  addPackage(
    tree,
    [
      `@angular-eslint/builder@^18.3.1`,
      `@angular-eslint/eslint-plugin@^18.3.1`,
      `@angular-eslint/eslint-plugin-template@^18.3.1`,
      `@angular-eslint/schematics@^18.3.1`,
      `@angular-eslint/template-parser@^18.3.1`,
      `@typescript-eslint/eslint-plugin@^8.8.0`,
      `@typescript-eslint/parser@^8.8.0`,
      `eslint@^8.57.0`,
      `eslint-config-prettier@~9.1.0`,
      `eslint-plugin-import@~2.25.3`,
      `eslint-plugin-jsdoc@~50.3.1`,
      `eslint-plugin-prefer-arrow@~1.2.3`,
      `eslint-plugin-prettier@~5.2.1`,
      `eslint-plugin-deprecation@^3.0.0`,
      `prettier@^3.3.3`,
      `husky@^9.1.5`,
      `ng-yunzai@${version}`,
      `ng-yunzai-plugin-theme@latest`,
      `source-map-explorer@^2.5.3`,
      `@angular/language-service@^18.2.0`,
      `ngx-tinymce@^18.0.0`,
      `@stomp/rx-stomp@^2.0.0`,
      `@stomp/stompjs@^7.0.0`,
      `@ng-util/monaco-editor@^18.0.0`,
      `@yelon/testing@${version}`
    ],
    'devDependencies'
  );
  addPackage(tree, [`rxjs@~7.8.0`, `ng-zorro-antd@^18.2.0`]);
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
