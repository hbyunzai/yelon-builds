import { HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injector } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare const CODEMESSAGE: {
    [key: number]: string;
};
export declare function getAdditionalHeaders(headers?: HttpHeaders): {
    [name: string]: string;
};
export declare function checkStatus(injector: Injector, ev: HttpResponseBase): void;
export interface ReThrowHttpError {
    body: NzSafeAny;
    _throw: true;
}
export declare function goTo(injector: Injector, url: string): void;
export declare function toLogin(injector: Injector): void;
