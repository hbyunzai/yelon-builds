"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
import { NgModule } from '@angular/core';
    import { YelonFormModule, WidgetRegistry } from '@yelon/form';

    import { TestWidget } from './test/test.widget';
    import { SharedModule } from '../shared.module';

    export const SCHEMA_THIRDS_COMPONENTS = [TestWidget];

    @NgModule({
      declarations: SCHEMA_THIRDS_COMPONENTS,
      imports: [SharedModule, YelonFormModule.forRoot()],
      exports: SCHEMA_THIRDS_COMPONENTS
    })
    export class JsonSchemaModule {
      constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register(TestWidget.KEY, TestWidget);
      }
    }
`;
//# sourceMappingURL=jsonSchemaModule.js.map