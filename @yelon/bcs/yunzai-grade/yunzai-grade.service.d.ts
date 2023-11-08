import { Observable } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { YunzaiGrade } from './yunzai-grade.types';
import * as i0 from "@angular/core";
export declare class YunzaiGradeService {
    private http;
    constructor(http: _HttpClient);
    grades(): Observable<YunzaiGrade[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiGradeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiGradeService>;
}
