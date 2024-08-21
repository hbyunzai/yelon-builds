import * as i0 from '@angular/core';
import { InjectionToken, makeEnvironmentProviders, Injectable, Optional, Inject } from '@angular/core';
import { deepMergeKey } from '@yelon/util/other';

class YunzaiSVConfig {
}

const YUNZAI_CONFIG = new InjectionToken('yunzai-config', {
    providedIn: 'root',
    factory: YUNZAI_CONFIG_FACTORY
});
function YUNZAI_CONFIG_FACTORY() {
    return {};
}
function provideYunzaiConfig(config) {
    return makeEnvironmentProviders([{ provide: YUNZAI_CONFIG, useValue: config }]);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
class YunzaiConfigService {
    constructor(defaultConfig) {
        this.config = { ...defaultConfig };
    }
    get(componentName, key) {
        const res = (this.config[componentName] || {});
        return key ? { [key]: res[key] } : res;
    }
    merge(componentName, ...defaultValues) {
        return deepMergeKey({}, true, ...defaultValues, this.get(componentName));
    }
    attach(componentThis, componentName, defaultValues) {
        Object.assign(componentThis, this.merge(componentName, defaultValues));
    }
    attachKey(componentThis, componentName, key) {
        Object.assign(componentThis, this.get(componentName, key));
    }
    set(componentName, value) {
        this.config[componentName] = { ...this.config[componentName], ...value };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiConfigService, deps: [{ token: YUNZAI_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiConfigService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_CONFIG]
                }] }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YUNZAI_CONFIG, YUNZAI_CONFIG_FACTORY, YunzaiConfigService, YunzaiSVConfig, provideYunzaiConfig };
//# sourceMappingURL=config.mjs.map
