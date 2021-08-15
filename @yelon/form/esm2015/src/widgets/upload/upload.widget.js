import { Component, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { deepGet } from '@yelon/util/other';
import { getData, toBool } from '../../utils';
import { ControlUIWidget } from '../../widget';
export class UploadWidget extends ControlUIWidget {
    constructor() {
        super(...arguments);
        this.fileList = [];
        this.btnType = '';
        this.handleRemove = () => {
            this._setValue(this.fileList);
            return true;
        };
        this.handlePreview = (file) => {
            if (this.ui.preview) {
                this.ui.preview(file);
                return;
            }
            const _url = file.thumbUrl || file.url;
            if (!_url) {
                return;
            }
            this.injector.get(NzModalService).create({
                nzContent: `<img src="${_url}" class="img-fluid" />`,
                nzFooter: null
            });
        };
    }
    ngOnInit() {
        const { type, text, hint, action, accept, limit, filter, fileSize, fileType, listType, multiple, name, showUploadList, withCredentials, resReName, urlReName, beforeUpload, customRequest, directory, openFileDialogOnClick, limitFileCount } = this.ui;
        const res = {
            type: type || 'select',
            text: text || '点击上传',
            action: action || '',
            accept: accept || '',
            directory: toBool(directory, false),
            openFileDialogOnClick: toBool(openFileDialogOnClick, true),
            limit: limit == null ? 0 : +limit,
            filter: filter == null ? [] : filter,
            size: fileSize == null ? 0 : +fileSize,
            fileType: fileType || '',
            listType: listType || 'text',
            multiple: toBool(multiple, false),
            name: name || 'file',
            showUploadList: showUploadList == null ? true : showUploadList,
            withCredentials: toBool(withCredentials, false),
            resReName: (resReName || '').split('.'),
            urlReName: (urlReName || '').split('.'),
            beforeUpload: typeof beforeUpload === 'function' ? beforeUpload : null,
            customRequest: typeof customRequest === 'function' ? customRequest : null,
            limitFileCount: limitFileCount || 999
        };
        if (res.listType === 'picture-card') {
            this.btnType = 'plus';
        }
        if (res.type === 'drag') {
            res.listType = null;
            this.btnType = 'drag';
            res.text = text || `单击或拖动文件到该区域上传`;
            res.hint = hint || `支持单个或批量，严禁上传公司数据或其他安全文件`;
        }
        this.i = res;
    }
    change(args) {
        if (this.ui.change)
            this.ui.change(args);
        if (args.type !== 'success')
            return;
        this._setValue(args.fileList);
    }
    reset(value) {
        const { fileList } = this.ui;
        (fileList ? of(fileList) : Array.isArray(value) ? of(value) : getData(this.schema, this.ui, null)).subscribe(list => {
            this.fileList = list;
            this.formProperty._value = this.pureValue(list);
            this.formProperty.updateValueAndValidity({ onlySelf: false, emitValueEvent: false, emitValidator: false });
            this.detectChanges();
        });
    }
    _getValue(file) {
        return deepGet(file.response, this.i.resReName, file.response);
    }
    pureValue(fileList) {
        fileList
            .filter(file => !file.url)
            .forEach(file => {
            file.url = deepGet(file.response, this.i.urlReName);
        });
        const res = fileList.filter(w => w.status === 'done').map(file => this._getValue(file));
        return this.i.multiple === true ? res : res.pop();
    }
    _setValue(fileList) {
        this.setValue(this.pureValue(fileList));
    }
}
UploadWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-upload',
                template: "<sf-item-wrap [id]=\"id\" [schema]=\"schema\" [ui]=\"ui\" [showError]=\"showError\" [error]=\"error\" [showTitle]=\"schema.title\">\n  <nz-upload\n    [nzType]=\"i.type\"\n    [(nzFileList)]=\"fileList\"\n    [nzDisabled]=\"disabled\"\n    [nzAction]=\"i.action\"\n    [nzDirectory]=\"i.directory\"\n    [nzOpenFileDialogOnClick]=\"i.openFileDialogOnClick\"\n    [nzAccept]=\"i.accept\"\n    [nzLimit]=\"i.limit\"\n    [nzFilter]=\"i.filter\"\n    [nzSize]=\"i.size\"\n    [nzFileType]=\"i.fileType\"\n    [nzHeaders]=\"ui.headers\"\n    [nzData]=\"ui.data\"\n    [nzListType]=\"i.listType\"\n    [nzMultiple]=\"i.multiple\"\n    [nzName]=\"i.name\"\n    [nzShowUploadList]=\"i.showUploadList\"\n    [nzWithCredentials]=\"i.withCredentials\"\n    [nzBeforeUpload]=\"i.beforeUpload\"\n    [nzCustomRequest]=\"i.customRequest\"\n    [nzRemove]=\"ui.remove || handleRemove\"\n    [nzPreview]=\"handlePreview\"\n    [nzPreviewFile]=\"ui.previewFile\"\n    [nzDownload]=\"ui.download\"\n    [nzTransformFile]=\"ui.transformFile\"\n    (nzChange)=\"change($event)\"\n    [nzShowButton]=\"fileList.length < i.limitFileCount\"\n  >\n    <ng-container [ngSwitch]=\"btnType\">\n      <ng-container *ngSwitchCase=\"'plus'\">\n        <i nz-icon nzType=\"plus\"></i>\n        <div class=\"ant-upload-text\" [innerHTML]=\"i.text\"></div>\n      </ng-container>\n      <ng-container *ngSwitchCase=\"'drag'\">\n        <p class=\"ant-upload-drag-icon\"><i nz-icon nzType=\"inbox\"></i></p>\n        <p class=\"ant-upload-text\" [innerHTML]=\"i.text\"></p>\n        <p class=\"ant-upload-hint\" [innerHTML]=\"i.hint\"></p>\n      </ng-container>\n      <ng-container *ngSwitchDefault>\n        <button type=\"button\" nz-button><i nz-icon nzType=\"upload\"></i><span [innerHTML]=\"i.text\"></span></button>\n      </ng-container>\n    </ng-container>\n  </nz-upload>\n</sf-item-wrap>\n",
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm0vc3JjL3dpZGdldHMvdXBsb2FkL3VwbG9hZC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzFCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQVMvQyxNQUFNLE9BQU8sWUFBYSxTQUFRLGVBQXFDO0lBTnZFOztRQVFFLGFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBQzlCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFnR2IsaUJBQVksR0FBRyxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRixrQkFBYSxHQUFHLENBQUMsSUFBa0IsRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixPQUFPO2FBQ1I7WUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdkMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxPQUFPO2FBQ1I7WUFDRCxJQUFJLENB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Q0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU8sU0FBUyxDQUFDLFFBQXdCO1FBQ3hDLFFBQVE7YUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ0wsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRU8sU0FBUyxDQUFDLFFBQXdCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OztZQXZHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLHkxREFBbUM7Z0JBQ25DLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOek1vZGFsU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xuaW1wb3J0IHsgTnpVcGxvYWRDaGFuZ2VQYXJhbSwgTnpVcGxvYWRGaWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC91cGxvYWQnO1xuXG5pbXBvcnQgeyBkZWVwR2V0IH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuXG5pbXBvcnQgeyBTRlZhbHVlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlJztcbmltcG9ydCB7IGdldERhdGEsIHRvQm9vbCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IENvbnRyb2xVSVdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5pbXBvcnQgeyBTRlVwbG9hZFdpZGdldFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtdXBsb2FkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZC53aWRnZXQuaHRtbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFVwbG9hZFdpZGdldCBleHRlbmRzIENvbnRyb2xVSVdpZGdldDxTRlVwbG9hZFdpZGdldFNjaGVtYT4gaW1wbGVtZW50cyBPbkluaXQge1xuICBpOiBOelNhZmVBbnk7XG4gIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSA9IFtdO1xuICBidG5UeXBlID0gJyc7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgdHlwZSxcbiAgICAgIHRleHQsXG4gICAgICBoaW50LFxuICAgICAgYWN0aW9uLFxuICAgICAgYWNjZXB0LFxuICAgICAgbGltaXQsXG4gICAgICBmaWx0ZXIsXG4gICAgICBmaWxlU2l6ZSxcbiAgICAgIGZpbGVUeXBlLFxuICAgICAgbGlzdFR5cGUsXG4gICAgICBtdWx0aXBsZSxcbiAgICAgIG5hbWUsXG4gICAgICBzaG93VXBsb2FkTGlzdCxcbiAgICAgIHdpdGhDcmVkZW50aWFscyxcbiAgICAgIHJlc1JlTmFtZSxcbiAgICAgIHVybFJlTmFtZSxcbiAgICAgIGJlZm9yZVVwbG9hZCxcbiAgICAgIGN1c3RvbVJlcXVlc3QsXG4gICAgICBkaXJlY3RvcnksXG4gICAgICBvcGVuRmlsZURpYWxvZ09uQ2xpY2ssXG4gICAgICBsaW1pdEZpbGVDb3VudFxuICAgIH0gPSB0aGlzLnVpO1xuICAgIGNvbnN0IHJlczogTnpTYWZlQW55ID0ge1xuICAgICAgdHlwZTogdHlwZSB8fCAnc2VsZWN0JyxcbiAgICAgIHRleHQ6IHRleHQgfHwgJ+eCueWHu+S4iuS8oCcsXG4gICAgICBhY3Rpb246IGFjdGlvbiB8fCAnJyxcbiAgICAgIGFjY2VwdDogYWNjZXB0IHx8ICcnLFxuICAgICAgZGlyZWN0b3J5OiB0b0Jvb2woZGlyZWN0b3J5LCBmYWxzZSksXG4gICAgICBvcGVuRmlsZURpYWxvZ09uQ2xpY2s6IHRvQm9vbChvcGVuRmlsZURpYWxvZ09uQ2xpY2ssIHRydWUpLFxuICAgICAgbGltaXQ6IGxpbWl0ID09IG51bGwgPyAwIDogK2xpbWl0LFxuICAgICAgZmlsdGVyOiBmaWx0ZXIgPT0gbnVsbCA/IFtdIDogZmlsdGVyLFxuICAgICAgc2l6ZTogZmlsZVNpemUgPT0gbnVsbCA/IDAgOiArZmlsZVNpemUsXG4gICAgICBmaWxlVHlwZTogZmlsZVR5cGUgfHwgJycsXG4gICAgICBsaXN0VHlwZTogbGlzdFR5cGUgfHwgJ3RleHQnLFxuICAgICAgbXVsdGlwbGU6IHRvQm9vbChtdWx0aXBsZSwgZmFsc2UpLFxuICAgICAgbmFtZTogbmFtZSB8fCAnZmlsZScsXG4gICAgICBzaG93VXBsb2FkTGlzdDogc2hvd1VwbG9hZExpc3QgPT0gbnVsbCA/IHRydWUgOiBzaG93VXBsb2FkTGlzdCxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdG9Cb29sKHdpdGhDcmVkZW50aWFscywgZmFsc2UpLFxuICAgICAgcmVzUmVOYW1lOiAocmVzUmVOYW1lIHx8ICcnKS5zcGxpdCgnLicpLFxuICAgICAgdXJsUmVOYW1lOiAodXJsUmVOYW1lIHx8ICcnKS5zcGxpdCgnLicpLFxuICAgICAgYmVmb3JlVXBsb2FkOiB0eXBlb2YgYmVmb3JlVXBsb2FkID09PSAnZnVuY3Rpb24nID8gYmVmb3JlVXBsb2FkIDogbnVsbCxcbiAgICAgIGN1c3RvbVJlcXVlc3Q6IHR5cGVvZiBjdXN0b21SZXF1ZXN0ID09PSAnZnVuY3Rpb24nID8gY3VzdG9tUmVxdWVzdCA6IG51bGwsXG4gICAgICBsaW1pdEZpbGVDb3VudDogbGltaXRGaWxlQ291bnQgfHwgOTk5XG4gICAgfTtcbiAgICBpZiAocmVzLmxpc3RUeXBlID09PSAncGljdHVyZS1jYXJkJykge1xuICAgICAgdGhpcy5idG5UeXBlID0gJ3BsdXMnO1xuICAgIH1cbiAgICBpZiAocmVzLnR5cGUgPT09ICdkcmFnJykge1xuICAgICAgcmVzLmxpc3RUeXBlID0gbnVsbDtcbiAgICAgIHRoaXMuYnRuVHlwZSA9ICdkcmFnJztcbiAgICAgIHJlcy50ZXh0ID0gdGV4dCB8fCBg5Y2V5Ye75oiW5ouW5Yqo5paH5Lu25Yiw6K+l5Yy65Z+f5LiK5LygYDtcbiAgICAgIHJlcy5oaW50ID0gaGludCB8fCBg5pSv5oyB5Y2V5Liq5oiW5om56YeP77yM5Lil56aB5LiK5Lyg5YWs5Y+45pWw5o2u5oiW5YW25LuW5a6J5YWo5paH5Lu2YDtcbiAgICB9XG4gICAgdGhpcy5pID0gcmVzO1xuICB9XG5cbiAgY2hhbmdlKGFyZ3M6IE56VXBsb2FkQ2hhbmdlUGFyYW0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy51aS5jaGFuZ2UpIHRoaXMudWkuY2hhbmdlKGFyZ3MpO1xuICAgIGlmIChhcmdzLnR5cGUgIT09ICdzdWNjZXNzJykgcmV0dXJuO1xuICAgIHRoaXMuX3NldFZhbHVlKGFyZ3MuZmlsZUxpc3QpO1xuICB9XG5cbiAgcmVzZXQodmFsdWU6IFNGVmFsdWUpOiB2b2lkIHtcbiAgICBjb25zdCB7IGZpbGVMaXN0IH0gPSB0aGlzLnVpO1xuICAgIChmaWxlTGlzdCA/IG9mKGZpbGVMaXN0KSA6IEFycmF5LmlzQXJyYXkodmFsdWUpID8gb2YodmFsdWUpIDogZ2V0RGF0YSh0aGlzLnNjaGVtYSwgdGhpcy51aSwgbnVsbCkpLnN1YnNjcmliZShcbiAgICAgIGxpc3QgPT4ge1xuICAgICAgICB0aGlzLmZpbGVMaXN0ID0gbGlzdCBhcyBOelVwbG9hZEZpbGVbXTtcbiAgICAgICAgdGhpcy5mb3JtUHJvcGVydHkuX3ZhbHVlID0gdGhpcy5wdXJlVmFsdWUobGlzdCk7XG4gICAgICAgIHRoaXMuZm9ybVByb3BlcnR5LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogZmFsc2UsIGVtaXRWYWx1ZUV2ZW50OiBmYWxzZSwgZW1pdFZhbGlkYXRvcjogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRWYWx1ZShmaWxlOiBOelVwbG9hZEZpbGUpOiBOelNhZmVBbnkge1xuICAgIHJldHVybiBkZWVwR2V0KGZpbGUucmVzcG9uc2UsIHRoaXMuaS5yZXNSZU5hbWUsIGZpbGUucmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXJlVmFsdWUoZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKTogdm9pZCB7XG4gICAgZmlsZUxpc3RcbiAgICAgIC5maWx0ZXIoZmlsZSA9PiAhZmlsZS51cmwpXG4gICAgICAuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgZmlsZS51cmwgPSBkZWVwR2V0KGZpbGUucmVzcG9uc2UsIHRoaXMuaS51cmxSZU5hbWUpO1xuICAgICAgfSk7XG4gICAgY29uc3QgcmVzID0gZmlsZUxpc3QuZmlsdGVyKHcgPT4gdy5zdGF0dXMgPT09ICdkb25lJykubWFwKGZpbGUgPT4gdGhpcy5fZ2V0VmFsdWUoZmlsZSkpO1xuICAgIHJldHVybiB0aGlzLmkubXVsdGlwbGUgPT09IHRydWUgPyByZXMgOiByZXMucG9wKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRWYWx1ZShmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pOiB2b2lkIHtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMucHVyZVZhbHVlKGZpbGVMaXN0KSk7XG4gIH1cblxuICBoYW5kbGVSZW1vdmUgPSAoKSA9PiB7XG4gICAgdGhpcy5fc2V0VmFsdWUodGhpcy5maWxlTGlzdCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUHJldmlldyA9IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHtcbiAgICBpZiAodGhpcy51aS5wcmV2aWV3KSB7XG4gICAgICB0aGlzLnVpLnByZXZpZXcoZmlsZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IF91cmwgPSBmaWxlLnRodW1iVXJsIHx8IGZpbGUudXJsO1xuICAgIGlmICghX3VybCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluamVjdG9yLmdldDxOek1vZGFsU2VydmljZT4oTnpNb2RhbFNlcnZpY2UpLmNyZWF0ZSh7XG4gICAgICBuekNvbnRlbnQ6IGA8aW1nIHNyYz1cIiR7X3VybH1cIiBjbGFzcz1cImltZy1mbHVpZFwiIC8+YCxcbiAgICAgIG56Rm9vdGVyOiBudWxsXG4gICAgfSk7XG4gIH07XG59XG4iXX0=