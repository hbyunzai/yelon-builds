import * as i0 from '@angular/core';
import { OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

declare class SizeObserver implements OnDestroy {
    private _observedElements;
    ngOnDestroy(): void;
    observe(element: Element): Observable<MutationRecord[]>;
    private _observeElement;
    private _unobserveElement;
    private _cleanupObserver;
    static ɵfac: i0.ɵɵFactoryDeclaration<SizeObserver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SizeObserver>;
}
declare class ObserverSize implements AfterViewInit, OnDestroy {
    private readonly _obs;
    private readonly el;
    private readonly ngZone;
    private _sub$;
    readonly event: EventEmitter<MutationRecord[]>;
    ngAfterViewInit(): void;
    private _sub;
    private _unsub;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ObserverSize, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ObserverSize, "[observeSize]", ["observeSize"], {}, { "event": "observeSize"; }, never, never, true, never>;
}
declare class ObserversModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ObserversModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ObserversModule, never, [typeof ObserverSize], [typeof ObserverSize]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ObserversModule>;
}

export { ObserverSize, ObserversModule, SizeObserver };
