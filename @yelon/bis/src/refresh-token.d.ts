import { HttpHandlerFn, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Injector, Provider } from '@angular/core';
import { Observable } from 'rxjs';
export declare const tryRefreshToken: (injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn) => Observable<any>;
export declare function provideYunzaiBindAuthRefresh(): Provider[];
