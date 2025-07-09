import { Observable } from 'rxjs';

interface YunzaiGrade {
    bs: number;
    enable: number;
    name: string;
    openId: string;
    rxnf: string;
}

declare class YunzaiGradeService {
    private readonly http;
    grades(): Observable<YunzaiGrade[]>;
}

export { YunzaiGradeService };
export type { YunzaiGrade };
