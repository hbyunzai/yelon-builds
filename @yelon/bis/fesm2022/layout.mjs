import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, HostListener, Injectable, Inject, Input, Optional, NgModule, APP_INITIALIZER, inject } from '@angular/core';
import * as i1$3 from '@yelon/util';
import { WINDOW, useLocalStorageProjectInfo, useLocalStorageUser, useLocalStorageHeader, NavType, hasFavicon, setFavicon, useLocalStorageCurrent, useLocalStorageHeaderType, useLocalStorageDefaultRoute, log as log$1, deepCopy, YunzaiConfigService, useLocalStorageTenant } from '@yelon/util';
import * as i1$4 from '@yelon/theme/layout-default';
import * as i2$1 from '@yelon/socket';
import * as i4$1 from '@angular/common';
import { registerLocaleData, DOCUMENT, CommonModule } from '@angular/common';
import * as i4$4 from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import * as i5$2 from '@yelon/abc/reuse-tab';
import * as i3 from 'ng-zorro-antd/core/transition-patch';
import * as i4$2 from 'ng-zorro-antd/menu';
import * as i5 from 'ng-zorro-antd/dropdown';
import * as i6 from 'ng-zorro-antd/icon';
import * as i8$1 from 'ng-zorro-antd/avatar';
import * as i1 from 'ng-zorro-antd/modal';
import * as i1$1 from 'ng-zorro-antd/message';
import * as i1$2 from '@yelon/theme';
import { zh_CN as zh_CN$1, zh_TW as zh_TW$1, en_US as en_US$1, el_GR as el_GR$1, es_ES as es_ES$1, fr_FR as fr_FR$1, hr_HR as hr_HR$1, it_IT as it_IT$1, ko_KR as ko_KR$1, pl_PL as pl_PL$1, sl_SI as sl_SI$1, tr_TR as tr_TR$1, YunzaiI18nBaseService, YUNZAI_I18N_TOKEN, _HttpClient } from '@yelon/theme';
import screenfull from 'screenfull';
import { __decorate } from 'tslib';
import { InputBoolean } from '@yelon/util/decorator';
import { Subject, takeUntil, catchError, of, forkJoin, map as map$1, mergeMap, combineLatest, BehaviorSubject, throwError, filter, take, switchMap } from 'rxjs';
import ngEn from '@angular/common/locales/en';
import { zhCN, zhTW, enUS, el, es, fr, hr, it, ko, pl, sl, tr } from 'date-fns/locale';
import { map } from 'rxjs/operators';
import * as i2 from 'ng-zorro-antd/i18n';
import { zh_CN, zh_TW, en_US, el_GR, es_ES, fr_FR, hr_HR, it_IT, ko_KR, pl_PL, sl_SI, tr_TR } from 'ng-zorro-antd/i18n';
import ngElGr from '@angular/common/locales/el';
import ngEsEs from '@angular/common/locales/es';
import ngFr from '@angular/common/locales/fr';
import ngHr from '@angular/common/locales/hr';
import ngIt from '@angular/common/locales/it';
import ngKo from '@angular/common/locales/ko';
import ngPl from '@angular/common/locales/pl';
import ngSl from '@angular/common/locales/sl';
import ngTr from '@angular/common/locales/tr';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import { YA_SERVICE_TOKEN, ALLOW_ANONYMOUS } from '@yelon/auth';
import * as i3$1 from '@angular/cdk/platform';
import * as i4 from '@yelon/util/config';
import { YunzaiConfigService as YunzaiConfigService$1 } from '@yelon/util/config';
import { formatDistanceToNow } from 'date-fns';
import { log } from '@yelon/util/other';
import * as i4$3 from '@yelon/abc/notice-icon';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import * as i3$2 from '@angular/cdk/bidi';
import * as i8 from 'ng-zorro-antd/tooltip';
import * as i5$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i7 from 'ng-zorro-antd/grid';
import * as i9 from 'ng-zorro-antd/input';
import * as i7$1 from 'ng-zorro-antd/tabs';
import { HttpErrorResponse, HttpResponse, HttpResponseBase, HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';
import { AccountBookTwoTone, AccountBookFill, AccountBookOutline, AlertTwoTone, AlertFill, AlibabaOutline, AimOutline, AlipayCircleFill, AlertOutline, AlignCenterOutline, AlipayCircleOutline, AlipayOutline, AlignLeftOutline, AlignRightOutline, AmazonOutline, AliwangwangOutline, AliyunOutline, AlipaySquareFill, AmazonCircleFill, AndroidFill, AliwangwangFill, AntCloudOutline, AmazonSquareFill, AndroidOutline, ApartmentOutline, ApiTwoTone, ApiFill, ApiOutline, AntDesignOutline, AppstoreAddOutline, AppstoreFill, AppleOutline, AppstoreOutline, ArrowDownOutline, AppleFill, ArrowsAltOutline, AppstoreTwoTone, ArrowUpOutline, AreaChartOutline, ArrowLeftOutline, AudioFill, ArrowRightOutline, AudioTwoTone, AuditOutline, AudioMutedOutline, BackwardFill, AudioOutline, BackwardOutline, BankFill, BarcodeOutline, BellFill, BankTwoTone, BarsOutline, BankOutline, BehanceCircleFill, BehanceSquareFill, BoldOutline, BellOutline, BehanceOutline, BlockOutline, BehanceSquareOutline, BgColorsOutline, BellTwoTone, BarChartOutline, BookTwoTone, BookFill, BorderOuterOutline, BorderLeftOutline, BorderBottomOutline, BorderHorizontalOutline, BorderTopOutline, BorderOutline, BorderInnerOutline, BorderRightOutline, BoxPlotOutline, BoxPlotFill, BoxPlotTwoTone, BookOutline, BorderlessTableOutline, BorderVerticleOutline, BuildTwoTone, BuildOutline, BugFill, BugOutline, BugTwoTone, BulbFill, BulbTwoTone, BuildFill, BulbOutline, CalculatorFill, CalculatorTwoTone, CalendarFill, CalendarOutline, CalculatorOutline, CalendarTwoTone, CameraOutline, CameraFill, CameraTwoTone, CarTwoTone, CaretDownOutline, CarOutline, CaretLeftFill, CarFill, CaretRightOutline, CaretDownFill, CaretUpOutline, CaretRightFill, CarryOutFill, CarryOutOutline, CaretLeftOutline, CaretUpFill, BranchesOutline, CarryOutTwoTone, CheckCircleFill, CheckCircleOutline, CheckSquareOutline, CheckCircleTwoTone, CiCircleTwoTone, CheckOutline, CheckSquareTwoTone, CiOutline, CheckSquareFill, CiTwoTone, ChromeOutline, ClockCircleOutline, CiCircleOutline, ChromeFill, ClearOutline, CloseCircleTwoTone, CiCircleFill, CloseCircleOutline, ClockCircleFill, CloseCircleFill, ClockCircleTwoTone, CloseOutline, CloseSquareOutline, CloseSquareFill, CloudFill, CloseSquareTwoTone, CloudDownloadOutline, CloudTwoTone, CloudServerOutline, CloudUploadOutline, CloudSyncOutline, ClusterOutline, CodeSandboxCircleFill, CodeFill, CodepenCircleOutline, CloudOutline, CodeSandboxOutline, CodeOutline, CodeSandboxSquareFill, CodeTwoTone, CodepenSquareFill, CodepenOutline, CoffeeOutline, ColumnWidthOutline, CompressOutline, ColumnHeightOutline, CodepenCircleFill, CompassTwoTone, CommentOutline, ContainerFill, CompassOutline, ConsoleSqlOutline, ContactsOutline, ContainerTwoTone, ContactsFill, ContactsTwoTone, ContainerOutline, ControlFill, CopyFill, CopyOutline, CompassFill, CopyTwoTone, CopyrightOutline, CopyrightCircleOutline, ControlTwoTone, ControlOutline, CreditCardFill, CopyrightTwoTone, CrownFill, CopyrightCircleFill, CrownOutline, CustomerServiceTwoTone, CreditCardOutline, CustomerServiceOutline, DashboardTwoTone, CrownTwoTone, CreditCardTwoTone, CustomerServiceFill, DashboardFill, DashOutline, DatabaseOutline, DatabaseTwoTone, DatabaseFill, DashboardOutline, DeleteTwoTone, DeleteRowOutline, DeleteColumnOutline, DeliveredProcedureOutline, DeleteOutline, CopyrightCircleTwoTone, DesktopOutline, DeleteFill, DiffOutline, DiffFill, DeploymentUnitOutline, DiffTwoTone, DingtalkOutline, DollarCircleFill, DislikeFill, DingtalkSquareFill, DisconnectOutline, DollarCircleTwoTone, DollarOutline, DingtalkCircleFill, DislikeTwoTone, DollarTwoTone, DownCircleFill, DislikeOutline, DollarCircleOutline, DoubleLeftOutline, DownSquareFill, DownOutline, DownSquareOutline, DownSquareTwoTone, DownCircleTwoTone, DoubleRightOutline, DownCircleOutline, DownloadOutline, DotChartOutline, DribbbleCircleFill, DribbbleOutline, DribbbleSquareOutline, DropboxCircleFill, DingdingOutline, EditOutline, DribbbleSquareFill, DropboxSquareFill, EllipsisOutline, EnvironmentFill, EditFill, EnterOutline, EuroCircleFill, EuroTwoTone, EuroCircleOutline, EditTwoTone, EuroOutline, EnvironmentTwoTone, ExclamationCircleFill, ExpandAltOutline, EuroCircleTwoTone, ExclamationCircleTwoTone, EnvironmentOutline, ExperimentOutline, ExperimentFill, ExpandOutline, ExceptionOutline, ExportOutline, ExperimentTwoTone, ExclamationCircleOutline, ExclamationOutline, EyeFill, EyeInvisibleFill, EyeInvisibleTwoTone, DropboxOutline, DragOutline, FacebookOutline, FacebookFill, EyeTwoTone, EyeOutline, FastForwardFill, FieldBinaryOutline, FieldNumberOutline, FastBackwardOutline, FileAddFill, FastBackwardFill, FileExcelFill, FastForwardOutline, FieldStringOutline, FileDoneOutline, FileAddTwoTone, FileExcelTwoTone, FileExclamationFill, FileAddOutline, FileExclamationOutline, FieldTimeOutline, FileImageTwoTone, FileExcelOutline, FileExclamationTwoTone, FileImageFill, FileGifOutline, FileFill, FileMarkdownTwoTone, FileMarkdownOutline, FallOutline, FileImageOutline, EyeInvisibleOutline, FilePdfOutline, FileSearchOutline, FilePptTwoTone, FilePdfTwoTone, FileJpgOutline, FileTextFill, FilePptOutline, FileSyncOutline, FilePptFill, FileUnknownOutline, FileProtectOutline, FileTextTwoTone, FileWordFill, FileUnknownTwoTone, FileWordTwoTone, FileUnknownFill, FileTextOutline, FileZipFill, FilterTwoTone, FilterFill, FileWordOutline, FireOutline, FireTwoTone, FileZipOutline, FilterOutline, FlagTwoTone, FileTwoTone, FilePdfFill, FileOutline, FileMarkdownFill, FileZipTwoTone, FlagOutline, FolderAddTwoTone, FolderOpenFill, FireFill, FlagFill, FolderOutline, FolderViewOutline, FolderTwoTone, FontColorsOutline, FolderOpenTwoTone, FolderFill, ForwardOutline, FolderOpenOutline, ForkOutline, ForwardFill, FormatPainterOutline, FormatPainterFill, FormOutline, FrownFill, FrownTwoTone, FullscreenOutline, FontSizeOutline, FundFill, FunctionOutline, FundViewOutline, FullscreenExitOutline, GifOutline, FundProjectionScreenOutline, FundTwoTone, FolderAddFill, FunnelPlotTwoTone, GiftOutline, FunnelPlotFill, FundOutline, FrownOutline, GithubOutline, GoldFill, FolderAddOutline, GitlabFill, GiftFill, GitlabOutline, GoldTwoTone, GoogleCircleFill, GiftTwoTone, GooglePlusCircleFill, GoldOutline, GithubFill, GoogleOutline, GooglePlusOutline, GoogleSquareFill, GoldenFill, HddTwoTone, GooglePlusSquareFill, GlobalOutline, HeartOutline, HeartTwoTone, GroupOutline, HeartFill, HeatMapOutline, GatewayOutline, FunnelPlotOutline, HddFill, HomeFill, HighlightFill, HomeOutline, HistoryOutline, HighlightOutline, HddOutline, HourglassFill, HomeTwoTone, HourglassTwoTone, Html5Outline, Html5Fill, IdcardFill, Html5TwoTone, HourglassOutline, IdcardTwoTone, IdcardOutline, IeOutline, IeCircleFill, IeSquareFill, InboxOutline, ImportOutline, InfoCircleOutline, InfoCircleTwoTone, InsertRowAboveOutline, InsertRowRightOutline, InfoCircleFill, InfoOutline, InsertRowBelowOutline, HighlightTwoTone, InsuranceFill, InstagramFill, InteractionFill, InsertRowLeftOutline, InstagramOutline, InteractionOutline, ItalicOutline, InteractionTwoTone, LayoutOutline, IssuesCloseOutline, LayoutFill, LaptopOutline, LeftCircleFill, LayoutTwoTone, KeyOutline, LeftOutline, LeftCircleOutline, LeftSquareOutline, LeftSquareFill, LeftCircleTwoTone, LikeFill, LeftSquareTwoTone, LineOutline, LikeTwoTone, LinkedinOutline, LineChartOutline, LineHeightOutline, LinkedinFill, LinkOutline, LikeOutline, InsuranceOutline, Loading3QuartersOutline, LockFill, InsuranceTwoTone, MacCommandOutline, LockTwoTone, LoadingOutline, MailOutline, LoginOutline, MedicineBoxOutline, MailFill, MailTwoTone, MacCommandFill, ManOutline, MedicineBoxFill, MedicineBoxTwoTone, MediumCircleFill, MediumOutline, MehFill, MediumWorkmarkOutline, MenuFoldOutline, MehOutline, MediumSquareFill, MessageTwoTone, MehTwoTone, MergeCellsOutline, MinusCircleFill, MenuOutline, MenuUnfoldOutline, MessageFill, MinusCircleTwoTone, LockOutline, MinusOutline, MinusCircleOutline, LogoutOutline, MessageOutline, MoneyCollectFill, MinusSquareOutline, MinusSquareTwoTone, MobileOutline, MobileTwoTone, MoneyCollectOutline, MoreOutline, NotificationFill, NotificationOutline, MoneyCollectTwoTone, NodeIndexOutline, NodeExpandOutline, MonitorOutline, OrderedListOutline, NodeCollapseOutline, NumberOutline, PaperClipOutline, NotificationTwoTone, PauseCircleFill, PartitionOutline, PauseOutline, OneToOneOutline, PayCircleOutline, PayCircleFill, MinusSquareFill, PauseCircleOutline, PauseCircleTwoTone, PicCenterOutline, PicRightOutline, PercentageOutline, MobileFill, PictureOutline, PictureFill, PhoneTwoTone, PhoneFill, PieChartFill, PictureTwoTone, PieChartOutline, PlaySquareFill, PlayCircleTwoTone, PlayCircleFill, PlusCircleFill, PlaySquareTwoTone, PlaySquareOutline, PlayCircleOutline, PieChartTwoTone, PlusCircleOutline, PlusSquareFill, PoundCircleFill, PlusSquareOutline, PlusOutline, PoundOutline, PoundCircleOutline, PlusSquareTwoTone, PlusCircleTwoTone, PoweroffOutline, PoundCircleTwoTone, PhoneOutline, PrinterFill, PicLeftOutline, ProjectTwoTone, PrinterOutline, ProjectFill, ProfileOutline, ProfileTwoTone, ProjectOutline, PropertySafetyFill, PullRequestOutline, PropertySafetyOutline, PushpinOutline, PushpinTwoTone, PropertySafetyTwoTone, PushpinFill, QqOutline, QqCircleFill, QrcodeOutline, QqSquareFill, QuestionCircleTwoTone, QuestionCircleFill, RadarChartOutline, RadiusUprightOutline, QuestionCircleOutline, QuestionOutline, ReadFill, RadiusUpleftOutline, RadiusBottomleftOutline, RadiusSettingOutline, RadiusBottomrightOutline, ProfileFill, PrinterTwoTone, ReadOutline, ReconciliationFill, ReloadOutline, ReconciliationOutline, RedEnvelopeTwoTone, RedditCircleFill, RedoOutline, RedEnvelopeFill, RedditOutline, RestTwoTone, RightCircleOutline, RestOutline, RedditSquareFill, RestFill, RightCircleTwoTone, RightOutline, RightSquareFill, RightCircleFill, RightSquareOutline, RetweetOutline, RiseOutline, RightSquareTwoTone, RobotFill, RocketOutline, RobotOutline, RocketTwoTone, RocketFill, RedEnvelopeOutline, RollbackOutline, RotateRightOutline, RotateLeftOutline, ReconciliationTwoTone, SafetyCertificateTwoTone, SaveOutline, SafetyOutline, SaveFill, SaveTwoTone, ScheduleFill, SafetyCertificateOutline, ScanOutline, ScheduleTwoTone, SearchOutline, ScheduleOutline, SecurityScanTwoTone, SecurityScanOutline, ScissorOutline, SelectOutline, SecurityScanFill, SendOutline, SettingOutline, SettingTwoTone, SettingFill, ShareAltOutline, ShopOutline, ShopFill, ShopTwoTone, ShrinkOutline, ShakeOutline, ShoppingOutline, ShoppingCartOutline, ShoppingFill, SisternodeOutline, ShoppingTwoTone, SafetyCertificateFill, SkinOutline, SignalFill, SketchOutline, SkinTwoTone, SketchSquareFill, SkypeFill, SkinFill, SlackCircleFill, SlackSquareFill, SlidersTwoTone, SkypeOutline, SlidersFill, SlackSquareOutline, SmallDashOutline, SmileTwoTone, SlidersOutline, SnippetsFill, SnippetsOutline, SmileOutline, SolutionOutline, SlackOutline, SnippetsTwoTone, SoundTwoTone, SortAscendingOutline, SoundFill, SortDescendingOutline, SmileFill, SoundOutline, SplitCellsOutline, SketchCircleFill, StarOutline, StockOutline, StarTwoTone, StepForwardFill, StarFill, StepBackwardFill, StepForwardOutline, StopFill, SubnodeOutline, SwapLeftOutline, StopOutline, StopTwoTone, SwapRightOutline, SwapOutline, SwitcherTwoTone, SwitcherOutline, SyncOutline, StrikethroughOutline, SwitcherFill, TagOutline, TabletTwoTone, TabletOutline, TabletFill, TableOutline, TagsFill, TagFill, TagsTwoTone, TaobaoCircleOutline, StepBackwardOutline, TagsOutline, TagTwoTone, TaobaoOutline, ThunderboltOutline, TaobaoSquareFill, TeamOutline, TaobaoCircleFill, ThunderboltTwoTone, ToolFill, ThunderboltFill, ToTopOutline, ToolOutline, ToolTwoTone, TrademarkCircleFill, TrophyFill, TrademarkCircleTwoTone, TransactionOutline, TrademarkCircleOutline, TranslationOutline, TwitterCircleFill, TrophyOutline, TrademarkOutline, TrophyTwoTone, TwitterSquareFill, UnlockFill, TwitterOutline, UnderlineOutline, UndoOutline, UpCircleFill, UngroupOutline, UnlockTwoTone, UnlockOutline, UpOutline, UsbFill, UpCircleOutline, UnorderedListOutline, UpCircleTwoTone, UpSquareFill, UpSquareOutline, UserAddOutline, UsbTwoTone, UsergroupDeleteOutline, UpSquareTwoTone, UserOutline, UsbOutline, UserDeleteOutline, UserSwitchOutline, VerticalLeftOutline, VerticalAlignBottomOutline, VerifiedOutline, UsergroupAddOutline, UploadOutline, VerticalAlignMiddleOutline, VerticalAlignTopOutline, VerticalRightOutline, VideoCameraOutline, VideoCameraAddOutline, VideoCameraTwoTone, VideoCameraFill, WalletOutline, WalletFill, WarningFill, WarningOutline, WechatOutline, WalletTwoTone, WeiboCircleFill, WarningTwoTone, WeiboSquareFill, WeiboOutline, WeiboSquareOutline, WeiboCircleOutline, WechatFill, WhatsAppOutline, WifiOutline, WomanOutline, YoutubeFill, YahooOutline, WindowsFill, WindowsOutline, YoutubeOutline, YuqueOutline, ZhihuCircleFill, YuqueFill, ZhihuOutline, ZhihuSquareFill, ZoomInOutline, ZoomOutOutline, YahooFill } from '@ant-design/icons-angular/icons';
import * as i3$3 from '@yelon/acl';

class YunzaiClearStorageComponent {
    constructor(modalSrv, messageSrv) {
        this.modalSrv = modalSrv;
        this.messageSrv = messageSrv;
    }
    _click() {
        this.modalSrv.confirm({
            nzTitle: 'Make sure clear all local storage?',
            nzOnOk: () => {
                localStorage.clear();
                this.messageSrv.success('Clear Finished!');
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiClearStorageComponent, deps: [{ token: i1.NzModalService }, { token: i1$1.NzMessageService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiClearStorageComponent, selector: "yunzai-clearstorage", host: { listeners: { "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'storage.clear' | i18n }}
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiClearStorageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-clearstorage',
                    template: `
    <i nz-icon nzType="tool"></i>
    {{ 'storage.clear' | i18n }}
  `,
                    host: {
                        '[class.d-block]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.NzModalService }, { type: i1$1.NzMessageService }]; }, propDecorators: { _click: [{
                type: HostListener,
                args: ['click']
            }] } });

class YunzaiFullScreenComponent {
    constructor() {
        this.status = false;
    }
    _resize() {
        this.status = screenfull.isFullscreen;
    }
    _click() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFullScreenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiFullScreenComponent, selector: "yunzai-fullscreen", host: { listeners: { "window:resize": "_resize()", "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'exitFullscreen' : 'fullscreen') | i18n }}
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFullScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-fullscreen',
                    template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'exitFullscreen' : 'fullscreen') | i18n }}
  `,
                    host: {
                        '[class.d-block]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { _resize: [{
                type: HostListener,
                args: ['window:resize']
            }], _click: [{
                type: HostListener,
                args: ['click']
            }] } });

const YUNZAI_LANGS = {
    'zh-CN': {
        text: '简体中文',
        ng: ngZh,
        zorro: zh_CN,
        date: zhCN,
        yelon: zh_CN$1,
        abbr: '🇨🇳'
    },
    'zh-TW': {
        text: '繁体中文',
        ng: ngZhTw,
        zorro: zh_TW,
        date: zhTW,
        yelon: zh_TW$1,
        abbr: '🇭🇰'
    },
    'en-US': {
        text: 'English',
        ng: ngEn,
        zorro: en_US,
        date: enUS,
        yelon: en_US$1,
        abbr: '🇬🇧'
    },
    'el-GR': {
        text: 'Ελληνικά',
        ng: ngElGr,
        zorro: el_GR,
        date: el,
        yelon: el_GR$1,
        abbr: '🇬🇷'
    },
    'es-ES': {
        text: 'Español',
        ng: ngEsEs,
        zorro: es_ES,
        date: es,
        yelon: es_ES$1,
        abbr: '🇪🇸'
    },
    'fr-FR': {
        text: 'Français',
        ng: ngFr,
        zorro: fr_FR,
        date: fr,
        yelon: fr_FR$1,
        abbr: '🇫🇷'
    },
    'hr-HR': {
        text: 'Hrvatski',
        ng: ngHr,
        zorro: hr_HR,
        date: hr,
        yelon: hr_HR$1,
        abbr: '🇭🇷'
    },
    'it-IT': {
        text: 'Italiano',
        ng: ngIt,
        zorro: it_IT,
        date: it,
        yelon: it_IT$1,
        abbr: '🇮🇹'
    },
    'ko-KR': {
        text: '한국어',
        ng: ngKo,
        zorro: ko_KR,
        date: ko,
        yelon: ko_KR$1,
        abbr: '🇰🇷'
    },
    'pl-PL': {
        text: 'Polski',
        ng: ngPl,
        zorro: pl_PL,
        date: pl,
        yelon: pl_PL$1,
        abbr: '🇵🇱'
    },
    'sl-SI': {
        text: 'Slovenščina',
        ng: ngSl,
        zorro: sl_SI,
        date: sl,
        yelon: sl_SI$1,
        abbr: '🇸🇮'
    },
    'tr-TR': {
        text: 'Türkçe',
        ng: ngTr,
        zorro: tr_TR,
        date: tr,
        yelon: tr_TR$1,
        abbr: '🇹🇷'
    }
};

const DEFAULT = 'zh-CN';
class YunzaiI18NService extends YunzaiI18nBaseService {
    constructor(http, settings, nzI18nService, yelonLocaleService, platform, tokenService, cogSrv) {
        super(cogSrv);
        this.http = http;
        this.settings = settings;
        this.nzI18nService = nzI18nService;
        this.yelonLocaleService = yelonLocaleService;
        this.platform = platform;
        this.tokenService = tokenService;
        this._defaultLang = DEFAULT;
        this.$destroy = new Subject();
        if (this.tokenService.get()?.access_token) {
            const defaultLang = this.getDefaultLang();
            this.getLangs()
                .pipe(takeUntil(this.$destroy))
                .subscribe(langs => {
                this._defaultLang = langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
            });
        }
    }
    getDefaultLang() {
        if (!this.platform.isBrowser) {
            return DEFAULT;
        }
        if (this.settings.layout.lang) {
            return this.settings.layout.lang;
        }
        let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
        const arr = res.split('-');
        return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
    }
    loadLangData(lang) {
        if (ngDevMode) {
            return this.http.get(`assets/tmp/i18n/${lang}.json`);
        }
        else {
            return this.http
                .get(`/i18n/api/v2/language/${lang}`)
                .pipe(catchError(() => this.http.get(`assets/tmp/i18n/${lang}.json`)));
        }
    }
    use(lang, data) {
        if (this._currentLang === lang)
            return;
        this._data = this.flatData(data, []);
        const item = YUNZAI_LANGS[lang];
        if (item) {
            registerLocaleData(item.ng);
            this.nzI18nService.setLocale(item.zorro);
            this.nzI18nService.setDateLocale(item.date);
            this.yelonLocaleService.setLocale(item.yelon);
            this._currentLang = lang;
            this._change$.next(lang);
        }
        else {
            registerLocaleData(ngEn);
            this.nzI18nService.setLocale(en_US);
            this.nzI18nService.setDateLocale(enUS);
            this.yelonLocaleService.setLocale(en_US$1);
            this._currentLang = lang;
            this._change$.next(lang);
        }
    }
    getLangs() {
        const langs = Object.keys(YUNZAI_LANGS).map(code => {
            const item = YUNZAI_LANGS[code];
            return { code, text: item.text, abbr: item.abbr, image: undefined };
        });
        if (ngDevMode) {
            return of(langs);
        }
        else {
            return this.http.get(`/i18n/api/v2/language`).pipe(map((response) => {
                return response.data;
            }), catchError(() => of(langs)));
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NService, deps: [{ token: i1$2._HttpClient }, { token: i1$2.SettingsService }, { token: i2.NzI18nService }, { token: i1$2.YelonLocaleService }, { token: i3$1.Platform }, { token: YA_SERVICE_TOKEN }, { token: i4.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$2._HttpClient }, { type: i1$2.SettingsService }, { type: i2.NzI18nService }, { type: i1$2.YelonLocaleService }, { type: i3$1.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i4.YunzaiConfigService }]; } });

class YunzaiI18NComponent {
    get curLangCode() {
        return this.settings.layout.lang;
    }
    constructor(settings, i18n, doc) {
        this.settings = settings;
        this.i18n = i18n;
        this.doc = doc;
        /** Whether to display language text */
        this.showLangText = true;
        this.$destroy = new Subject();
        this.langs = [];
        this.i18n
            .getLangs()
            .pipe(takeUntil(this.$destroy))
            .subscribe(langs => {
            this.langs = langs;
        });
    }
    change(lang) {
        const spinEl = this.doc.createElement('div');
        spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
        spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
        this.doc.body.appendChild(spinEl);
        this.i18n.loadLangData(lang).subscribe(res => {
            this.i18n.use(lang, res);
            this.settings.setLayout('lang', lang);
            setTimeout(() => this.doc.location.reload());
        });
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NComponent, deps: [{ token: i1$2.SettingsService }, { token: YUNZAI_I18N_TOKEN }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiI18NComponent, selector: "yunzai-i18n", inputs: { showLangText: "showLangText" }, ngImport: i0, template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'lang.nav' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i
      *ngIf="!showLangText"
      nz-dropdown
      [nzDropdownMenu]="langMenu"
      nzPlacement="bottomRight"
      nz-icon
      nzType="global"
    ></i>
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          data-event-id="_nav_lang"
          [attr.data-text]="item.text"
          nz-menu-item
          *ngFor="let item of langs"
          [nzSelected]="item.code === curLangCode"
          (click)="change(item.code)"
        >
          <span *ngIf="!item.icon" role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          <img
            *ngIf="item.icon"
            style="margin-right:4px"
            width="50px"
            height="30px"
            [src]="'data:image/png;base64,' + item.icon"
            [alt]="item.abbr"
            class="pr-xs"
          />
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i4$2.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    InputBoolean()
], YunzaiI18NComponent.prototype, "showLangText", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-i18n',
                    template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'lang.nav' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i
      *ngIf="!showLangText"
      nz-dropdown
      [nzDropdownMenu]="langMenu"
      nzPlacement="bottomRight"
      nz-icon
      nzType="global"
    ></i>
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          data-event-id="_nav_lang"
          [attr.data-text]="item.text"
          nz-menu-item
          *ngFor="let item of langs"
          [nzSelected]="item.code === curLangCode"
          (click)="change(item.code)"
        >
          <span *ngIf="!item.icon" role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          <img
            *ngIf="item.icon"
            style="margin-right:4px"
            width="50px"
            height="30px"
            [src]="'data:image/png;base64,' + item.icon"
            [alt]="item.abbr"
            class="pr-xs"
          />
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1$2.SettingsService }, { type: YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { showLangText: [{
                type: Input
            }] } });

class YunzaiNotifyComponent {
    constructor(injector, msg, y18n, nzI18n, cdr, httpClient) {
        this.injector = injector;
        this.msg = msg;
        this.y18n = y18n;
        this.nzI18n = nzI18n;
        this.cdr = cdr;
        this.httpClient = httpClient;
        this.data = [
            {
                key: 'msg',
                title: this.y18n.fanyi('notify.message'),
                list: [],
                emptyText: this.y18n.fanyi('notify.message.empty'),
                emptyImage: './assets/tmp/img/message.svg',
                clearText: this.y18n.fanyi('notify.message.clear')
            },
            {
                key: 'todo',
                title: this.y18n.fanyi('notify.todo'),
                list: [],
                emptyText: this.y18n.fanyi('notify.todo.empty'),
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: this.y18n.fanyi('notify.todo.clear')
            },
            {
                key: 'notice',
                title: this.y18n.fanyi('notify.notice'),
                list: [],
                emptyText: this.y18n.fanyi('notify.notice.empty'),
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: this.y18n.fanyi('notify.notice.clear')
            }
        ];
        this.loading = false;
        this.count = 0;
        this.subs = [];
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.count = 0;
        this.loading = true;
        this.subs.push(forkJoin(this.loadTodo(), this.loadMessage()).subscribe(() => {
            this.loading = false;
            this.cdr.detectChanges();
        }));
    }
    loadMessage() {
        log('notify.component: ', 'fetch message list');
        const formatMessageStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.y18n.fanyi('notify.unread'), color: 'red' };
                case '1':
                    return { extra: this.y18n.fanyi('notify.readed'), color: 'green' };
                default:
                    return { extra: this.y18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.httpClient
            .post(`/message-center-3/my-msg-and-todo/msg-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map$1((response) => {
            const viewMessage = this.data.filter(d => d.key === 'msg')[0];
            viewMessage.list = response.data.list.map((m) => {
                return {
                    ...m,
                    avatar: m?.imgUrl || './assets/tmp/img/message.png',
                    title: m.systemName,
                    description: m.content,
                    extra: formatMessageStatus(m.status).extra,
                    color: formatMessageStatus(m.status).color,
                    datetime: formatDistanceToNow(new Date(m.date), { locale: this.nzI18n.getDateLocale() })
                };
            });
            this.count += viewMessage.list.length;
        }));
    }
    loadTodo() {
        log('notify.component: ', 'fetch todo list');
        const formatTodoStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.y18n.fanyi('notify.unstart'), color: 'red' };
                case '1':
                    return { extra: this.y18n.fanyi('notify.started'), color: 'green' };
                default:
                    return { extra: this.y18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.httpClient
            .post(`/message-center-3/my-msg-and-todo/todo-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map$1((response) => {
            const viewTodo = this.data.filter(d => d.key === 'todo')[0];
            viewTodo.list = response.data.list.map((t) => {
                return {
                    ...t,
                    avatar: t?.imgUrl || './assets/tmp/img/todo.png',
                    title: t.systemName,
                    description: t.content,
                    datetime: formatDistanceToNow(new Date(t.date), { locale: this.nzI18n.getDateLocale() }),
                    extra: formatTodoStatus(t.status).extra,
                    color: formatTodoStatus(t.status).color
                };
            });
            this.count += viewTodo.list.length;
        }));
    }
    clear(type) {
        const t = this.data.filter(d => d.title === type)[0];
        if (t.key == 'msg' || t.key == 'notice') {
            this.subs.push(this.httpClient.post(`/message-center-3/my-msg-and-todo/msg-clear`, {}).subscribe(_ => {
                this.msg.success(`${this.y18n.fanyi('notify.clear')} ${type}`);
                this.loadData();
            }));
        }
        if (t.key == 'todo') {
            this.loadData();
        }
    }
    select(res) {
        this.injector.get(WINDOW).open(res.item.url);
        this.loadData();
    }
    ngOnDestroy() {
        this.subs.forEach(a => a.unsubscribe());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiNotifyComponent, deps: [{ token: i0.Injector }, { token: i1$1.NzMessageService }, { token: YUNZAI_I18N_TOKEN }, { token: i2.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i1$2._HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiNotifyComponent, selector: "yunzai-notify", ngImport: i0, template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `, isInline: true, dependencies: [{ kind: "component", type: i4$3.NoticeIconComponent, selector: "notice-icon", inputs: ["data", "count", "loading", "popoverVisible", "btnClass", "btnIconClass", "centered"], outputs: ["select", "clear", "popoverVisibleChange"], exportAs: ["noticeIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiNotifyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-notify',
                    template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.NzMessageService }, { type: YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i2.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i1$2._HttpClient }]; } });

class YunzaiThemBtnComponent {
    constructor(renderer, configSrv, platform, doc, directionality, KEYS) {
        this.renderer = renderer;
        this.configSrv = configSrv;
        this.platform = platform;
        this.doc = doc;
        this.directionality = directionality;
        this.KEYS = KEYS;
        this.theme = 'default';
        this.types = [
            { key: 'default', text: 'theme.default', color: '#2163ff' },
            { key: 'compact', text: 'theme.compact', color: '#2163ff' },
            { key: 'dark', text: 'theme.dark', color: '#020202' },
            { key: 'yuhong', text: 'theme.yuhong', color: '#C04851' },
            { key: 'danjuhuang', text: 'theme.danjuhuang', color: '#FBA414' },
            { key: 'xinghuang', text: 'theme.xinghuang', color: '#F28E16' },
            { key: 'shilv', text: 'theme.shilv', color: '#57C3C2' },
            { key: 'zhulv', text: 'theme.zhulv', color: '#1BA784' },
            { key: 'youlan', text: 'theme.youlan', color: '#1781B5' },
            { key: 'dianqing', text: 'theme.dianqing', color: '#1661AB' },
            { key: 'shangengzi', text: 'theme.shangengzi', color: '#61649F' },
            { key: 'shuiniuhui', text: 'theme.shuiniuhui', color: '#2F2F35' }
        ];
        this.devTips = `When the dark.css file can't be found, you need to run it once: npm run theme`;
        this.deployUrl = '';
        this.dir = 'ltr';
        this.$destroy = new Subject();
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.$destroy)).subscribe((direction) => {
            this.dir = direction;
        });
        this.initTheme();
    }
    initTheme() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = localStorage.getItem(this.KEYS) || 'default';
        this.updateChartTheme();
        this.onThemeChange(this.theme);
    }
    updateChartTheme() {
        this.configSrv.set('chart', { theme: this.theme === 'dark' ? 'dark' : '' });
    }
    onThemeChange(theme) {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = theme;
        this.renderer.setAttribute(this.doc.body, 'data-theme', theme);
        const dom = this.doc.getElementById(this.KEYS);
        if (dom) {
            dom.remove();
        }
        localStorage.removeItem(this.KEYS);
        if (theme !== 'default') {
            const el = this.doc.createElement('link');
            el.type = 'text/css';
            el.rel = 'stylesheet';
            el.id = this.KEYS;
            el.href = `${this.deployUrl}assets/style.${theme}.css`;
            localStorage.setItem(this.KEYS, theme);
            this.doc.body.append(el);
        }
        this.updateChartTheme();
    }
    ngOnDestroy() {
        this.$destroy.complete();
        const el = this.doc.getElementById(this.KEYS);
        if (el != null) {
            this.doc.body.removeChild(el);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiThemBtnComponent, deps: [{ token: i0.Renderer2 }, { token: i4.YunzaiConfigService }, { token: i3$1.Platform }, { token: DOCUMENT }, { token: i3$2.Directionality, optional: true }, { token: YUNZAI_THEME_BTN_KEYS }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiThemBtnComponent, selector: "yunzai-theme-btn", inputs: { types: "types", devTips: "devTips", deployUrl: "deployUrl" }, ngImport: i0, template: `
    <div
      data-event-id="_nav_theme"
      class="yunzai-default__nav-item"
      nz-dropdown
      [nzDropdownMenu]="iconMenu"
      nzTrigger="click"
      nzPlacement="bottomRight"
    >
      <svg nz-tooltip class="anticon" role="img" width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
        <g fill-rule="evenodd">
          <g fill-rule="nonzero">
            <path
              d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <nz-dropdown-menu #iconMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          data-event-id="_nav_theme"
          [attr.data-text]="theme.text | i18n"
          *ngFor="let theme of types"
          (click)="onThemeChange(theme.key)"
          [style]="{ color: theme.color }"
        >
          <i nz-icon nzType="bg-colors"></i>
          {{ theme.text | i18n }}
        </li>
      </ul>
      <!--      <div nz-menu class="wd-xl animated jello">-->
      <!--        <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" class="app-icons">-->
      <!--          <div nz-col [nzSpan]="4" *ngFor="let theme of types" (click)="onThemeChange(theme.key)">-->
      <!--            <i nz-icon nzType="bg-colors" class="text-white" [style]="{ backgroundColor: theme.color }"></i>-->
      <!--            <span [ngStyle]="{ color: theme.color }">{{ theme.text | i18n }}</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i4$2.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i8.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiThemBtnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-theme-btn',
                    template: `
    <div
      data-event-id="_nav_theme"
      class="yunzai-default__nav-item"
      nz-dropdown
      [nzDropdownMenu]="iconMenu"
      nzTrigger="click"
      nzPlacement="bottomRight"
    >
      <svg nz-tooltip class="anticon" role="img" width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
        <g fill-rule="evenodd">
          <g fill-rule="nonzero">
            <path
              d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <nz-dropdown-menu #iconMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          data-event-id="_nav_theme"
          [attr.data-text]="theme.text | i18n"
          *ngFor="let theme of types"
          (click)="onThemeChange(theme.key)"
          [style]="{ color: theme.color }"
        >
          <i nz-icon nzType="bg-colors"></i>
          {{ theme.text | i18n }}
        </li>
      </ul>
      <!--      <div nz-menu class="wd-xl animated jello">-->
      <!--        <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" class="app-icons">-->
      <!--          <div nz-col [nzSpan]="4" *ngFor="let theme of types" (click)="onThemeChange(theme.key)">-->
      <!--            <i nz-icon nzType="bg-colors" class="text-white" [style]="{ backgroundColor: theme.color }"></i>-->
      <!--            <span [ngStyle]="{ color: theme.color }">{{ theme.text | i18n }}</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </nz-dropdown-menu>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i4.YunzaiConfigService }, { type: i3$1.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3$2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YUNZAI_THEME_BTN_KEYS]
                }] }]; }, propDecorators: { types: [{
                type: Input
            }], devTips: [{
                type: Input
            }], deployUrl: [{
                type: Input
            }] } });

const BUSINESS_DEFAULT_CONFIG = {
    baseUrl: '/backstage',
    systemCode: 'portal',
    nav: {
        mine: true,
        all: true
    },
    loginForm: null,
    refreshTokenEnabled: true,
    refreshTokenType: 're-request'
};
function mergeBisConfig(srv) {
    return srv.merge('bis', BUSINESS_DEFAULT_CONFIG);
}

class YunzaiUserComponent {
    constructor(injector, msg, tokenService, 
    // @ts-ignore
    configService) {
        this.injector = injector;
        this.msg = msg;
        this.tokenService = tokenService;
        this.configService = configService;
        this.icon = '';
        this.username = '';
        this.menus = [];
        this.config = mergeBisConfig(configService);
    }
    ngOnInit() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const [, getUser] = useLocalStorageUser();
        const projectInfo = getProjectInfo();
        const user = getUser();
        this.username = user.realname ? user.realname : '未命名';
        this.icon = user.avatarId
            ? `${this.config.baseUrl}/filecenter/file/${user.avatarId}`
            : `./assets/tmp/img/avatar.jpg`;
        this.menus = projectInfo.profileList;
    }
    logout() {
        localStorage.clear();
        this.tokenService.clear();
        this.injector.get(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
    }
    to(href) {
        if (href) {
            this.injector.get(WINDOW).open(href);
        }
        else {
            this.msg.error('该菜单没有配置链接!');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiUserComponent, deps: [{ token: i0.Injector }, { token: i1$1.NzMessageService }, { token: YA_SERVICE_TOKEN }, { token: i1$3.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiUserComponent, selector: "yunzai-user", ngImport: i0, template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      data-event-id="_nav_user"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <div class="yz-user-name">
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
        {{ username }}
      </div>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div
          data-event-id="_nav_user"
          [attr.data-name]="m.name | i18n"
          nz-menu-item
          *ngFor="let m of menus"
          (click)="to(m.url)"
        >
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i4$2.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i4$2.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i8$1.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-user',
                    template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      data-event-id="_nav_user"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <div class="yz-user-name">
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
        {{ username }}
      </div>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div
          data-event-id="_nav_user"
          [attr.data-name]="m.name | i18n"
          nz-menu-item
          *ngFor="let m of menus"
          (click)="to(m.url)"
        >
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.NzMessageService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i1$3.YunzaiConfigService }]; } });

class LayoutNavApplicationComponent {
    get showAllMenu() {
        if (this.bis.nav)
            return this.bis.nav.all;
        return true;
    }
    get showMineMenu() {
        if (this.bis.nav)
            return this.bis.nav.mine;
        return true;
    }
    constructor(i18n, http, inject, 
    // @ts-ignore
    configService, win) {
        this.i18n = i18n;
        this.http = http;
        this.inject = inject;
        this.configService = configService;
        this.win = win;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.$destroy = new Subject();
        this.state = {
            active: false,
            type: 'all',
            topic: undefined,
            topics: [],
            list: [],
            search: null,
        };
        this.bis = mergeBisConfig(configService);
    }
    ngOnInit() {
        this.fetchAllTopic();
        this.attachNav('all');
        this.win.addEventListener("click", (event) => {
            const { target } = event;
            const btn = this.win.document.getElementById("navBtn");
            const dropdown = this.win.document.getElementById("navDropdown");
            if (btn && dropdown && !dropdown.contains(target) && !btn.contains(target)) {
                this.state.active = false;
            }
        });
    }
    fetchAllTopic() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topics = getTopics();
    }
    attachNav(type, topic) {
        this.state.type = type;
        this.clearSearch();
        if (type === 'all') {
            this.displayAllNav();
        }
        if (type === 'mine') {
            this.displayMineNav();
        }
        if (type === 'other' && topic) {
            this.displayOtherNav(topic);
        }
    }
    clearSearch() {
        this.state.search = null;
    }
    displayAllNav() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.list = getTopics();
    }
    displayMineNav() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.list = getTopics()
            .filter((topic) => {
            topic.children = topic.children.filter((child) => {
                return child.auth;
            });
            return topic;
        })
            .filter((topic) => {
            return topic.children.length > 0;
        });
    }
    displayOtherNav(topic) {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topic = topic;
        const temp = getTopics();
        this.state.list = temp.filter(t => t.key === topic.key)[0].children;
    }
    diffChange(flag) {
        if (flag) {
            this.state.active = flag;
        }
        else {
            this.state.active = !this.state.active;
        }
    }
    open(topic) {
        if (topic.key) {
            this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .pipe(takeUntil(this.$destroy))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'blank':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'target':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            default:
                this.inject.get(WINDOW).location.href = topic.url;
                break;
        }
    }
    onSearch() {
        const [, getTopics] = useLocalStorageHeader();
        const temp = getTopics();
        if (this.state.search) {
            this.state.list = temp
                .filter((topic) => {
                if (this.i18n.fanyi(topic.name).includes(this.state.search)) {
                    return topic;
                }
                else {
                    topic.children = topic.children.filter((child) => {
                        return this.i18n.fanyi(child.name).includes(this.state.search);
                    });
                    return topic;
                }
            })
                .filter((topic) => {
                return topic.children.length > 0;
            });
        }
        else {
            const [, getTopics] = useLocalStorageHeader();
            this.state.list = getTopics();
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavApplicationComponent, deps: [{ token: YunzaiI18NService }, { token: i1$2._HttpClient }, { token: i0.Injector }, { token: i1$3.YunzaiConfigService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LayoutNavApplicationComponent, selector: "layout-nav-application", ngImport: i0, template: `
    <!--      search start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            data-event-id="_nav_search"
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="state.search"
            (ngModelChange)="onSearch()"
          />
          <ng-template #prefixTemplate>
            <i nz-icon nzType="search" nzTheme="outline"></i>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-template>
    <!-- search end -->

    <!-- right menu start -->
    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          <li *ngFor="let topic of state.list">
            <h5>{{ topic.name | i18n }}</h5>
            <a
              data-event-id="_nav_item"
              [attr.data-name]="nav.name | i18n"
              href="javascript:;"
              *ngFor="let nav of topic.children"
              (click)="open(nav)"
            >{{ nav.name | i18n }}</a
            >
          </li>
        </ul>
      </div>
    </ng-template>
    <!-- right menu end -->

    <!--      button start-->
    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item"
         (click)="diffChange()"> {{ 'mode.nav' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div *ngIf="showAllMenu" data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text"
             (click)="attachNav('all')">{{
          'mode.nav.all' | i18n
          }}</div>
        <div *ngIf="showMineMenu" data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text"
             (click)="attachNav('mine')">{{
          'mode.nav.mine' | i18n
          }}</div>
        <div
          data-event-id="_nav_topic"
          [attr.data-name]="nav.name | i18n"
          class="yz-application-text"
          *ngFor="let nav of state.topics"
          (click)="attachNav('other', nav)"
        >{{ nav.name | i18n }}</div
        >
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="state.topic" class="yz-application-container">
        <div *ngIf="state.type === 'all'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'mine'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'other'" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li
                data-event-id="_nav_item"
                [attr.data-name]="nav.name | i18n"
                *ngFor="let nav of state.list"
                (click)="open(nav)"
              >
                <a href="javascript:;">
                  <h4>{{ nav.name | i18n }}</h4>
                  <p>{{ nav.intro | i18n }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i5$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i7.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i7.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: i9.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i9.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzStatus", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }, { kind: "directive", type: i9.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `layout-nav-application`,
                    template: `
    <!--      search start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            data-event-id="_nav_search"
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="state.search"
            (ngModelChange)="onSearch()"
          />
          <ng-template #prefixTemplate>
            <i nz-icon nzType="search" nzTheme="outline"></i>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-template>
    <!-- search end -->

    <!-- right menu start -->
    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          <li *ngFor="let topic of state.list">
            <h5>{{ topic.name | i18n }}</h5>
            <a
              data-event-id="_nav_item"
              [attr.data-name]="nav.name | i18n"
              href="javascript:;"
              *ngFor="let nav of topic.children"
              (click)="open(nav)"
            >{{ nav.name | i18n }}</a
            >
          </li>
        </ul>
      </div>
    </ng-template>
    <!-- right menu end -->

    <!--      button start-->
    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item"
         (click)="diffChange()"> {{ 'mode.nav' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div *ngIf="showAllMenu" data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text"
             (click)="attachNav('all')">{{
          'mode.nav.all' | i18n
          }}</div>
        <div *ngIf="showMineMenu" data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text"
             (click)="attachNav('mine')">{{
          'mode.nav.mine' | i18n
          }}</div>
        <div
          data-event-id="_nav_topic"
          [attr.data-name]="nav.name | i18n"
          class="yz-application-text"
          *ngFor="let nav of state.topics"
          (click)="attachNav('other', nav)"
        >{{ nav.name | i18n }}</div
        >
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="state.topic" class="yz-application-container">
        <div *ngIf="state.type === 'all'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'mine'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'other'" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li
                data-event-id="_nav_item"
                [attr.data-name]="nav.name | i18n"
                *ngFor="let nav of state.list"
                (click)="open(nav)"
              >
                <a href="javascript:;">
                  <h4>{{ nav.name | i18n }}</h4>
                  <p>{{ nav.intro | i18n }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `
                }]
        }], ctorParameters: function () { return [{ type: YunzaiI18NService }, { type: i1$2._HttpClient }, { type: i0.Injector }, { type: i1$3.YunzaiConfigService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });

class LayoutNavGroupComponent {
    constructor(inject, http) {
        this.inject = inject;
        this.http = http;
        this.$destroy = new Subject();
        this.state = {
            topics: []
        };
    }
    ngOnInit() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topics = getTopics() || [];
    }
    open(topic) {
        if (topic.key) {
            this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .pipe(takeUntil(this.$destroy))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'blank':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'target':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            default:
                this.inject.get(WINDOW).location.href = topic.url;
                break;
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavGroupComponent, deps: [{ token: i0.Injector }, { token: i1$2._HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LayoutNavGroupComponent, selector: "layout-nav-group", ngImport: i0, template: `
    <div class="yz-application-group">
      <nz-tabset>
        <nz-tab *ngFor="let menu of state.topics" [nzTitle]="groupTitleTpl">
          <ng-template #groupTitleTpl>
            <a
              data-event-id="_nav_topic"
              [attr.data-name]="menu.name | i18n"
              nz-dropdown
              [nzDropdownMenu]="menuTpl"
              [nzTrigger]="'click'"
              [nzOverlayClassName]="'yz-application-dropdown'"
            >
              <i nz-icon *ngIf="menu.icon" [nzType]="menu.icon" nzTheme="outline"></i>
              {{ menu.name | i18n }}
              <i *ngIf="menu.children && menu.children.length > 0" nz-icon nzType="down" nzTheme="outline"></i>
            </a>
            <nz-dropdown-menu #menuTpl="nzDropdownMenu">
              <ul nz-menu nzSelectable *ngIf="menu.children && menu.children.length > 0">
                <ng-container *ngFor="let item of menu.children">
                  <li data-event-id="_nav_item" [attr.data-name]="item.name | i18n" nz-menu-item (click)="open(item)">
                    <i nz-icon *ngIf="item.icon" [nzType]="item.icon" nzTheme="outline"></i>{{ item.name | i18n }}
                  </li>
                </ng-container>
              </ul>
            </nz-dropdown-menu>
          </ng-template>
        </nz-tab>
      </nz-tabset>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i4$2.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i5.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i7$1.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { kind: "component", type: i7$1.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `layout-nav-group`,
                    template: `
    <div class="yz-application-group">
      <nz-tabset>
        <nz-tab *ngFor="let menu of state.topics" [nzTitle]="groupTitleTpl">
          <ng-template #groupTitleTpl>
            <a
              data-event-id="_nav_topic"
              [attr.data-name]="menu.name | i18n"
              nz-dropdown
              [nzDropdownMenu]="menuTpl"
              [nzTrigger]="'click'"
              [nzOverlayClassName]="'yz-application-dropdown'"
            >
              <i nz-icon *ngIf="menu.icon" [nzType]="menu.icon" nzTheme="outline"></i>
              {{ menu.name | i18n }}
              <i *ngIf="menu.children && menu.children.length > 0" nz-icon nzType="down" nzTheme="outline"></i>
            </a>
            <nz-dropdown-menu #menuTpl="nzDropdownMenu">
              <ul nz-menu nzSelectable *ngIf="menu.children && menu.children.length > 0">
                <ng-container *ngFor="let item of menu.children">
                  <li data-event-id="_nav_item" [attr.data-name]="item.name | i18n" nz-menu-item (click)="open(item)">
                    <i nz-icon *ngIf="item.icon" [nzType]="item.icon" nzTheme="outline"></i>{{ item.name | i18n }}
                  </li>
                </ng-container>
              </ul>
            </nz-dropdown-menu>
          </ng-template>
        </nz-tab>
      </nz-tabset>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$2._HttpClient }]; } });

class LayoutNavTileComponent {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavTileComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LayoutNavTileComponent, selector: "layout-nav-tile", ngImport: i0, template: `<template></template>`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavTileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `layout-nav-tile`,
                    template: `<template></template>`
                }]
        }], ctorParameters: function () { return []; } });

class YunzaiLayoutBasicComponent {
    get options() {
        return this.state.options;
    }
    get navType() {
        return this.state.navType;
    }
    get aside() {
        return this.state.aside;
    }
    get displayReusetab() {
        return this.state.display.reusetab;
    }
    get reusetabCSS() {
        let cascadingStyleSheet = {};
        if (!this.state.display.nav) {
            cascadingStyleSheet = {
                ...cascadingStyleSheet,
                top: '0px'
            };
        }
        if (!this.state.display.aside) {
            cascadingStyleSheet = {
                ...cascadingStyleSheet,
                left: '24px'
            };
        }
        return cascadingStyleSheet;
    }
    constructor(layoutDisplayService, stompService, win) {
        this.layoutDisplayService = layoutDisplayService;
        this.stompService = stompService;
        this.win = win;
        this.NavType = NavType;
        this.state = {
            options: {
                logoExpanded: `./assets/logo-full.svg`,
                logoCollapsed: `./assets/logo.svg`
            },
            aside: {
                name: '',
                intro: '',
                icon: ''
            },
            display: {
                nav: true,
                aside: true,
                reusetab: true
            },
            navType: NavType.APPLICATION,
        };
    }
    ngOnInit() {
        this.initLogo();
        this.initFavicon();
        this.initNavType();
        this.initAside();
        this.addLayoutDisplayListener();
        this.stompService.listen();
        this.toIndex();
    }
    initFavicon() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const projectInfo = getProjectInfo();
        if (projectInfo.faviconUrl) {
            hasFavicon(projectInfo.faviconUrl).then((has) => {
                if (has) {
                    setFavicon(projectInfo.faviconUrl);
                }
                else {
                    setFavicon('./assets/favicon.ico');
                }
            });
        }
    }
    initAside() {
        const [, getCurrent] = useLocalStorageCurrent();
        const aside = getCurrent();
        this.state.aside = { ...aside };
    }
    initLogo() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const projectInfo = getProjectInfo();
        this.state.options.logoExpanded = projectInfo.maxLogoUrl ? projectInfo.maxLogoUrl : `./assets/logo-full.svg`;
        this.state.options.logoCollapsed = projectInfo.miniLogoUrl ? projectInfo.miniLogoUrl : `./assets/logo.svg`;
    }
    initNavType() {
        const [, getHeaderType] = useLocalStorageHeaderType();
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const navType = getHeaderType();
        const projectInfo = getProjectInfo();
        if (navType !== null) {
            this.state.navType = navType;
            return;
        }
        let fetchedNavType;
        if (projectInfo.headerStyle && projectInfo.headerStyle.length > 0) {
            fetchedNavType = projectInfo.headerStyle.pop()?.value;
        }
        // default value
        if (!fetchedNavType) {
            fetchedNavType = NavType.APPLICATION;
        }
        this.state.navType = fetchedNavType;
    }
    toIndex() {
        const [, getDefaultRoute] = useLocalStorageDefaultRoute();
        const defaultRoute = getDefaultRoute();
        log$1('YunzaiLayoutBasicComponent: ', `todo: the default route was ${defaultRoute}, 但是还没想好如何实现.`);
    }
    onNavTypeChange(type) {
        const [setHeaderType] = useLocalStorageHeaderType();
        setHeaderType(type);
        this.win.location.reload();
    }
    addLayoutDisplayListener() {
        this.layoutDisplayService.listen('reuseTab', (display) => {
            this.state.display.reusetab = display;
        });
        this.layoutDisplayService.listen('nav', (display) => {
            this.state.display.nav = display;
        });
        this.layoutDisplayService.listen('aside', (display) => {
            this.state.display.aside = display;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [{ token: i1$4.LayoutDisplayService }, { token: i2$1.StompService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiLayoutBasicComponent, selector: "yz-layout-basic", ngImport: i0, template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="displayReusetab ? contentTpl : noneTpl">
      <!-- nav -->
      <layout-default-header-item direction="left">
        <ng-container [ngSwitch]="navType">
          <ng-container *ngSwitchCase="NavType.APPLICATION">
            <layout-nav-application></layout-nav-application>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <layout-nav-group></layout-nav-group>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <layout-nav-tile></layout-nav-tile>
          </ng-container>
          <ng-container *ngSwitchDefault>
            <layout-nav-application></layout-nav-application>
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <!-- nav end -->
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-notify></yunzai-notify>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-theme-btn></yunzai-theme-btn>
      </layout-default-header-item>
      <!-- setting -->
      <layout-default-header-item direction="right" hidden="mobile">
        <div
          data-event-id="_nav_settings"
          layout-default-header-item-trigger
          nz-dropdown
          [nzDropdownMenu]="settingsMenu"
          nzTrigger="click"
          nzPlacement="bottomRight"
        >
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div data-event-id="_nav_mode" nz-menu-item>
              {{ 'mode.nav' | i18n }}
            </div>

            <div
              data-event-id="_nav_mode"
              data-type="application"
              nz-menu-item
              (click)="onNavTypeChange(NavType.APPLICATION)"
            >
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.application' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="group" nz-menu-item (click)="onNavTypeChange(NavType.GROUP)">
              <i nz-icon nzType="group" class="mr-sm"></i>
              {{ 'mode.nav.group' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="tile" nz-menu-item (click)="onNavTypeChange(NavType.TILE)">
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.tile' | i18n }}
            </div>
            <div data-event-id="_nav_fullscreen" nz-menu-item>
              <yunzai-fullscreen></yunzai-fullscreen>
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-clearstorage></yunzai-clearstorage>
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-i18n></yunzai-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-user></yunzai-user>
      </layout-default-header-item>
      <!-- setting end -->
    </layout-default>
    <ng-template #asideUserTpl>
      <div
        data-event-id="_route_user"
        nz-dropdown
        nzTrigger="click"
        [nzDropdownMenu]="userMenu"
        class="yunzai-default__aside-user"
      >
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon"></nz-avatar>
        <div class="yunzai-default__aside-user-info">
          <strong>{{ aside.name | i18n }}</strong>
          <p class="mb0">{{ aside.intro | i18n }}</p>
        </div>
      </div>
      <nz-dropdown-menu #userMenu="nzDropdownMenu">
        <ul nz-menu>
          <li data-event-id="_route_backhome" nz-menu-item routerLink="/">{{ 'back.home' | i18n }}</li>
        </ul>
      </nz-dropdown-menu>
    </ng-template>
    <ng-template #contentTpl>
      <reuse-tab #reuseTab [ngStyle]="reusetabCSS"></reuse-tab>
      <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)"></router-outlet>
    </ng-template>
    <ng-template #noneTpl>
      <router-outlet></router-outlet>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i4$4.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i4$4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5$2.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "component", type: i1$4.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1$4.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1$4.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i4$2.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i8$1.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "component", type: YunzaiClearStorageComponent, selector: "yunzai-clearstorage" }, { kind: "component", type: YunzaiFullScreenComponent, selector: "yunzai-fullscreen" }, { kind: "component", type: YunzaiI18NComponent, selector: "yunzai-i18n", inputs: ["showLangText"] }, { kind: "component", type: YunzaiNotifyComponent, selector: "yunzai-notify" }, { kind: "component", type: YunzaiThemBtnComponent, selector: "yunzai-theme-btn", inputs: ["types", "devTips", "deployUrl"] }, { kind: "component", type: YunzaiUserComponent, selector: "yunzai-user" }, { kind: "component", type: LayoutNavApplicationComponent, selector: "layout-nav-application" }, { kind: "component", type: LayoutNavGroupComponent, selector: "layout-nav-group" }, { kind: "component", type: LayoutNavTileComponent, selector: "layout-nav-tile" }, { kind: "pipe", type: i1$2.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutBasicComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yz-layout-basic`,
                    template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="displayReusetab ? contentTpl : noneTpl">
      <!-- nav -->
      <layout-default-header-item direction="left">
        <ng-container [ngSwitch]="navType">
          <ng-container *ngSwitchCase="NavType.APPLICATION">
            <layout-nav-application></layout-nav-application>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <layout-nav-group></layout-nav-group>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <layout-nav-tile></layout-nav-tile>
          </ng-container>
          <ng-container *ngSwitchDefault>
            <layout-nav-application></layout-nav-application>
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <!-- nav end -->
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-notify></yunzai-notify>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-theme-btn></yunzai-theme-btn>
      </layout-default-header-item>
      <!-- setting -->
      <layout-default-header-item direction="right" hidden="mobile">
        <div
          data-event-id="_nav_settings"
          layout-default-header-item-trigger
          nz-dropdown
          [nzDropdownMenu]="settingsMenu"
          nzTrigger="click"
          nzPlacement="bottomRight"
        >
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div data-event-id="_nav_mode" nz-menu-item>
              {{ 'mode.nav' | i18n }}
            </div>

            <div
              data-event-id="_nav_mode"
              data-type="application"
              nz-menu-item
              (click)="onNavTypeChange(NavType.APPLICATION)"
            >
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.application' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="group" nz-menu-item (click)="onNavTypeChange(NavType.GROUP)">
              <i nz-icon nzType="group" class="mr-sm"></i>
              {{ 'mode.nav.group' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="tile" nz-menu-item (click)="onNavTypeChange(NavType.TILE)">
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.tile' | i18n }}
            </div>
            <div data-event-id="_nav_fullscreen" nz-menu-item>
              <yunzai-fullscreen></yunzai-fullscreen>
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-clearstorage></yunzai-clearstorage>
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-i18n></yunzai-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-user></yunzai-user>
      </layout-default-header-item>
      <!-- setting end -->
    </layout-default>
    <ng-template #asideUserTpl>
      <div
        data-event-id="_route_user"
        nz-dropdown
        nzTrigger="click"
        [nzDropdownMenu]="userMenu"
        class="yunzai-default__aside-user"
      >
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon"></nz-avatar>
        <div class="yunzai-default__aside-user-info">
          <strong>{{ aside.name | i18n }}</strong>
          <p class="mb0">{{ aside.intro | i18n }}</p>
        </div>
      </div>
      <nz-dropdown-menu #userMenu="nzDropdownMenu">
        <ul nz-menu>
          <li data-event-id="_route_backhome" nz-menu-item routerLink="/">{{ 'back.home' | i18n }}</li>
        </ul>
      </nz-dropdown-menu>
    </ng-template>
    <ng-template #contentTpl>
      <reuse-tab #reuseTab [ngStyle]="reusetabCSS"></reuse-tab>
      <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)"></router-outlet>
    </ng-template>
    <ng-template #noneTpl>
      <router-outlet></router-outlet>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1$4.LayoutDisplayService }, { type: i2$1.StompService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });

class ActGuard {
    constructor(configService, pathToRegexp, router) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.router = router;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        log$1('act: ');
        this.bis = mergeBisConfig(this.configService);
        log$1('act: config ', this.bis);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        log$1('act: user ', user);
        // @ts-ignore
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        log$1('act: menus ', this.menus);
        this.getAllLinks(this.menus, this.links);
        log$1('act: links ', this.links);
    }
    canActivate(_, state) {
        log$1('act: can activate ', state);
        if (this.preHandle(state)) {
            return true;
        }
        log$1('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            log$1(`act: ${link} test ${state.url.split('?')[0]}`);
            if (regexp.test(state.url.split('?')[0])) {
                canactivate = true;
                log$1(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log$1(`act: test sucess`);
            return true;
        }
        else {
            log$1(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    canActivateChild(_, state) {
        log$1('act: can activate child ', state);
        if (this.preHandle(state)) {
            return true;
        }
        log$1('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            if (link === state.url.split('?')[0]) {
                canactivate = true;
                return;
            }
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(state.url.split('?')[0])) {
                log$1(`act: ${link} test ${state.url.split('?')[0]}`);
                canactivate = true;
                log$1(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log$1(`act: test sucess`);
            return true;
        }
        else {
            log$1(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    preHandle(state) {
        return (state.url.includes('error') ||
            state.url.includes('exception') ||
            state.url.includes('displayIndex') ||
            state.url === '' ||
            state.url === null ||
            state.url === '/' ||
            state.url.includes('iframePage'));
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push(sider.link);
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ActGuard, deps: [{ token: i1$3.YunzaiConfigService }, { token: i1$3.PathToRegexpService }, { token: i4$4.Router }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ActGuard, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ActGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$3.YunzaiConfigService }, { type: i1$3.PathToRegexpService }, { type: i4$4.Router }]; } });

class YunzaiAuthService {
    constructor(injector) {
        this.injector = injector;
        this.config = mergeBisConfig(this.configService);
    }
    get configService() {
        return this.injector.get(YunzaiConfigService);
    }
    get tokenService() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get httpClient() {
        return this.injector.get(_HttpClient);
    }
    askToken() {
        log$1('yz.auth.service: ', 'askToken');
        if (this.config.loginForm) {
            return this.fetchTokenByUP();
        }
        else {
            return this.fetchTokenByCas();
        }
    }
    fetchTokenByUP() {
        log$1('yz.auth.service: ', 'fetchTokenByUP');
        return this.httpClient.post(`/auth/oauth/token?_allow_anonymous=true`, this.config.loginForm).pipe(map$1((response) => {
            return response;
        }));
    }
    fetchTokenByCas() {
        log$1('yz.auth.service: ', 'fetchTokenByCas');
        const uri = encodeURIComponent(this.injector.get(WINDOW).location.href);
        return this.httpClient
            .get(`/cas-proxy/app/validate_full?callback=${uri}&_allow_anonymous=true&timestamp=${new Date().getTime()}`)
            .pipe(map$1((response) => {
            switch (response.errcode) {
                case 2000:
                    return response.data;
                case 2001:
                    this.injector.get(WINDOW).location.href = response.msg;
                    throw Error("Cookie Error: Can't find Cas Cookie,So jump to login!");
                default:
                    if (response.data) {
                        console.error(response.data);
                        throw Error(response.data);
                    }
                    else if (response.msg) {
                        console.error(response.msg);
                        throw Error(response.msg);
                    }
                    else {
                        console.error('cas unknown error');
                        throw Error('Unknown Error: Cas auth exception!');
                    }
            }
        }));
    }
    login() {
        log$1('yz.auth.service: ', 'login white login form->', this.config.loginForm);
        return this.askToken().pipe(mergeMap(token => {
            log$1('yz.auth.service: get token->', token);
            this.configService.set('auth', {
                token_send_key: 'Authorization',
                token_send_template: `${token.token_type} \${access_token}`,
                token_send_place: 'header'
            });
            log$1('yz.auth.service: ', 'set token');
            this.tokenService.set(token);
            return of(null);
        }), mergeMap(() => this.cacheInit()));
    }
    cacheInit() {
        log$1('yz.auth.service: ', 'cacheInit');
        const [setTenant] = useLocalStorageTenant();
        const [setUser] = useLocalStorageUser();
        const [setHeader] = useLocalStorageHeader();
        const [setProject] = useLocalStorageProjectInfo();
        return combineLatest([
            this.httpClient.get(`/auth/user`),
            this.httpClient.get(`/auth/allheader/v2`),
            this.httpClient.get(`/app-manager/project/info`)
        ]).pipe(map$1(([user, header, project]) => {
            log$1('yz.auth.service: ', 'set user');
            setUser(user.principal);
            log$1('yz.auth.service: ', 'set tenant');
            setTenant(user.tenantId);
            log$1('yz.auth.service: ', 'set header');
            setHeader(header.data);
            log$1('yz.auth.service: ', 'set project');
            setProject(project.data);
            return void 0;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAuthService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAuthService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};
class YunzaiDefaultInterceptor {
    get notification() {
        return this.injector.get(NzNotificationService);
    }
    get tokenSrv() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get http() {
        return this.injector.get(_HttpClient);
    }
    get config() {
        return mergeBisConfig(this.injector.get(YunzaiConfigService$1));
    }
    goTo(url) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }
    constructor(injector) {
        this.injector = injector;
        this.jump = false;
        this.refreshToking = false;
        this.refreshToken$ = new BehaviorSubject(null);
        if (this.config.refreshTokenType === 'auth-refresh') {
            console.error("can't use auth-refresh, please change yz.default.interceptor to default.interceptor!");
        }
    }
    checkStatus(ev) {
        if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
            return;
        }
        if (ev instanceof HttpErrorResponse && (ev.error.message || ev.error.errorMessage)) {
            if (ev.error.errorMessage) {
                this.notification.error(`发生了一些错误 `, ev.error.errorMessage);
            }
            else {
                this.notification.error(`发生了一些错误 `, ev.error.message);
            }
            return;
        }
        if (ev instanceof HttpResponse && ev.body.errorMessage) {
            this.notification.error(`发生了一些错误 `, ev.body.errorMessage);
            return;
        }
        const errortext = CODEMESSAGE[ev.status] || ev.statusText;
        this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
    }
    ToLogin() {
        this.notification.error(`未登录或登录状态已过期，5秒后将跳转到登录页面。`, ``);
        setTimeout(() => {
            localStorage.clear();
            this.injector.get(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
        }, 5000);
    }
    reAttachToken(req) {
        const token = this.tokenSrv.get()?.access_token;
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    refreshTokenRequest() {
        const model = this.tokenSrv.get();
        const form = new FormData();
        form.set('refresh_token', model?.refresh_token);
        form.set('grant_type', 'refresh_token');
        form.set('scope', 'webapp');
        log('yz.default.interceptor: use the refresh token to request a new token', model?.refresh_token);
        return this.http.post(`/auth/oauth/getOrCreateToken/webapp`, form);
    }
    tryRefreshToken(ev, req, next) {
        // 连刷新Token的请求都错了，那就是真错了
        if (['/auth/oauth/getOrCreateToken/webapp'].some(url => req.url.includes(url))) {
            this.ToLogin();
            return throwError(() => ev);
        }
        // 正在刷新token，所有其他请求排队
        if (this.refreshToking) {
            return this.refreshToken$.pipe(filter(v => !!v), take(1), switchMap(() => next.handle(this.reAttachToken(req))));
        }
        //尝试调用刷新 Token
        this.refreshToking = true;
        this.refreshToken$.next(null);
        // 处理Token
        return this.refreshTokenRequest().pipe(switchMap(res => {
            log('yz.default.interceptor: refresh token accessed -> ', res);
            // 重新保存新 token
            this.tokenSrv.set(res);
            // 通知后续请求继续执行
            this.refreshToking = false;
            this.refreshToken$.next(res);
            // 重新发起请求
            return next.handle(this.reAttachToken(req));
        }), catchError(err => {
            this.refreshToking = false;
            this.ToLogin();
            return throwError(() => err);
        }));
    }
    getAdditionalHeaders(headers) {
        const res = {};
        const lang = this.injector.get(YUNZAI_I18N_TOKEN).currentLang;
        if (!headers?.has('Accept-Language') && lang) {
            res['Accept-Language'] = lang;
        }
        return res;
    }
    handleData(ev, req, next) {
        this.checkStatus(ev);
        switch (ev.status) {
            case 200:
                return of(ev);
            case 401:
                log("http401: ", req.url);
                if (this.config.refreshTokenEnabled && this.config.refreshTokenType === 're-request') {
                    const unAuthorizationReq = req.clone();
                    unAuthorizationReq.headers.delete('Authorization');
                    return this.tryRefreshToken(ev, unAuthorizationReq, next);
                }
                this.ToLogin();
                break;
            case 403:
            case 404:
            case 500:
                if (this.jump) {
                    this.goTo(`/exception/${ev.status}`);
                }
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    console.warn('未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng.yunzainfo.com/docs/server 解决跨域问题', ev);
                }
                break;
        }
        if (ev instanceof HttpErrorResponse) {
            return throwError(() => ev);
        }
        else {
            return of(ev);
        }
    }
    intercept(req, next) {
        if (req.context.get(ALLOW_ANONYMOUS))
            return next.handle(req);
        log('yz.default.interceptor.ts: ', 'request ', req);
        // 统一加前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = this.config.baseUrl + url;
        }
        if (url.includes('.json') && url.includes('assets')) {
            url = req.url;
        }
        // if (url.includes('i18n')) return next.handle(req);
        // 加入语言头
        const newReq = req.clone({ url, setHeaders: this.getAdditionalHeaders(req.headers) });
        return next.handle(newReq).pipe(mergeMap(ev => {
            // 允许统一对请求错误处理
            if (ev instanceof HttpResponseBase) {
                return this.handleData(ev, newReq, next);
            }
            // 若一切都正常，则后续操作
            return of(ev);
        }), catchError((err) => this.handleData(err, newReq, next)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDefaultInterceptor, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDefaultInterceptor }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDefaultInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const WIDGETS = [
    YunzaiClearStorageComponent,
    YunzaiFullScreenComponent,
    YunzaiI18NComponent,
    YunzaiNotifyComponent,
    YunzaiThemBtnComponent,
    YunzaiUserComponent
];
const LAYOUT_NAV_COMPONENTS = [LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent];
const COMPONENTS = [YunzaiLayoutBasicComponent];
class YunzaiLayoutModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, declarations: [YunzaiLayoutBasicComponent, YunzaiClearStorageComponent,
            YunzaiFullScreenComponent,
            YunzaiI18NComponent,
            YunzaiNotifyComponent,
            YunzaiThemBtnComponent,
            YunzaiUserComponent, LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedYelonModule,
            YunzaiSharedZorroModule], exports: [YunzaiLayoutBasicComponent, YunzaiClearStorageComponent,
            YunzaiFullScreenComponent,
            YunzaiI18NComponent,
            YunzaiNotifyComponent,
            YunzaiThemBtnComponent,
            YunzaiUserComponent, LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, providers: [
            {
                provide: YUNZAI_THEME_BTN_KEYS,
                useValue: 'site-theme'
            }
        ], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedYelonModule,
            YunzaiSharedZorroModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        RouterModule,
                        ReactiveFormsModule,
                        YunzaiSharedYelonModule,
                        YunzaiSharedZorroModule
                    ],
                    providers: [
                        {
                            provide: YUNZAI_THEME_BTN_KEYS,
                            useValue: 'site-theme'
                        }
                    ],
                    declarations: [...COMPONENTS, ...WIDGETS, ...LAYOUT_NAV_COMPONENTS],
                    exports: [...COMPONENTS, ...WIDGETS, ...LAYOUT_NAV_COMPONENTS]
                }]
        }] });

/*
 * Automatically generated by 'ng g ng-yunzai:plugin icon'
 * @see https://ng.yunzainfo.com/cli/plugin#icon
 */
const ICONS = [
    AccountBookTwoTone,
    AccountBookFill,
    AccountBookOutline,
    AlertTwoTone,
    AlertFill,
    AlibabaOutline,
    AimOutline,
    AlipayCircleFill,
    AlertOutline,
    AlignCenterOutline,
    AlipayCircleOutline,
    AlipayOutline,
    AlignLeftOutline,
    AlignRightOutline,
    AmazonOutline,
    AliwangwangOutline,
    AliyunOutline,
    AlipaySquareFill,
    AmazonCircleFill,
    AndroidFill,
    AliwangwangFill,
    AntCloudOutline,
    AmazonSquareFill,
    AndroidOutline,
    ApartmentOutline,
    ApiTwoTone,
    ApiFill,
    ApiOutline,
    AntDesignOutline,
    AppstoreAddOutline,
    AppstoreFill,
    AppleOutline,
    AppstoreOutline,
    ArrowDownOutline,
    AppleFill,
    ArrowsAltOutline,
    AppstoreTwoTone,
    ArrowUpOutline,
    AreaChartOutline,
    ArrowLeftOutline,
    AudioFill,
    ArrowRightOutline,
    AudioTwoTone,
    AuditOutline,
    AudioMutedOutline,
    BackwardFill,
    AudioOutline,
    BackwardOutline,
    BankFill,
    BarcodeOutline,
    BellFill,
    BankTwoTone,
    BarsOutline,
    BankOutline,
    BehanceCircleFill,
    BehanceSquareFill,
    BoldOutline,
    BellOutline,
    BehanceOutline,
    BlockOutline,
    BehanceSquareOutline,
    BgColorsOutline,
    BellTwoTone,
    BarChartOutline,
    BookTwoTone,
    BookFill,
    BorderOuterOutline,
    BorderLeftOutline,
    BorderBottomOutline,
    BorderHorizontalOutline,
    BorderTopOutline,
    BorderOutline,
    BorderInnerOutline,
    BorderRightOutline,
    BoxPlotOutline,
    BoxPlotFill,
    BoxPlotTwoTone,
    BookOutline,
    BorderlessTableOutline,
    BorderVerticleOutline,
    BuildTwoTone,
    BuildOutline,
    BugFill,
    BugOutline,
    BugTwoTone,
    BulbFill,
    BulbTwoTone,
    BuildFill,
    BulbOutline,
    CalculatorFill,
    CalculatorTwoTone,
    CalendarFill,
    CalendarOutline,
    CalculatorOutline,
    CalendarTwoTone,
    CameraOutline,
    CameraFill,
    CameraTwoTone,
    CarTwoTone,
    CaretDownOutline,
    CarOutline,
    CaretLeftFill,
    CarFill,
    CaretRightOutline,
    CaretDownFill,
    CaretUpOutline,
    CaretRightFill,
    CarryOutFill,
    CarryOutOutline,
    CaretLeftOutline,
    CaretUpFill,
    BranchesOutline,
    CarryOutTwoTone,
    CheckCircleFill,
    CheckCircleOutline,
    CheckSquareOutline,
    CheckCircleTwoTone,
    CiCircleTwoTone,
    CheckOutline,
    CheckSquareTwoTone,
    CiOutline,
    CheckSquareFill,
    CiTwoTone,
    ChromeOutline,
    ClockCircleOutline,
    CiCircleOutline,
    ChromeFill,
    ClearOutline,
    CloseCircleTwoTone,
    CiCircleFill,
    CloseCircleOutline,
    ClockCircleFill,
    CloseCircleFill,
    ClockCircleTwoTone,
    CloseOutline,
    CloseSquareOutline,
    CloseSquareFill,
    CloudFill,
    CloseSquareTwoTone,
    CloudDownloadOutline,
    CloudTwoTone,
    CloudServerOutline,
    CloudUploadOutline,
    CloudSyncOutline,
    ClusterOutline,
    CodeSandboxCircleFill,
    CodeFill,
    CodepenCircleOutline,
    CloudOutline,
    CodeSandboxOutline,
    CodeOutline,
    CodeSandboxSquareFill,
    CodeTwoTone,
    CodepenSquareFill,
    CodepenOutline,
    CoffeeOutline,
    ColumnWidthOutline,
    CompressOutline,
    ColumnHeightOutline,
    CodepenCircleFill,
    CompassTwoTone,
    CommentOutline,
    ContainerFill,
    CompassOutline,
    ConsoleSqlOutline,
    ContactsOutline,
    ContainerTwoTone,
    ContactsFill,
    ContactsTwoTone,
    ContainerOutline,
    ControlFill,
    CopyFill,
    CopyOutline,
    CompassFill,
    CopyTwoTone,
    CopyrightOutline,
    CopyrightCircleOutline,
    ControlTwoTone,
    ControlOutline,
    CreditCardFill,
    CopyrightTwoTone,
    CrownFill,
    CopyrightCircleFill,
    CrownOutline,
    CustomerServiceTwoTone,
    CreditCardOutline,
    CustomerServiceOutline,
    DashboardTwoTone,
    CrownTwoTone,
    CreditCardTwoTone,
    CustomerServiceFill,
    DashboardFill,
    DashOutline,
    DatabaseOutline,
    DatabaseTwoTone,
    DatabaseFill,
    DashboardOutline,
    DeleteTwoTone,
    DeleteRowOutline,
    DeleteColumnOutline,
    DeliveredProcedureOutline,
    DeleteOutline,
    CopyrightCircleTwoTone,
    DesktopOutline,
    DeleteFill,
    DiffOutline,
    DiffFill,
    DeploymentUnitOutline,
    DiffTwoTone,
    DingtalkOutline,
    DollarCircleFill,
    DislikeFill,
    DingtalkSquareFill,
    DisconnectOutline,
    DollarCircleTwoTone,
    DollarOutline,
    DingtalkCircleFill,
    DislikeTwoTone,
    DollarTwoTone,
    DownCircleFill,
    DislikeOutline,
    DollarCircleOutline,
    DoubleLeftOutline,
    DownSquareFill,
    DownOutline,
    DownSquareOutline,
    DownSquareTwoTone,
    DownCircleTwoTone,
    DoubleRightOutline,
    DownCircleOutline,
    DownloadOutline,
    DotChartOutline,
    DribbbleCircleFill,
    DribbbleOutline,
    DribbbleSquareOutline,
    DropboxCircleFill,
    DingdingOutline,
    EditOutline,
    DribbbleSquareFill,
    DropboxSquareFill,
    EllipsisOutline,
    EnvironmentFill,
    EditFill,
    EnterOutline,
    EuroCircleFill,
    EuroTwoTone,
    EuroCircleOutline,
    EditTwoTone,
    EuroOutline,
    EnvironmentTwoTone,
    ExclamationCircleFill,
    ExpandAltOutline,
    EuroCircleTwoTone,
    ExclamationCircleTwoTone,
    EnvironmentOutline,
    ExperimentOutline,
    ExperimentFill,
    ExpandOutline,
    ExceptionOutline,
    ExportOutline,
    ExperimentTwoTone,
    ExclamationCircleOutline,
    ExclamationOutline,
    EyeFill,
    EyeInvisibleFill,
    EyeInvisibleTwoTone,
    DropboxOutline,
    DragOutline,
    FacebookOutline,
    FacebookFill,
    EyeTwoTone,
    EyeOutline,
    FastForwardFill,
    FieldBinaryOutline,
    FieldNumberOutline,
    FastBackwardOutline,
    FileAddFill,
    FastBackwardFill,
    FileExcelFill,
    FastForwardOutline,
    FieldStringOutline,
    FileDoneOutline,
    FileAddTwoTone,
    FileExcelTwoTone,
    FileExclamationFill,
    FileAddOutline,
    FileExclamationOutline,
    FieldTimeOutline,
    FileImageTwoTone,
    FileExcelOutline,
    FileExclamationTwoTone,
    FileImageFill,
    FileGifOutline,
    FileFill,
    FileMarkdownTwoTone,
    FileMarkdownOutline,
    FallOutline,
    FileImageOutline,
    EyeInvisibleOutline,
    FilePdfOutline,
    FileSearchOutline,
    FilePptTwoTone,
    FilePdfTwoTone,
    FileJpgOutline,
    FileTextFill,
    FilePptOutline,
    FileSyncOutline,
    FilePptFill,
    FileUnknownOutline,
    FileProtectOutline,
    FileTextTwoTone,
    FileWordFill,
    FileUnknownTwoTone,
    FileWordTwoTone,
    FileUnknownFill,
    FileTextOutline,
    FileZipFill,
    FilterTwoTone,
    FilterFill,
    FileWordOutline,
    FireOutline,
    FireTwoTone,
    FileZipOutline,
    FilterOutline,
    FlagTwoTone,
    FileTwoTone,
    FilePdfFill,
    FileOutline,
    FileMarkdownFill,
    FileZipTwoTone,
    FlagOutline,
    FolderAddTwoTone,
    FolderOpenFill,
    FireFill,
    FlagFill,
    FolderOutline,
    FolderViewOutline,
    FolderTwoTone,
    FontColorsOutline,
    FolderOpenTwoTone,
    FolderFill,
    ForwardOutline,
    FolderOpenOutline,
    ForkOutline,
    ForwardFill,
    FormatPainterOutline,
    FormatPainterFill,
    FormOutline,
    FrownFill,
    FrownTwoTone,
    FullscreenOutline,
    FontSizeOutline,
    FundFill,
    FunctionOutline,
    FundViewOutline,
    FullscreenExitOutline,
    GifOutline,
    FundProjectionScreenOutline,
    FundTwoTone,
    FolderAddFill,
    FunnelPlotTwoTone,
    GiftOutline,
    FunnelPlotFill,
    FundOutline,
    FrownOutline,
    GithubOutline,
    GoldFill,
    FolderAddOutline,
    GitlabFill,
    GiftFill,
    GitlabOutline,
    GoldTwoTone,
    GoogleCircleFill,
    GiftTwoTone,
    GooglePlusCircleFill,
    GoldOutline,
    GithubFill,
    GoogleOutline,
    GooglePlusOutline,
    GoogleSquareFill,
    GoldenFill,
    HddTwoTone,
    GooglePlusSquareFill,
    GlobalOutline,
    HeartOutline,
    HeartTwoTone,
    GroupOutline,
    HeartFill,
    HeatMapOutline,
    GatewayOutline,
    FunnelPlotOutline,
    HddFill,
    HomeFill,
    HighlightFill,
    HomeOutline,
    HistoryOutline,
    HighlightOutline,
    HddOutline,
    HourglassFill,
    HomeTwoTone,
    HourglassTwoTone,
    Html5Outline,
    Html5Fill,
    IdcardFill,
    Html5TwoTone,
    HourglassOutline,
    IdcardTwoTone,
    IdcardOutline,
    IeOutline,
    IeCircleFill,
    IeSquareFill,
    InboxOutline,
    ImportOutline,
    InfoCircleOutline,
    InfoCircleTwoTone,
    InsertRowAboveOutline,
    InsertRowRightOutline,
    InfoCircleFill,
    InfoOutline,
    InsertRowBelowOutline,
    HighlightTwoTone,
    InsuranceFill,
    InstagramFill,
    InteractionFill,
    InsertRowLeftOutline,
    InstagramOutline,
    InteractionOutline,
    ItalicOutline,
    InteractionTwoTone,
    LayoutOutline,
    IssuesCloseOutline,
    LayoutFill,
    LaptopOutline,
    LeftCircleFill,
    LayoutTwoTone,
    KeyOutline,
    LeftOutline,
    LeftCircleOutline,
    LeftSquareOutline,
    LeftSquareFill,
    LeftCircleTwoTone,
    LikeFill,
    LeftSquareTwoTone,
    LineOutline,
    LikeTwoTone,
    LinkedinOutline,
    LineChartOutline,
    LineHeightOutline,
    LinkedinFill,
    LinkOutline,
    LikeOutline,
    InsuranceOutline,
    Loading3QuartersOutline,
    LockFill,
    InsuranceTwoTone,
    MacCommandOutline,
    LockTwoTone,
    LoadingOutline,
    MailOutline,
    LoginOutline,
    MedicineBoxOutline,
    MailFill,
    MailTwoTone,
    MacCommandFill,
    ManOutline,
    MedicineBoxFill,
    MedicineBoxTwoTone,
    MediumCircleFill,
    MediumOutline,
    MehFill,
    MediumWorkmarkOutline,
    MenuFoldOutline,
    MehOutline,
    MediumSquareFill,
    MessageTwoTone,
    MehTwoTone,
    MergeCellsOutline,
    MinusCircleFill,
    MenuOutline,
    MenuUnfoldOutline,
    MessageFill,
    MinusCircleTwoTone,
    LockOutline,
    MinusOutline,
    MinusCircleOutline,
    LogoutOutline,
    MessageOutline,
    MoneyCollectFill,
    MinusSquareOutline,
    MinusSquareTwoTone,
    MobileOutline,
    MobileTwoTone,
    MoneyCollectOutline,
    MoreOutline,
    NotificationFill,
    NotificationOutline,
    MoneyCollectTwoTone,
    NodeIndexOutline,
    NodeExpandOutline,
    MonitorOutline,
    OrderedListOutline,
    NodeCollapseOutline,
    NumberOutline,
    PaperClipOutline,
    NotificationTwoTone,
    PauseCircleFill,
    PartitionOutline,
    PauseOutline,
    OneToOneOutline,
    PayCircleOutline,
    PayCircleFill,
    MinusSquareFill,
    PauseCircleOutline,
    PauseCircleTwoTone,
    PicCenterOutline,
    PicRightOutline,
    PercentageOutline,
    MobileFill,
    PictureOutline,
    PictureFill,
    PhoneTwoTone,
    PhoneFill,
    PieChartFill,
    PictureTwoTone,
    PieChartOutline,
    PlaySquareFill,
    PlayCircleTwoTone,
    PlayCircleFill,
    PlusCircleFill,
    PlaySquareTwoTone,
    PlaySquareOutline,
    PlayCircleOutline,
    PieChartTwoTone,
    PlusCircleOutline,
    PlusSquareFill,
    PoundCircleFill,
    PlusSquareOutline,
    PlusOutline,
    PoundOutline,
    PoundCircleOutline,
    PlusSquareTwoTone,
    PlusCircleTwoTone,
    PoweroffOutline,
    PoundCircleTwoTone,
    PhoneOutline,
    PrinterFill,
    PicLeftOutline,
    ProjectTwoTone,
    PrinterOutline,
    ProjectFill,
    ProfileOutline,
    ProfileTwoTone,
    ProjectOutline,
    PropertySafetyFill,
    PullRequestOutline,
    PropertySafetyOutline,
    PushpinOutline,
    PushpinTwoTone,
    PropertySafetyTwoTone,
    PushpinFill,
    QqOutline,
    QqCircleFill,
    QrcodeOutline,
    QqSquareFill,
    QuestionCircleTwoTone,
    QuestionCircleFill,
    RadarChartOutline,
    RadiusUprightOutline,
    QuestionCircleOutline,
    QuestionOutline,
    ReadFill,
    RadiusUpleftOutline,
    RadiusBottomleftOutline,
    RadiusSettingOutline,
    RadiusBottomrightOutline,
    ProfileFill,
    PrinterTwoTone,
    ReadOutline,
    ReconciliationFill,
    ReloadOutline,
    ReconciliationOutline,
    RedEnvelopeTwoTone,
    RedditCircleFill,
    RedoOutline,
    RedEnvelopeFill,
    RedditOutline,
    RestTwoTone,
    RightCircleOutline,
    RestOutline,
    RedditSquareFill,
    RestFill,
    RightCircleTwoTone,
    RightOutline,
    RightSquareFill,
    RightCircleFill,
    RightSquareOutline,
    RetweetOutline,
    RiseOutline,
    RightSquareTwoTone,
    RobotFill,
    RocketOutline,
    RobotOutline,
    RocketTwoTone,
    RocketFill,
    RedEnvelopeOutline,
    RollbackOutline,
    RotateRightOutline,
    RotateLeftOutline,
    ReconciliationTwoTone,
    SafetyCertificateTwoTone,
    SaveOutline,
    SafetyOutline,
    SaveFill,
    SaveTwoTone,
    ScheduleFill,
    SafetyCertificateOutline,
    ScanOutline,
    ScheduleTwoTone,
    SearchOutline,
    ScheduleOutline,
    SecurityScanTwoTone,
    SecurityScanOutline,
    ScissorOutline,
    SelectOutline,
    SecurityScanFill,
    SendOutline,
    SettingOutline,
    SettingTwoTone,
    SettingFill,
    ShareAltOutline,
    ShopOutline,
    ShopFill,
    ShopTwoTone,
    ShrinkOutline,
    ShakeOutline,
    ShoppingOutline,
    ShoppingCartOutline,
    ShoppingFill,
    SisternodeOutline,
    ShoppingTwoTone,
    SafetyCertificateFill,
    SkinOutline,
    SignalFill,
    SketchOutline,
    SkinTwoTone,
    SketchSquareFill,
    SkypeFill,
    SkinFill,
    SlackCircleFill,
    SlackSquareFill,
    SlidersTwoTone,
    SkypeOutline,
    SlidersFill,
    SlackSquareOutline,
    SmallDashOutline,
    SmileTwoTone,
    SlidersOutline,
    SnippetsFill,
    SnippetsOutline,
    SmileOutline,
    SolutionOutline,
    SlackOutline,
    SnippetsTwoTone,
    SoundTwoTone,
    SortAscendingOutline,
    SoundFill,
    SortDescendingOutline,
    SmileFill,
    SoundOutline,
    SplitCellsOutline,
    SketchCircleFill,
    StarOutline,
    StockOutline,
    StarTwoTone,
    StepForwardFill,
    StarFill,
    StepBackwardFill,
    StepForwardOutline,
    StopFill,
    SubnodeOutline,
    SwapLeftOutline,
    StopOutline,
    StopTwoTone,
    SwapRightOutline,
    SwapOutline,
    SwitcherTwoTone,
    SwitcherOutline,
    SyncOutline,
    StrikethroughOutline,
    SwitcherFill,
    TagOutline,
    TabletTwoTone,
    TabletOutline,
    TabletFill,
    TableOutline,
    TagsFill,
    TagFill,
    TagsTwoTone,
    TaobaoCircleOutline,
    StepBackwardOutline,
    TagsOutline,
    TagTwoTone,
    TaobaoOutline,
    ThunderboltOutline,
    TaobaoSquareFill,
    TeamOutline,
    TaobaoCircleFill,
    ThunderboltTwoTone,
    ToolFill,
    ThunderboltFill,
    ToTopOutline,
    ToolOutline,
    ToolTwoTone,
    TrademarkCircleFill,
    TrophyFill,
    TrademarkCircleTwoTone,
    TransactionOutline,
    TrademarkCircleOutline,
    TranslationOutline,
    TwitterCircleFill,
    TrophyOutline,
    TrademarkOutline,
    TrophyTwoTone,
    TwitterSquareFill,
    UnlockFill,
    TwitterOutline,
    UnderlineOutline,
    UndoOutline,
    UpCircleFill,
    UngroupOutline,
    UnlockTwoTone,
    UnlockOutline,
    UpOutline,
    UsbFill,
    UpCircleOutline,
    UnorderedListOutline,
    UpCircleTwoTone,
    UpSquareFill,
    UpSquareOutline,
    UserAddOutline,
    UsbTwoTone,
    UsergroupDeleteOutline,
    UpSquareTwoTone,
    UserOutline,
    UsbOutline,
    UserDeleteOutline,
    UserSwitchOutline,
    VerticalLeftOutline,
    VerticalAlignBottomOutline,
    VerifiedOutline,
    UsergroupAddOutline,
    UploadOutline,
    VerticalAlignMiddleOutline,
    VerticalAlignTopOutline,
    VerticalRightOutline,
    VideoCameraOutline,
    VideoCameraAddOutline,
    VideoCameraTwoTone,
    VideoCameraFill,
    WalletOutline,
    WalletFill,
    WarningFill,
    WarningOutline,
    WechatOutline,
    WalletTwoTone,
    WeiboCircleFill,
    WarningTwoTone,
    WeiboSquareFill,
    WeiboOutline,
    WeiboSquareOutline,
    WeiboCircleOutline,
    WechatFill,
    WhatsAppOutline,
    WifiOutline,
    WomanOutline,
    YoutubeFill,
    YahooOutline,
    WindowsFill,
    WindowsOutline,
    YoutubeOutline,
    YuqueOutline,
    ZhihuCircleFill,
    YuqueFill,
    ZhihuOutline,
    ZhihuSquareFill,
    ZoomInOutline,
    ZoomOutOutline,
    YahooFill
];

class YunzaiStartupService {
    constructor(iconSrv, menuService, i18n, win, settingService, aclService, titleService, yzAuthService, configService) {
        this.menuService = menuService;
        this.i18n = i18n;
        this.win = win;
        this.settingService = settingService;
        this.aclService = aclService;
        this.titleService = titleService;
        this.yzAuthService = yzAuthService;
        this.configService = configService;
        this.config = BUSINESS_DEFAULT_CONFIG;
        this.config = mergeBisConfig(this.configService);
        iconSrv.addIcon(...ICONS);
    }
    load() {
        log$1('startup.service: ', 'load');
        let defaultLang = this.settingService.layout.lang || this.i18n.defaultLang;
        return this.yzAuthService.login().pipe(mergeMap(() => {
            return this.i18n.loadLangData(defaultLang);
        }), mergeMap((langData) => {
            log$1('startup.service: ', 'set i18n, defaultLang->', defaultLang, ' langData->', langData);
            this.i18n.use(defaultLang, langData);
            return of(void 0);
        }), mergeMap((v) => {
            this.systemInit();
            log$1('startup.service: preloader finish');
            if (this.win && this.win.appBootstrap) {
                this.win.appBootstrap();
            }
            return of(v);
        }));
    }
    systemInit() {
        log$1('startup.service: system init');
        const [setCurrent] = useLocalStorageCurrent();
        const [, getUser] = useLocalStorageUser();
        const [setDefaultRoute] = useLocalStorageDefaultRoute();
        const yunzaiUser = getUser();
        // @ts-ignore
        const yunzaiMenus = deepCopy(yunzaiUser.menu).filter(m => m.systemCode && m.systemCode === this.config.systemCode);
        mapYzSideToYelonMenu(yunzaiMenus);
        const currentMenu = yunzaiMenus.pop();
        if (currentMenu) {
            this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
            this.settingService.setUser({
                name: yunzaiUser.realname,
                avatar: `${this.config.baseUrl}/filecenter/file/${yunzaiUser.avatarId}` || '',
                email: yunzaiUser.email
            });
            this.titleService.default = currentMenu && currentMenu.text ? currentMenu.text : 'default application name';
            this.titleService.setTitle(currentMenu && currentMenu.text ? currentMenu.text : 'no title');
            const abilities = [];
            generateAbility([currentMenu], abilities, '');
            this.aclService.attachRole(yunzaiUser?.roles
                .map((role) => {
                return role.roleValue;
            })
                .filter((a) => !!a) || []);
            this.aclService.attachAbility(abilities);
            this.menuService.add([currentMenu]);
            setCurrent({
                name: currentMenu.text,
                intro: currentMenu.intro || '',
                icon: currentMenu.appIconUrl || './assets/tmp/img/avatar.jpg'
            });
            const attributes = currentMenu.attribute;
            if (attributes) {
                const attr = JSON.parse(attributes);
                if (attr && attr.defaultRoute) {
                    setDefaultRoute(attr.defaultRoute);
                }
                else {
                    setDefaultRoute('/displayIndex');
                }
            }
            else {
                setDefaultRoute('/displayIndex');
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiStartupService, deps: [{ token: i6.NzIconService }, { token: i1$2.MenuService }, { token: YUNZAI_I18N_TOKEN }, { token: WINDOW }, { token: i1$2.SettingsService }, { token: i3$3.ACLService }, { token: i1$2.TitleService }, { token: YunzaiAuthService }, { token: i1$3.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiStartupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiStartupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i6.NzIconService }, { type: i1$2.MenuService }, { type: YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: i1$2.SettingsService }, { type: i3$3.ACLService }, { type: i1$2.TitleService }, { type: YunzaiAuthService }, { type: i1$3.YunzaiConfigService }]; } });
function mapYzSideToYelonMenu(menus) {
    menus.forEach(menu => {
        if (menu.children && menu.hideChildren) {
            menu.children.forEach(c => (c.hide = true));
        }
        menu.badgeDot = menu.badge_dot || null;
        menu.badgeStatus = menu.badge_status || null;
        menu.shortcutRoot = menu.shortcut_root || null;
        menu.reuse = true;
        if (menu.children) {
            mapYzSideToYelonMenu(menu.children);
        }
    });
}
function generateAbility(menus, abilities, prefix) {
    menus.forEach(menu => {
        if (menu.link) {
            prefix += menu.link;
        }
        else {
            prefix += '';
        }
        if (menu.menuAuths) {
            menu.menuAuths.forEach((a) => {
                abilities.push(`${prefix}:${a}`);
                abilities.push(a);
            });
        }
        if (menu.children) {
            generateAbility(menu.children, abilities, prefix);
        }
    });
}
function YunzaiStartupServiceFactory(startupService) {
    return () => startupService.load();
}
//@ts-ignore
const YUNZAI_APPINIT_PROVIDES = [
    YunzaiStartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: YunzaiStartupServiceFactory,
        deps: [YunzaiStartupService],
        multi: true
    }
];

// 埋点转换表
const HTML_NAMES_MAPPING = {
    _route_icon: '路由-图标',
    _route_link: '路由-跳转',
    _route_toggle: '路由-显示/隐藏',
    _route_group: '路由-分组',
    _route_user: '路由-用户头像',
    _route_backhome: '路由-返回首页',
    _nav_search: '导航-搜索',
    _nav_topic: '导航-主题',
    _nav_item: '导航-应用',
    _nav_notify: '导航-铃铛',
    _nav_msg: '导航-消息',
    _nav_todo: '导航-待办',
    _nav_notice: '导航-通知',
    _nav_clear_msg: '导航-清空消息',
    _nav_clear_todo: '导航-清空待办',
    _nav_clear_notice: '导航-清空通知',
    _nav_theme: '导航-主题',
    _nav_settings: '导航-设置',
    _nav_user: '导航-用户头像',
    _nav_lang: '导航-语言',
    _nav_logo: '导航-Logo',
    _nav_toggle: '导航-显示/隐藏',
    _nav_app: '导航-应用与服务',
    _reusetab: '多标签',
    _reusetab_refresh: '多标签-刷新',
    _reusetab_close: '多标签-关闭',
    _reusetab_closeOther: '多标签-关闭其他',
    _reusetab_closeRight: '多标签-关闭右侧',
    _reusetab_custom: '多标签-自定义'
};

class AnalysisAddon {
    static putValueInAnalysis(values) {
        if (!window)
            return;
        // @ts-ignore
        if (!window['yunzai'])
            return;
        // @ts-ignore
        if (window['yunzai']['extra']) {
            // @ts-ignore
            window['yunzai']['extra'] = { ...window['yunzai']['extra'], ...values };
        }
        else {
            // @ts-ignore
            window['yunzai']['extra'] = { ...values };
        }
    }
}

class YunzaiAnalysisAddonGuardService {
    constructor(configService, pathToRegexp, win, tokenService) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.win = win;
        this.tokenService = tokenService;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        this.value = {};
        this.bis = mergeBisConfig(this.configService);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        // @ts-ignore
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        if (user) {
            this.value = {
                userid: user.id,
                realname: user.realname,
                usertype: user.userType,
                usercode: user.userCode,
                username: user.username,
                account: user.username,
                deptid: user.deptId,
                deptname: user.deptName,
                token: this.tokenService.get()?.access_token
            };
        }
        if (this.menus && this.menus.length > 0) {
            this.value['system'] = this.menus[0].text;
        }
        this.getAllLinks(this.menus, this.links);
    }
    process(url) {
        let flag = false;
        this.links.forEach((link) => {
            if (link.link === url.split('?')[0]) {
                flag = true;
                this.value['routename'] = link.title;
                this.value['routeurl'] = link.link;
                if (this.win['yunzai']) {
                    this.win['yunzai'].setExtra(this.value);
                }
                return;
            }
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(url.split('?')[0])) {
                flag = true;
                this.value['routename'] = link.title;
                this.value['routeurl'] = link.link;
                if (this.win['yunzai']) {
                    this.win['yunzai'].setExtra(this.value);
                }
                return;
            }
        });
        if (!flag) {
            this.value['routename'] = url;
            this.value['routeurl'] = url;
            if (this.win['yunzai']) {
                this.win['yunzai'].setExtra(this.value);
            }
        }
        return true;
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push({ title: sider.text ? sider.text : sider.link, link: sider.link });
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [{ token: i1$3.YunzaiConfigService }, { token: i1$3.PathToRegexpService }, { token: WINDOW }, { token: YA_SERVICE_TOKEN }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$3.YunzaiConfigService }, { type: i1$3.PathToRegexpService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }]; } });
const analysisAddonCanActive = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
const analysisAddonCanActiveChild = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);

/**
 * Generated bundle index. Do not edit.
 */

export { ActGuard, AnalysisAddon, BUSINESS_DEFAULT_CONFIG, HTML_NAMES_MAPPING, LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent, YUNZAI_APPINIT_PROVIDES, YUNZAI_LANGS, YunzaiAnalysisAddonGuardService, YunzaiAuthService, YunzaiClearStorageComponent, YunzaiDefaultInterceptor, YunzaiFullScreenComponent, YunzaiI18NComponent, YunzaiI18NService, YunzaiLayoutBasicComponent, YunzaiLayoutModule, YunzaiNotifyComponent, YunzaiStartupService, YunzaiStartupServiceFactory, YunzaiThemBtnComponent, YunzaiUserComponent, YunzaiDefaultInterceptor as YzDefaultInterceptor, analysisAddonCanActive, analysisAddonCanActiveChild, generateAbility, mapYzSideToYelonMenu, mergeBisConfig };
//# sourceMappingURL=layout.mjs.map
