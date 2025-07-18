import { chain, Rule, schematic, Tree, SchematicContext, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as colors from 'ansi-colors';

import { Schema as ApplicationOptions } from '../application/schema';
import { DEFAULT_WORKSPACE_PATH, readJSON, readPackage } from '../utils';
import { Schema as NgAddOptions } from './schema';
import { getNodeMajorVersion } from '../utils/node';

const V = 20;

function genRules(options: NgAddOptions): Rule {
  return () => {
    const rules: Rule[] = [];

    const applicationOptions: ApplicationOptions = { ...options };
    rules.push(schematic('application', applicationOptions));

    if (options.codeStyle) {
      rules.push(schematic('plugin', { name: 'codeStyle', type: 'add' }));
    }

    if (options.defaultLanguage) {
      rules.push(
        schematic('plugin', {
          name: 'defaultLanguage',
          type: 'add',
          defaultLanguage: options.defaultLanguage
        })
      );
    }

    return chain(rules);
  };
}

// function isYarn(tree: Tree): boolean {
//   return readJSON(tree, DEFAULT_WORKSPACE_PATH)?.cli?.packageManager === 'yarn';
// }

function isValidProjectName(tree: Tree, name: string): boolean {
  return Object.keys(readJSON(tree, DEFAULT_WORKSPACE_PATH)?.projects ?? {}).indexOf(name) !== -1;
}

function finished(): Rule {
  return (_: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());

    context.logger.info(
      colors.green(`
✓  Congratulations, NG-YUNZAI scaffold generation complete 🎉.

NG-YUNZAI documentation site: https://ng.yunzainfo.com
`)
    );
  };
}

export default function (options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // if (!isYarn(tree)) {
    //   context.logger.warn(`TIPS:: Please use yarn instead of NPM to install dependencies`);
    // }

    const nodeVersion = getNodeMajorVersion();
    const allowNodeVersions = [18, 20, 22];
    if (!allowNodeVersions.some(v => nodeVersion === v)) {
      const versions = allowNodeVersions.join(', ');
      throw new SchematicsException(
        `Sorry, currently only supports ${versions} major version number of node (Got ${process.version}), pls refer to https://angular.dev/reference/versions#actively-supported-versions`
      );
    }

    const pkg = readPackage(tree);

    if (options.project) {
      if (!isValidProjectName(tree, options.project)) {
        throw new SchematicsException(`Not found under the projects node of angular.json: ${options.project}`);
      }
    } else {
      if (pkg.devDependencies['ng-yunzai']) {
        throw new SchematicsException(`Already an NG-YUNZAI project and can't be executed again: ng add ng-yunzai`);
      }
    }

    let ngCoreVersion = pkg.dependencies['@angular/core'] as string;
    if (/^[\^|~]/g.test(ngCoreVersion)) {
      ngCoreVersion = ngCoreVersion.substring(1);
    }
    if (!ngCoreVersion.startsWith(`${V}.`)) {
      throw new SchematicsException(
        `Sorry, the current version only supports angular ${V}.x, pls downgrade the global Anguar-cli version: [npm install -g @angular/cli@${V}]`
      );
    }

    return chain([genRules(options), finished()])(tree, context);
  };
}
