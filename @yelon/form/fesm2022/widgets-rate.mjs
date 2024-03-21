import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1$1 from '@yelon/form';
import { ControlUIWidget, toBool, YelonFormModule } from '@yelon/form';
import * as i3 from 'ng-zorro-antd/rate';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { CommonModule } from '@angular/common';

class RateWidget extends ControlUIWidget {
    constructor() {
        super(...arguments);
        this.hasText = false;
    }
    static { this.KEY = 'rate'; }
    get text() {
        return this.ui.text.replace('{{value}}', this.formProperty.value);
    }
    ngOnInit() {
        const { schema, ui } = this;
        this.count = schema.maximum || 5;
        this.allowHalf = (schema.multipleOf || 0.5) === 0.5;
        this.allowClear = toBool(ui.allowClear, true);
        this.autoFocus = toBool(ui.autoFocus, false);
        this.hasText = !!ui.text;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RateWidget, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: RateWidget, isStandalone: true, selector: "sf-rate", usesInheritance: true, ngImport: i0, template: `<sf-item-wrap
    [id]="id"
    [schema]="schema"
    [ui]="ui"
    [showError]="showError"
    [error]="error"
    [showTitle]="schema.title"
  >
    <nz-rate
      [nzDisabled]="disabled"
      [ngModel]="value"
      (ngModelChange)="setValue($event)"
      [nzAllowClear]="allowClear"
      [nzAllowHalf]="allowHalf"
      [nzTooltips]="ui.tooltips || []"
      [nzAutoFocus]="autoFocus"
      [nzCount]="$any(count)"
    />
    @if (hasText && formProperty.value) {
      <span class="ant-rate-text">{{ text }}</span>
    }
  </sf-item-wrap>`, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i1$1.SFItemWrapComponent, selector: "sf-item-wrap", inputs: ["id", "schema", "ui", "showError", "error", "showTitle", "title"] }, { kind: "ngmodule", type: NzRateModule }, { kind: "component", type: i3.NzRateComponent, selector: "nz-rate", inputs: ["nzAllowClear", "nzAllowHalf", "nzDisabled", "nzAutoFocus", "nzCharacter", "nzCount", "nzTooltips"], outputs: ["nzOnBlur", "nzOnFocus", "nzOnHoverChange", "nzOnKeyDown"], exportAs: ["nzRate"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RateWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'sf-rate',
                    template: `<sf-item-wrap
    [id]="id"
    [schema]="schema"
    [ui]="ui"
    [showError]="showError"
    [error]="error"
    [showTitle]="schema.title"
  >
    <nz-rate
      [nzDisabled]="disabled"
      [ngModel]="value"
      (ngModelChange)="setValue($event)"
      [nzAllowClear]="allowClear"
      [nzAllowHalf]="allowHalf"
      [nzTooltips]="ui.tooltips || []"
      [nzAutoFocus]="autoFocus"
      [nzCount]="$any(count)"
    />
    @if (hasText && formProperty.value) {
      <span class="ant-rate-text">{{ text }}</span>
    }
  </sf-item-wrap>`,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true,
                    imports: [FormsModule, YelonFormModule, NzRateModule]
                }]
        }] });

class RateWidgetModule {
    constructor(widgetRegistry) {
        widgetRegistry.register(RateWidget.KEY, RateWidget);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RateWidgetModule, deps: [{ token: i1$1.WidgetRegistry }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: RateWidgetModule, imports: [FormsModule, YelonFormModule, NzRateModule, CommonModule, RateWidget] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RateWidgetModule, imports: [FormsModule, YelonFormModule, NzRateModule, CommonModule, RateWidget] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RateWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FormsModule, YelonFormModule, NzRateModule, CommonModule, RateWidget]
                }]
        }], ctorParameters: () => [{ type: i1$1.WidgetRegistry }] });

function withRateWidget() {
    return { KEY: RateWidget.KEY, type: RateWidget };
}

/**
 * Generated bundle index. Do not edit.
 */

export { RateWidget, RateWidgetModule, withRateWidget };
//# sourceMappingURL=widgets-rate.mjs.map
