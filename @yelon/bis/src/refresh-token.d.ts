import { HttpHandlerFn, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Injector, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare const tryRefreshToken: (injector: Injector, ev: HttpResponseBase, req: HttpRequest<NzSafeAny>, next: HttpHandlerFn) => Observable<NzSafeAny>;
export declare function provideYunzaiBindAuthRefresh(): Provider[];
