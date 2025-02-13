import { inject } from '@angular/core';
import { map } from 'rxjs';
import { _HttpClient } from '@yelon/theme';

class YunzaiGradeService {
    http = inject(_HttpClient);
    grades() {
        return this.http.get(`/auth/gradeYear/queryListForPage`).pipe(map((response) => {
            return response.data;
        }));
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiGradeService };
//# sourceMappingURL=yunzai-grade.mjs.map
