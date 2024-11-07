import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { saveAs } from 'file-saver';
import { ZoneOutside } from '@yelon/util/decorator';
import { LazyService } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class ZipService {
    constructor(configSrv) {
        this.http = inject(HttpClient);
        this.lazy = inject(LazyService);
        this.ngZone = inject(NgZone);
        this.cog = configSrv.merge('zip', {
            url: 'https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js',
            utils: []
        });
    }
    init() {
        return this.lazy.load([this.cog.url].concat(this.cog.utils));
    }
    check(zip) {
        if (!zip)
            throw new Error('get instance via `ZipService.create()`');
    }
    /** 解压 */
    read(fileOrUrl, options) {
        return new Promise((resolve, reject) => {
            const resolveCallback = (data) => {
                this.ngZone.run(() => resolve(data));
            };
            this.init().then(() => {
                // from url
                if (typeof fileOrUrl === 'string') {
                    this.http.request('GET', fileOrUrl, { responseType: 'arraybuffer' }).subscribe({
                        next: (res) => {
                            JSZip.loadAsync(res, options).then((ret) => resolveCallback(ret));
                        },
                        error: err => {
                            reject(err);
                        }
                    });
                    return;
                }
                // from file
                const reader = new FileReader();
                reader.onload = (e) => {
                    JSZip.loadAsync(e.target.result, options).then((ret) => resolveCallback(ret));
                };
                reader.readAsBinaryString(fileOrUrl);
            });
        });
    }
    /** 创建 Zip 实例，用于创建压缩文件 */
    create() {
        return new Promise(resolve => {
            this.init()
                .then(() => {
                const zipFile = new JSZip();
                resolve(zipFile);
            })
                .catch(() => resolve(null));
        });
    }
    /**
     * 下载URL资源并写入 zip
     *
     * @param zip Zip 实例
     * @param path Zip 路径，例如： `text.txt`、`txt/hi.txt`
     * @param url URL 地址
     */
    pushUrl(zip, path, url) {
        this.check(zip);
        return new Promise((resolve, reject) => {
            this.http.request('GET', url, { responseType: 'arraybuffer' }).subscribe({
                next: (res) => {
                    zip.file(path, res);
                    resolve();
                },
                error: error => {
                    reject({ url, error });
                }
            });
        });
    }
    /**
     * 保存Zip并执行打开保存对话框
     *
     * @param zip zip 对象，务必通过 `create()` 构建
     * @param options 额外参数，
     */
    save(zip, options) {
        this.check(zip);
        const opt = { filename: 'download.zip', ...options };
        return new Promise((resolve, reject) => {
            zip.generateAsync({ type: 'blob', ...opt.options }, opt.update).then(data => {
                if (opt.callback)
                    opt.callback(data);
                saveAs(data, opt.filename);
                resolve();
            }, err => {
                reject(err);
            });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: ZipService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: ZipService, providedIn: 'root' }); }
}
__decorate([
    ZoneOutside()
], ZipService.prototype, "read", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: ZipService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { read: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hYmMvemlwL3ppcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFJcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBUTVELE1BQU0sT0FBTyxVQUFVO0lBT3JCLFlBQVksU0FBOEI7UUFOekIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQixTQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFLdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxHQUFHLEVBQUUsd0RBQXdEO1lBQzdELEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBRSxDQUFDO0lBQ04sQ0FBQztJQUVPLElBQUk7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTyxLQUFLLENBQUMsR0FBc0I7UUFDbEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELFNBQVM7SUFFVCxJQUFJLENBQUMsU0FBd0IsRUFBRSxPQUFvQztRQUNqRSxPQUFPLElBQUksT0FBTyxDQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2hELE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBZSxFQUFRLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNwQixXQUFXO2dCQUNYLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQzdFLElBQUksRUFBRSxDQUFDLEdBQWdCLEVBQUUsRUFBRTs0QkFDekIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBYyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDL0UsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNkLENBQUM7cUJBQ0YsQ0FBQyxDQUFDO29CQUNILE9BQU87Z0JBQ1QsQ0FBQztnQkFDRCxZQUFZO2dCQUNaLE1BQU0sTUFBTSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUE0QixFQUFFLEVBQUU7b0JBQy9DLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU8sQ0FBQyxNQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQWMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNHLENBQUMsQ0FBQztnQkFDRixNQUFNLENBQUMsa0JBQWtCLENBQUMsU0FBaUIsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLE1BQU07UUFDSixPQUFPLElBQUksT0FBTyxDQUFtQixPQUFPLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNSLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsT0FBTyxDQUFDLEdBQXFCLEVBQUUsSUFBWSxFQUFFLEdBQVc7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3ZFLElBQUksRUFBRSxDQUFDLEdBQWdCLEVBQUUsRUFBRTtvQkFDekIsR0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNiLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLENBQUMsR0FBcUIsRUFBRSxPQUF3QjtRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sRUFBb0IsQ0FBQztRQUN2RSxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLEdBQUksQ0FBQyxhQUFhLENBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBZSxFQUFFLEdBQUcsQ0FBQyxNQUFtQixDQUFDLENBQUMsSUFBSSxDQUNyRyxJQUFJLENBQUMsRUFBRTtnQkFDTCxJQUFJLEdBQUcsQ0FBQyxRQUFRO29CQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtnQkFDSixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0EzR1UsVUFBVTttSEFBVixVQUFVLGNBREcsTUFBTTs7QUF5QjlCO0lBREMsV0FBVyxFQUFFO3NDQTJCYjs0RkFsRFUsVUFBVTtrQkFEdEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7d0ZBeUJoQyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHR5cGUganNaaXBUeXBlIGZyb20gJ2pzemlwJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpWmlwQ29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IFpvbmVPdXRzaWRlIH0gZnJvbSAnQHllbG9uL3V0aWwvZGVjb3JhdG9yJztcbmltcG9ydCB7IExhenlSZXN1bHQsIExhenlTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBaaXBTYXZlT3B0aW9ucyB9IGZyb20gJy4vemlwLnR5cGVzJztcblxuZGVjbGFyZSB2YXIgSlNaaXA6IGpzWmlwVHlwZTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBaaXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwID0gaW5qZWN0KEh0dHBDbGllbnQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGxhenkgPSBpbmplY3QoTGF6eVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZSA9IGluamVjdChOZ1pvbmUpO1xuXG4gIHByaXZhdGUgY29nOiBZdW56YWlaaXBDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb2cgPSBjb25maWdTcnYubWVyZ2UoJ3ppcCcsIHtcbiAgICAgIHVybDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vanN6aXBAMy9kaXN0L2pzemlwLm1pbi5qcycsXG4gICAgICB1dGlsczogW11cbiAgICB9KSE7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogUHJvbWlzZTxMYXp5UmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5sYXp5LmxvYWQoW3RoaXMuY29nLnVybCFdLmNvbmNhdCh0aGlzLmNvZy51dGlscyEpKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2soemlwPzoganNaaXBUeXBlIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmICghemlwKSB0aHJvdyBuZXcgRXJyb3IoJ2dldCBpbnN0YW5jZSB2aWEgYFppcFNlcnZpY2UuY3JlYXRlKClgJyk7XG4gIH1cblxuICAvKiog6Kej5Y6LICovXG4gIEBab25lT3V0c2lkZSgpXG4gIHJlYWQoZmlsZU9yVXJsOiBGaWxlIHwgc3RyaW5nLCBvcHRpb25zPzoganNaaXBUeXBlLkpTWmlwTG9hZE9wdGlvbnMpOiBQcm9taXNlPGpzWmlwVHlwZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxqc1ppcFR5cGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVDYWxsYmFjayA9IChkYXRhOiBqc1ppcFR5cGUpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHJlc29sdmUoZGF0YSkpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW5pdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBmcm9tIHVybFxuICAgICAgICBpZiAodHlwZW9mIGZpbGVPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdCgnR0VUJywgZmlsZU9yVXJsLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogKHJlczogQXJyYXlCdWZmZXIpID0+IHtcbiAgICAgICAgICAgICAgSlNaaXAubG9hZEFzeW5jKHJlcywgb3B0aW9ucykudGhlbigocmV0OiBqc1ppcFR5cGUpID0+IHJlc29sdmVDYWxsYmFjayhyZXQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZyb20gZmlsZVxuICAgICAgICBjb25zdCByZWFkZXI6IEZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKGU6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcbiAgICAgICAgICBKU1ppcC5sb2FkQXN5bmMoZS50YXJnZXQhLnJlc3VsdCBhcyBBcnJheUJ1ZmZlciwgb3B0aW9ucykudGhlbigocmV0OiBqc1ppcFR5cGUpID0+IHJlc29sdmVDYWxsYmFjayhyZXQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyhmaWxlT3JVcmwgYXMgRmlsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiDliJvlu7ogWmlwIOWunuS+i++8jOeUqOS6juWIm+W7uuWOi+e8qeaWh+S7tiAqL1xuICBjcmVhdGUoKTogUHJvbWlzZTxqc1ppcFR5cGUgfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGpzWmlwVHlwZSB8IG51bGw+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHppcEZpbGUgPSBuZXcgSlNaaXAoKTtcbiAgICAgICAgICByZXNvbHZlKHppcEZpbGUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4gcmVzb2x2ZShudWxsKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5LiL6L29VVJM6LWE5rqQ5bm25YaZ5YWlIHppcFxuICAgKlxuICAgKiBAcGFyYW0gemlwIFppcCDlrp7kvotcbiAgICogQHBhcmFtIHBhdGggWmlwIOi3r+W+hO+8jOS+i+Wmgu+8miBgdGV4dC50eHRg44CBYHR4dC9oaS50eHRgXG4gICAqIEBwYXJhbSB1cmwgVVJMIOWcsOWdgFxuICAgKi9cbiAgcHVzaFVybCh6aXA6IGpzWmlwVHlwZSB8IG51bGwsIHBhdGg6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmNoZWNrKHppcCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KCdHRVQnLCB1cmwsIHsgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIH0pLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChyZXM6IEFycmF5QnVmZmVyKSA9PiB7XG4gICAgICAgICAgemlwIS5maWxlKHBhdGgsIHJlcyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdCh7IHVybCwgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOS/neWtmFppcOW5tuaJp+ihjOaJk+W8gOS/neWtmOWvueivneahhlxuICAgKlxuICAgKiBAcGFyYW0gemlwIHppcCDlr7nosaHvvIzliqHlv4XpgJrov4cgYGNyZWF0ZSgpYCDmnoTlu7pcbiAgICogQHBhcmFtIG9wdGlvbnMg6aKd5aSW5Y+C5pWw77yMXG4gICAqL1xuICBzYXZlKHppcDoganNaaXBUeXBlIHwgbnVsbCwgb3B0aW9ucz86IFppcFNhdmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jaGVjayh6aXApO1xuICAgIGNvbnN0IG9wdCA9IHsgZmlsZW5hbWU6ICdkb3dubG9hZC56aXAnLCAuLi5vcHRpb25zIH0gYXMgWmlwU2F2ZU9wdGlvbnM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHppcCEuZ2VuZXJhdGVBc3luYzwnYmxvYic+KHsgdHlwZTogJ2Jsb2InLCAuLi5vcHQub3B0aW9ucyB9IGFzIE56U2FmZUFueSwgb3B0LnVwZGF0ZSBhcyBOelNhZmVBbnkpLnRoZW4oXG4gICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIGlmIChvcHQuY2FsbGJhY2spIG9wdC5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICBzYXZlQXMoZGF0YSwgb3B0LmZpbGVuYW1lKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==