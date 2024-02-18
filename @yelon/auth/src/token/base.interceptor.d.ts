import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YunzaiAuthConfig } from '@yelon/util/config';
export declare function isAnonymous(req: HttpRequest<unknown>, options: YunzaiAuthConfig): boolean;
export declare function throwErr(req: HttpRequest<unknown>, options: YunzaiAuthConfig): Observable<HttpEvent<unknown>>;
