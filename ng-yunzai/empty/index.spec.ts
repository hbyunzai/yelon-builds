import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createYunzaiAndModuleApp } from '../utils/testing';

describe('Schematic: empty', () => {
  let runner: SchematicTestRunner;
  let tree: UnitTestTree;
  const modulePath = '/projects/foo/src/app/routes/trade/trade.module.ts';
  const routingPath = '/projects/foo/src/app/routes/trade/trade-routing.module.ts';
  const tsPath = '/projects/foo/src/app/routes/trade/list/list.component.ts';
  const servicePath = '/projects/foo/src/app/routes/trade/list/list.service.ts';
  const htmlPath = '/projects/foo/src/app/routes/trade/list/list.component.html';

  describe('', () => {
    beforeEach(async () => {
      ({ runner, tree } = await createYunzaiAndModuleApp());
    });

    it('should be generate list page', async () => {
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade' }, tree);
      [modulePath, routingPath, tsPath, htmlPath].forEach(path => expect(tree.exists(path)).toBe(true));
      expect(tree.exists(servicePath)).toBe(false);
    });

    it('should be has import code', async () => {
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade' }, tree);
      expect(tree.readContent(modulePath)).toContain(`import { TradeListComponent } from './list/list.component';`);
    });

    it('should be include module name in component name', async () => {
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade' }, tree);
      expect(tree.readContent(tsPath)).toContain(`TradeListComponent`);
    });

    it('should be exclude style', async () => {
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade' }, tree);
      expect(tree.readContent(tsPath)).not.toContain(`styleUrls`);
    });

    it('should be include service', async () => {
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade', service: 'none' }, tree);
      expect(tree.readContent(servicePath)).toContain(`@Injectable()`);
      expect(tree.readContent(modulePath)).toContain(`TradeService`);
    });

    it('should be include root service', async () => {
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade', service: 'root' }, tree);
      expect(tree.readContent(servicePath)).toContain(`@Injectable({ providedIn: 'root' })`);
    });
  });

  describe('ng-yunzai.json', () => {
    it('should be specify routesRoot', async () => {
      const yunzaiJson = { projects: { foo: { routesRoot: 'app/pages' } } };
      ({ runner, tree } = await createYunzaiAndModuleApp('trade', undefined, yunzaiJson));
      tree = await runner.runSchematic('empty', { name: 'list', module: 'trade' }, tree);
      expect(tree.exists('/projects/foo/src/app/pages/trade/trade.module.ts')).toBe(true);
    });
  });
});
