import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createYunzaiApp } from '../utils/testing';

describe('NgYunzaiSchematic: plugin: rtl', () => {
  let runner: SchematicTestRunner;
  let tree: UnitTestTree;

  beforeEach(async () => {
    ({ runner, tree } = await createYunzaiApp());
    tree = await runner.runSchematicAsync('plugin', { name: 'rtl', type: 'add' }, tree).toPromise();
  });

  it(`should be working`, () => {
    expect(tree.readContent(`/projects/foo/src/app/layout/layout.module.ts`)).toContain(`HeaderRTLComponent`);
  });
});
