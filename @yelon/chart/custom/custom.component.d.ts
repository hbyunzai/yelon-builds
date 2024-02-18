import { ElementRef, EventEmitter } from '@angular/core';
import { G2BaseComponent } from '@yelon/chart/core';
import * as i0 from "@angular/core";
export declare class G2CustomComponent extends G2BaseComponent {
    height?: number;
    resizeTime: number;
    readonly render: EventEmitter<ElementRef<any>>;
    readonly resize: EventEmitter<ElementRef<any>>;
    readonly destroy: EventEmitter<ElementRef<any>>;
    install(): void;
    private installResizeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2CustomComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2CustomComponent, "g2,g2-custom", ["g2Custom"], { "height": { "alias": "height"; "required": false; }; "resizeTime": { "alias": "resizeTime"; "required": false; }; }, { "render": "render"; "resize": "resize"; "destroy": "destroy"; }, never, ["*"], true, never>;
    static ngAcceptInputType_height: unknown;
    static ngAcceptInputType_resizeTime: unknown;
}
