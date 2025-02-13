import { HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injector } from '@angular/core';
export declare const CODEMESSAGE: {
    [key: number]: string;
};
export declare function getAdditionalHeaders(headers?: HttpHeaders): {
    [name: string]: string;
};
export declare function checkStatus(injector: Injector, ev: HttpResponseBase): void;
export interface ReThrowHttpError {
    body: any;
    _throw: true;
}
export declare function goTo(injector: Injector, url: string): void;
export declare function toLogin(injector: Injector): void;
