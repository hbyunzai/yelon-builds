import { importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { BisModule } from './bis.module';
export function provideYunzaiBis() {
    const provides = [];
    provides.push(importProvidersFrom(BisModule));
    return makeEnvironmentProviders(provides);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9zcmMvcHJvdmlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXdCLG1CQUFtQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsTUFBTSxVQUFVLGdCQUFnQjtJQUM5QixNQUFNLFFBQVEsR0FBMkIsRUFBRSxDQUFDO0lBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM5QyxPQUFPLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnZpcm9ubWVudFByb3ZpZGVycywgaW1wb3J0UHJvdmlkZXJzRnJvbSwgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJpc01vZHVsZSB9IGZyb20gJy4vYmlzLm1vZHVsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlWXVuemFpQmlzKCk6IEVudmlyb25tZW50UHJvdmlkZXJzIHtcbiAgY29uc3QgcHJvdmlkZXM6IEVudmlyb25tZW50UHJvdmlkZXJzW10gPSBbXTtcbiAgcHJvdmlkZXMucHVzaChpbXBvcnRQcm92aWRlcnNGcm9tKEJpc01vZHVsZSkpO1xuICByZXR1cm4gbWFrZUVudmlyb25tZW50UHJvdmlkZXJzKHByb3ZpZGVzKTtcbn1cbiJdfQ==