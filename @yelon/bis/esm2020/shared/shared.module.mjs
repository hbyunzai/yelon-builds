/*
 * @Author: cui <devcui@outlook.com>
 * @Editor: microsoft vscode
 * @Date: 2021-11-27 11:30:50
 * @LastEditTime: 2021-11-27 14:41:18
 * @LastEditors: cui <devcui@outlook.com>
 * @Description: empty description
 * @FilePath: \yelon\packages\bis\shared\shared.module.ts
 * LICENSE HERE
 */
import { NgModule } from '@angular/core';
import { YZ_SHARED_YELON_MODULES } from './shared-yelon.module';
import { YZ_SHARED_ZORRO_MODULES } from './shared-zorro.module';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@yelon/abc/notice-icon";
import * as i3 from "@yelon/abc/reuse-tab";
import * as i4 from "@yelon/theme/layout-default";
import * as i5 from "@yelon/acl";
import * as i6 from "@yelon/form";
import * as i7 from "@yelon/abc/avatar-list";
import * as i8 from "@yelon/abc/count-down";
import * as i9 from "@yelon/abc/date-picker";
import * as i10 from "@yelon/abc/down-file";
import * as i11 from "@yelon/abc/ellipsis";
import * as i12 from "@yelon/abc/st";
import * as i13 from "@yelon/abc/sv";
import * as i14 from "@yelon/abc/se";
import * as i15 from "@yelon/abc/sg";
import * as i16 from "@yelon/abc/image";
import * as i17 from "@yelon/abc/loading";
import * as i18 from "@yelon/abc/qr";
import * as i19 from "@yelon/abc/onboarding";
import * as i20 from "@yelon/abc/error-collect";
import * as i21 from "@yelon/abc/exception";
import * as i22 from "@yelon/abc/footer-toolbar";
import * as i23 from "@yelon/abc/global-footer";
import * as i24 from "@yelon/abc/page-header";
import * as i25 from "@yelon/abc/result";
import * as i26 from "@yelon/abc/tag-select";
import * as i27 from "@yelon/abc/quick-menu";
import * as i28 from "@yelon/chart/bar";
import * as i29 from "@yelon/chart/card";
import * as i30 from "@yelon/chart/custom";
import * as i31 from "@yelon/chart/gauge";
import * as i32 from "@yelon/chart/mini-area";
import * as i33 from "@yelon/chart/mini-bar";
import * as i34 from "@yelon/chart/mini-progress";
import * as i35 from "@yelon/chart/pie";
import * as i36 from "@yelon/chart/radar";
import * as i37 from "@yelon/chart/single-bar";
import * as i38 from "@yelon/chart/tag-cloud";
import * as i39 from "@yelon/chart/timeline";
import * as i40 from "@yelon/chart/water-wave";
import * as i41 from "@yelon/chart/chart-echarts";
import * as i42 from "@yelon/chart/number-info";
import * as i43 from "@yelon/chart/trend";
import * as i44 from "@yelon/abc/media";
import * as i45 from "@yelon/theme/theme-btn";
import * as i46 from "@yelon/theme/setting-drawer";
import * as i47 from "@yelon/abc/pdf";
import * as i48 from "@yelon/util";
import * as i49 from "@yelon/abc/auto-focus";
import * as i50 from "@yelon/abc/let";
import * as i51 from "ng-zorro-antd/tree";
import * as i52 from "ng-zorro-antd/button";
import * as i53 from "ng-zorro-antd/message";
import * as i54 from "ng-zorro-antd/back-top";
import * as i55 from "ng-zorro-antd/dropdown";
import * as i56 from "ng-zorro-antd/grid";
import * as i57 from "ng-zorro-antd/carousel";
import * as i58 from "ng-zorro-antd/checkbox";
import * as i59 from "ng-zorro-antd/tooltip";
import * as i60 from "ng-zorro-antd/popover";
import * as i61 from "ng-zorro-antd/select";
import * as i62 from "ng-zorro-antd/icon";
import * as i63 from "ng-zorro-antd/affix";
import * as i64 from "ng-zorro-antd/badge";
import * as i65 from "ng-zorro-antd/alert";
import * as i66 from "ng-zorro-antd/modal";
import * as i67 from "ng-zorro-antd/table";
import * as i68 from "ng-zorro-antd/drawer";
import * as i69 from "ng-zorro-antd/tabs";
import * as i70 from "ng-zorro-antd/input";
import * as i71 from "ng-zorro-antd/date-picker";
import * as i72 from "ng-zorro-antd/tag";
import * as i73 from "ng-zorro-antd/input-number";
import * as i74 from "ng-zorro-antd/breadcrumb";
import * as i75 from "ng-zorro-antd/steps";
import * as i76 from "ng-zorro-antd/list";
import * as i77 from "ng-zorro-antd/switch";
import * as i78 from "ng-zorro-antd/radio";
import * as i79 from "ng-zorro-antd/form";
import * as i80 from "ng-zorro-antd/avatar";
import * as i81 from "ng-zorro-antd/card";
import * as i82 from "ng-zorro-antd/spin";
import * as i83 from "ng-zorro-antd/divider";
import * as i84 from "ng-zorro-antd/resizable";
import * as i85 from "ng-zorro-antd/anchor";
import * as i86 from "ng-zorro-antd/upload";
import * as i87 from "ng-zorro-antd/pagination";
import * as i88 from "ng-zorro-antd/empty";
import * as i89 from "ng-zorro-antd/core/highlight";
export class YzSharedModule {
}
YzSharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzSharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
YzSharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzSharedModule, imports: [i1.YunzaiThemeModule, i2.NoticeIconModule, i3.ReuseTabModule, i4.LayoutDefaultModule, i5.YelonACLModule, i6.YelonFormModule, i7.AvatarListModule, i8.CountDownModule, i9.DatePickerModule, i10.DownFileModule, i11.EllipsisModule, i12.STModule, i13.SVModule, i14.SEModule, i15.SGModule, i16.ImageModule, i17.LoadingModule, i18.QRModule, i19.OnboardingModule, i20.ErrorCollectModule, i21.ExceptionModule, i22.FooterToolbarModule, i23.GlobalFooterModule, i23.GlobalFooterModule, i24.PageHeaderModule, i25.ResultModule, i26.TagSelectModule, i2.NoticeIconModule, i27.QuickMenuModule, i28.G2BarModule, i29.G2CardModule, i30.G2CustomModule, i31.G2GaugeModule, i32.G2MiniAreaModule, i33.G2MiniBarModule, i34.G2MiniProgressModule, i35.G2PieModule, i36.G2RadarModule, i37.G2SingleBarModule, i38.G2TagCloudModule, i39.G2TimelineModule, i40.G2WaterWaveModule, i41.ChartEChartsModule, i42.NumberInfoModule, i43.TrendModule, i3.ReuseTabModule, i44.MediaModule, i45.ThemeBtnModule, i46.SettingDrawerModule, i47.PdfModule, i48.CurrencyPipeModule, i48.FormatPipeModule, i48.FilterPipeModule, i49.AutoFocusModule, i50.LetModule, i51.NzTreeModule, i52.NzButtonModule, i53.NzMessageModule, i54.NzBackTopModule, i55.NzDropDownModule, i56.NzGridModule, i57.NzCarouselModule, i58.NzCheckboxModule, i59.NzToolTipModule, i60.NzPopoverModule, i61.NzSelectModule, i62.NzIconModule, i63.NzAffixModule, i64.NzBadgeModule, i65.NzAlertModule, i66.NzModalModule, i67.NzTableModule, i68.NzDrawerModule, i69.NzTabsModule, i70.NzInputModule, i71.NzDatePickerModule, i72.NzTagModule, i73.NzInputNumberModule, i74.NzBreadCrumbModule, i75.NzStepsModule, i76.NzListModule, i77.NzSwitchModule, i78.NzRadioModule, i79.NzFormModule, i80.NzAvatarModule, i81.NzCardModule, i82.NzSpinModule, i83.NzDividerModule, i84.NzResizableModule, i85.NzAnchorModule, i86.NzUploadModule, i87.NzPaginationModule, i88.NzEmptyModule, i89.NzHighlightModule], exports: [i1.YunzaiThemeModule, i2.NoticeIconModule, i3.ReuseTabModule, i4.LayoutDefaultModule, i5.YelonACLModule, i6.YelonFormModule, i7.AvatarListModule, i8.CountDownModule, i9.DatePickerModule, i10.DownFileModule, i11.EllipsisModule, i12.STModule, i13.SVModule, i14.SEModule, i15.SGModule, i16.ImageModule, i17.LoadingModule, i18.QRModule, i19.OnboardingModule, i20.ErrorCollectModule, i21.ExceptionModule, i22.FooterToolbarModule, i23.GlobalFooterModule, i23.GlobalFooterModule, i24.PageHeaderModule, i25.ResultModule, i26.TagSelectModule, i2.NoticeIconModule, i27.QuickMenuModule, i28.G2BarModule, i29.G2CardModule, i30.G2CustomModule, i31.G2GaugeModule, i32.G2MiniAreaModule, i33.G2MiniBarModule, i34.G2MiniProgressModule, i35.G2PieModule, i36.G2RadarModule, i37.G2SingleBarModule, i38.G2TagCloudModule, i39.G2TimelineModule, i40.G2WaterWaveModule, i41.ChartEChartsModule, i42.NumberInfoModule, i43.TrendModule, i3.ReuseTabModule, i44.MediaModule, i45.ThemeBtnModule, i46.SettingDrawerModule, i47.PdfModule, i48.CurrencyPipeModule, i48.FormatPipeModule, i48.FilterPipeModule, i49.AutoFocusModule, i50.LetModule, i51.NzTreeModule, i52.NzButtonModule, i53.NzMessageModule, i54.NzBackTopModule, i55.NzDropDownModule, i56.NzGridModule, i57.NzCarouselModule, i58.NzCheckboxModule, i59.NzToolTipModule, i60.NzPopoverModule, i61.NzSelectModule, i62.NzIconModule, i63.NzAffixModule, i64.NzBadgeModule, i65.NzAlertModule, i66.NzModalModule, i67.NzTableModule, i68.NzDrawerModule, i69.NzTabsModule, i70.NzInputModule, i71.NzDatePickerModule, i72.NzTagModule, i73.NzInputNumberModule, i74.NzBreadCrumbModule, i75.NzStepsModule, i76.NzListModule, i77.NzSwitchModule, i78.NzRadioModule, i79.NzFormModule, i80.NzAvatarModule, i81.NzCardModule, i82.NzSpinModule, i83.NzDividerModule, i84.NzResizableModule, i85.NzAnchorModule, i86.NzUploadModule, i87.NzPaginationModule, i88.NzEmptyModule, i89.NzHighlightModule] });
YzSharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzSharedModule, imports: [[...YZ_SHARED_YELON_MODULES, ...YZ_SHARED_ZORRO_MODULES], i1.YunzaiThemeModule, i2.NoticeIconModule, i3.ReuseTabModule, i4.LayoutDefaultModule, i5.YelonACLModule, i6.YelonFormModule, i7.AvatarListModule, i8.CountDownModule, i9.DatePickerModule, i10.DownFileModule, i11.EllipsisModule, i12.STModule, i13.SVModule, i14.SEModule, i15.SGModule, i16.ImageModule, i17.LoadingModule, i18.QRModule, i19.OnboardingModule, i20.ErrorCollectModule, i21.ExceptionModule, i22.FooterToolbarModule, i23.GlobalFooterModule, i23.GlobalFooterModule, i24.PageHeaderModule, i25.ResultModule, i26.TagSelectModule, i2.NoticeIconModule, i27.QuickMenuModule, i28.G2BarModule, i29.G2CardModule, i30.G2CustomModule, i31.G2GaugeModule, i32.G2MiniAreaModule, i33.G2MiniBarModule, i34.G2MiniProgressModule, i35.G2PieModule, i36.G2RadarModule, i37.G2SingleBarModule, i38.G2TagCloudModule, i39.G2TimelineModule, i40.G2WaterWaveModule, i41.ChartEChartsModule, i42.NumberInfoModule, i43.TrendModule, i3.ReuseTabModule, i44.MediaModule, i45.ThemeBtnModule, i46.SettingDrawerModule, i47.PdfModule, i48.CurrencyPipeModule, i48.FormatPipeModule, i48.FilterPipeModule, i49.AutoFocusModule, i50.LetModule, i51.NzTreeModule, i52.NzButtonModule, i53.NzMessageModule, i54.NzBackTopModule, i55.NzDropDownModule, i56.NzGridModule, i57.NzCarouselModule, i58.NzCheckboxModule, i59.NzToolTipModule, i60.NzPopoverModule, i61.NzSelectModule, i62.NzIconModule, i63.NzAffixModule, i64.NzBadgeModule, i65.NzAlertModule, i66.NzModalModule, i67.NzTableModule, i68.NzDrawerModule, i69.NzTabsModule, i70.NzInputModule, i71.NzDatePickerModule, i72.NzTagModule, i73.NzInputNumberModule, i74.NzBreadCrumbModule, i75.NzStepsModule, i76.NzListModule, i77.NzSwitchModule, i78.NzRadioModule, i79.NzFormModule, i80.NzAvatarModule, i81.NzCardModule, i82.NzSpinModule, i83.NzDividerModule, i84.NzResizableModule, i85.NzAnchorModule, i86.NzUploadModule, i87.NzPaginationModule, i88.NzEmptyModule, i89.NzHighlightModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzSharedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...YZ_SHARED_YELON_MODULES, ...YZ_SHARED_ZORRO_MODULES],
                    exports: [...YZ_SHARED_YELON_MODULES, ...YZ_SHARED_ZORRO_MODULES]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0dBU0c7QUFDSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWhFLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWM7NEdBQWQsY0FBYyxZQUhoQixDQUFDLEdBQUcsdUJBQXVCLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQzsyRkFHdEQsY0FBYztrQkFKMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxHQUFHLHVCQUF1QixFQUFFLEdBQUcsdUJBQXVCLENBQUM7b0JBQ2pFLE9BQU8sRUFBRSxDQUFDLEdBQUcsdUJBQXVCLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogY3VpIDxkZXZjdWlAb3V0bG9vay5jb20+XG4gKiBARWRpdG9yOiBtaWNyb3NvZnQgdnNjb2RlXG4gKiBARGF0ZTogMjAyMS0xMS0yNyAxMTozMDo1MFxuICogQExhc3RFZGl0VGltZTogMjAyMS0xMS0yNyAxNDo0MToxOFxuICogQExhc3RFZGl0b3JzOiBjdWkgPGRldmN1aUBvdXRsb29rLmNvbT5cbiAqIEBEZXNjcmlwdGlvbjogZW1wdHkgZGVzY3JpcHRpb25cbiAqIEBGaWxlUGF0aDogXFx5ZWxvblxccGFja2FnZXNcXGJpc1xcc2hhcmVkXFxzaGFyZWQubW9kdWxlLnRzXG4gKiBMSUNFTlNFIEhFUkVcbiAqL1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWVpfU0hBUkVEX1lFTE9OX01PRFVMRVMgfSBmcm9tICcuL3NoYXJlZC15ZWxvbi5tb2R1bGUnO1xuaW1wb3J0IHsgWVpfU0hBUkVEX1pPUlJPX01PRFVMRVMgfSBmcm9tICcuL3NoYXJlZC16b3Jyby5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbLi4uWVpfU0hBUkVEX1lFTE9OX01PRFVMRVMsIC4uLllaX1NIQVJFRF9aT1JST19NT0RVTEVTXSxcbiAgZXhwb3J0czogWy4uLllaX1NIQVJFRF9ZRUxPTl9NT0RVTEVTLCAuLi5ZWl9TSEFSRURfWk9SUk9fTU9EVUxFU11cbn0pXG5leHBvcnQgY2xhc3MgWXpTaGFyZWRNb2R1bGUge31cbiJdfQ==