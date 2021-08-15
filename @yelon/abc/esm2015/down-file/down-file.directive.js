import { __awaiter } from "tslib";
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { _HttpClient } from '@yelon/theme';
export class DownFileDirective {
    constructor(el, _http) {
        this.el = el;
        this._http = _http;
        this.isFileSaverSupported = true;
        this.httpMethod = 'get';
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        let isFileSaverSupported = false;
        try {
            isFileSaverSupported = !!new Blob();
        }
        catch (_a) { }
        this.isFileSaverSupported = isFileSaverSupported;
        if (!isFileSaverSupported) {
            el.nativeElement.classList.add(`down-file__not-support`);
        }
    }
    getDisposition(data) {
        const arr = (data || '')
            .split(';')
            .filter(i => i.includes('='))
            .map(v => {
            const strArr = v.split('=');
            const utfId = `UTF-8''`;
            let value = strArr[1];
            if (value.startsWith(utfId))
                value = value.substr(utfId.length);
            return { [strArr[0].trim()]: value };
        });
        return arr.reduce((_o, item) => item, {});
    }
    setDisabled(status) {
        const el = this.el.nativeElement;
        el.disabled = status;
        el.classList[status ? 'add' : 'remove'](`down-file__disabled`);
    }
    _click(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isFileSaverSupported || (typeof this.pre === 'function' && !(yield this.pre(ev)))) {
                ev.stopPropagation();
                ev.preventDefault();
                return;
            }
            this.setDisabled(true);
            this._http
                .request(this.httpMethod, this.httpUrl, {
                params: this.httpData || {},
                responseType: 'blob',
                observe: 'response',
                body: this.httpBody
            })
                .pipe(finalize(() => this.setDisabled(false)))
                .subscribe((res) => {
                if (res.status !== 200 || res.body.size <= 0) {
                    this.error.emit(res);
                    return;
                }
                const disposition = this.getDisposition(res.headers.get('content-disposition'));
                let fileName = this.fileName;
                if (typeof fileName === 'function')
                    fileName = fileName(res);
                fileName =
                    fileName ||
                        disposition[`filename*`] ||
                        disposition[`filename`] ||
                        res.headers.get('filename') ||
                        res.headers.get('x-filename');
                saveAs(res.body, decodeURI(fileName));
                this.success.emit(res);
            }, err => this.error.emit(err));
        });
    }
}
DownFileDirective.decorators = [
    { type: Directive, args: [{
                selector: '[down-file]',
                exportAs: 'downFile',
                host: {
                    '(click)': '_click($event)'
                }
            },] }
];
DownFileDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: _HttpClient }
];
DownFileDirective.propDecorators = {
    httpData: [{ type: Input, args: ['http-data',] }],
    httpBody: [{ type: Input, args: ['http-body',] }],
    httpMethod: [{ type: Input, args: ['http-method',] }],
    httpUrl: [{ type: Input, args: ['http-url',] }],
    fileName: [{ type: Input, args: ['file-name',] }],
    pre: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bi1maWxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9kb3duLWZpbGUvZG93bi1maWxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFJcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQVMzQyxNQUFNLE9BQU8saUJBQWlCO0lBeUI1QixZQUFvQixFQUFpQyxFQUFVLEtBQWtCO1FBQTdELE9BQUUsR0FBRixFQUFFLENBQStCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQXhCekUseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBR2QsZUFBVSxHQUFXLEtBQUssQ0FBQztRQUk5QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDakQsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFpQnZELElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUk7WUFDRixvQkFBb0IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNyQztRQUFDLFdBQU0sR0FBRTtRQUNWLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDekIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBdkJPLGNBQWMsQ0FBQyxJQUFtQjtRQUN4QyxNQUFNLEdBQUcsR0FBa0Ms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QUFXLENBQUMsV0FBVyxDQUFDO3dCQUN4QixXQUFXLENBQUMsVUFBVSxDQUFDO3dCQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7d0JBQzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUssRUFBRSxTQUFTLENBQUMsUUFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUM1QixDQUFDO1FBQ04sQ0FBQztLQUFBOzs7WUFwRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsSUFBSSxFQUFFO29CQUNKLFNBQVMsRUFBRSxnQkFBZ0I7aUJBQzVCO2FBQ0Y7OztZQWZtQixVQUFVO1lBT3JCLFdBQVc7Ozt1QkFXakIsS0FBSyxTQUFDLFdBQVc7dUJBQ2pCLEtBQUssU0FBQyxXQUFXO3lCQUNqQixLQUFLLFNBQUMsYUFBYTtzQkFDbkIsS0FBSyxTQUFDLFVBQVU7dUJBQ2hCLEtBQUssU0FBQyxXQUFXO2tCQUNqQixLQUFLO3NCQUNMLE1BQU07b0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZG93bi1maWxlXScsXG4gIGV4cG9ydEFzOiAnZG93bkZpbGUnLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnX2NsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgRG93bkZpbGVEaXJlY3RpdmUge1xuICBwcml2YXRlIGlzRmlsZVNhdmVyU3VwcG9ydGVkID0gdHJ1ZTtcbiAgQElucHV0KCdodHRwLWRhdGEnKSBodHRwRGF0YTogTnpTYWZlQW55O1xuICBASW5wdXQoJ2h0dHAtYm9keScpIGh0dHBCb2R5OiBOelNhZmVBbnk7XG4gIEBJbnB1dCgnaHR0cC1tZXRob2QnKSBodHRwTWV0aG9kOiBzdHJpbmcgPSAnZ2V0JztcbiAgQElucHV0KCdodHRwLXVybCcpIGh0dHBVcmw6IHN0cmluZztcbiAgQElucHV0KCdmaWxlLW5hbWUnKSBmaWxlTmFtZTogc3RyaW5nIHwgKChyZXA6IEh0dHBSZXNwb25zZTxCbG9iPikgPT4gc3RyaW5nKTtcbiAgQElucHV0KCkgcHJlOiAoZXY6IE1vdXNlRXZlbnQpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIEBPdXRwdXQoKSByZWFkb25seSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwUmVzcG9uc2U8QmxvYj4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55PigpO1xuXG4gIHByaXZhdGUgZ2V0RGlzcG9zaXRpb24oZGF0YTogc3RyaW5nIHwgbnVsbCk6IE56U2FmZUFueSB7XG4gICAgY29uc3QgYXJyOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiA9IChkYXRhIHx8ICcnKVxuICAgICAgLnNwbGl0KCc7JylcbiAgICAgIC5maWx0ZXIoaSA9PiBpLmluY2x1ZGVzKCc9JykpXG4gICAgICAubWFwKHYgPT4ge1xuICAgICAgICBjb25zdCBzdHJBcnIgPSB2LnNwbGl0KCc9Jyk7XG4gICAgICAgIGNvbnN0IHV0ZklkID0gYFVURi04JydgO1xuICAgICAgICBsZXQgdmFsdWUgPSBzdHJBcnJbMV07XG4gICAgICAgIGlmICh2YWx1ZS5zdGFydHNXaXRoKHV0ZklkKSkgdmFsdWUgPSB2YWx1ZS5zdWJzdHIodXRmSWQubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHsgW3N0ckFyclswXS50cmltKCldOiB2YWx1ZSB9O1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGFyci5yZWR1Y2UoKF9vLCBpdGVtKSA9PiBpdGVtLCB7fSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmPEhUTUxCdXR0b25FbGVtZW50PiwgcHJpdmF0ZSBfaHR0cDogX0h0dHBDbGllbnQpIHtcbiAgICBsZXQgaXNGaWxlU2F2ZXJTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgaXNGaWxlU2F2ZXJTdXBwb3J0ZWQgPSAhIW5ldyBCbG9iKCk7XG4gICAgfSBjYXRjaCB7fVxuICAgIHRoaXMuaXNGaWxlU2F2ZXJTdXBwb3J0ZWQgPSBpc0ZpbGVTYXZlclN1cHBvcnRlZDtcbiAgICBpZiAoIWlzRmlsZVNhdmVyU3VwcG9ydGVkKSB7XG4gICAgICBlbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGRvd24tZmlsZV9fbm90LXN1cHBvcnRgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldERpc2FibGVkKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGVsLmRpc2FibGVkID0gc3RhdHVzO1xuICAgIGVsLmNsYXNzTGlzdFtzdGF0dXMgPyAnYWRkJyA6ICdyZW1vdmUnXShgZG93bi1maWxlX19kaXNhYmxlZGApO1xuICB9XG5cbiAgYXN5bmMgX2NsaWNrKGV2OiBNb3VzZUV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlzRmlsZVNhdmVyU3VwcG9ydGVkIHx8ICh0eXBlb2YgdGhpcy5wcmUgPT09ICdmdW5jdGlvbicgJiYgIShhd2FpdCB0aGlzLnByZShldikpKSkge1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldERpc2FibGVkKHRydWUpO1xuICAgIHRoaXMuX2h0dHBcbiAgICAgIC5yZXF1ZXN0KHRoaXMuaHR0cE1ldGhvZCwgdGhpcy5odHRwVXJsLCB7XG4gICAgICAgIHBhcmFtczogdGhpcy5odHRwRGF0YSB8fCB7fSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYmxvYicsXG4gICAgICAgIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgIGJvZHk6IHRoaXMuaHR0cEJvZHlcbiAgICAgIH0pXG4gICAgICAucGlwZShmaW5hbGl6ZSgoKSA9PiB0aGlzLnNldERpc2FibGVkKGZhbHNlKSkpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzOiBIdHRwUmVzcG9uc2U8QmxvYj4pID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMjAwIHx8IHJlcy5ib2R5IS5zaXplIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkaXNwb3NpdGlvbiA9IHRoaXMuZ2V0RGlzcG9zaXRpb24ocmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LWRpc3Bvc2l0aW9uJykpO1xuICAgICAgICAgIGxldCBmaWxlTmFtZSA9IHRoaXMuZmlsZU5hbWU7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWxlTmFtZSA9PT0gJ2Z1bmN0aW9uJykgZmlsZU5hbWUgPSBmaWxlTmFtZShyZXMpO1xuICAgICAgICAgIGZpbGVOYW1lID1cbiAgICAgICAgICAgIGZpbGVOYW1lIHx8XG4gICAgICAgICAgICBkaXNwb3NpdGlvbltgZmlsZW5hbWUqYF0gfHxcbiAgICAgICAgICAgIGRpc3Bvc2l0aW9uW2BmaWxlbmFtZWBdIHx8XG4gICAgICAgICAgICByZXMuaGVhZGVycy5nZXQoJ2ZpbGVuYW1lJykgfHxcbiAgICAgICAgICAgIHJlcy5oZWFkZXJzLmdldCgneC1maWxlbmFtZScpO1xuICAgICAgICAgIHNhdmVBcyhyZXMuYm9keSEsIGRlY29kZVVSSShmaWxlTmFtZSBhcyBzdHJpbmcpKTtcbiAgICAgICAgICB0aGlzLnN1Y2Nlc3MuZW1pdChyZXMpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4gdGhpcy5lcnJvci5lbWl0KGVycilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==