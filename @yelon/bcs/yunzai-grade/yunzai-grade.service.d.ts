import { Observable } from 'rxjs';
import { YunzaiGrade } from './yunzai-grade.types';
export declare class YunzaiGradeService {
    private readonly http;
    grades(): Observable<YunzaiGrade[]>;
}
