import { DOCUMENT, isPlatformServer, registerLocaleData, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, PLATFORM_ID, InjectionToken, Injectable, DestroyRef, Injector, Pipe, Optional, Inject, SkipSelf, NgModule, importProvidersFrom, LOCALE_ID, ENVIRONMENT_INITIALIZER, makeEnvironmentProviders, Version } from '@angular/core';
import { filter, BehaviorSubject, share, Subject, map, of, delay, isObservable, switchMap, tap, finalize, takeUntil, catchError, Observable, take, throwError } from 'rxjs';
import { ACLService } from '@yelon/acl';
import * as i1 from '@yelon/util/config';
import { YunzaiConfigService, YUNZAI_CONFIG } from '@yelon/util/config';
import * as i5 from '@angular/cdk/platform';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import ngElGr from '@angular/common/locales/el';
import ngEn from '@angular/common/locales/en';
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
import { zhCN as zhCN$1, zhTW, enUS, el, es, fr, hr, it, ko, pl, sl, tr } from 'date-fns/locale';
import * as i3 from 'ng-zorro-antd/i18n';
import { zh_CN, zh_TW, en_US, el_GR, es_ES, fr_FR, hr_HR, it_IT, ko_KR, pl_PL, sl_SI, tr_TR, NzI18nService, NzI18nModule, provideNzI18n, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { map as map$1 } from 'rxjs/operators';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { HttpClient, HttpParams, HttpContextToken } from '@angular/common/http';
import { DragDrop } from '@angular/cdk/drag-drop';
import { deepMerge } from '@yelon/util/other';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerService, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { formatDate } from '@yelon/util/date-time';
import { OverlayModule } from '@angular/cdk/overlay';
import { AccountBookTwoTone, AccountBookFill, AccountBookOutline, AlertTwoTone, AlertFill, AlibabaOutline, AimOutline, AlipayCircleFill, AlertOutline, AlignCenterOutline, AlipayCircleOutline, AlipayOutline, AlignLeftOutline, AlignRightOutline, AmazonOutline, AliwangwangOutline, AliyunOutline, AlipaySquareFill, AmazonCircleFill, AndroidFill, AliwangwangFill, AntCloudOutline, AmazonSquareFill, AndroidOutline, ApartmentOutline, ApiTwoTone, ApiFill, ApiOutline, AntDesignOutline, AppstoreAddOutline, AppstoreFill, AppleOutline, AppstoreOutline, ArrowDownOutline, AppleFill, ArrowsAltOutline, AppstoreTwoTone, ArrowUpOutline, AreaChartOutline, ArrowLeftOutline, AudioFill, ArrowRightOutline, AudioTwoTone, AuditOutline, AudioMutedOutline, BackwardFill, AudioOutline, BackwardOutline, BankFill, BarcodeOutline, BellFill, BankTwoTone, BarsOutline, BankOutline, BehanceCircleFill, BehanceSquareFill, BoldOutline, BellOutline, BehanceOutline, BlockOutline, BehanceSquareOutline, BgColorsOutline, BellTwoTone, BarChartOutline, BookTwoTone, BookFill, BorderOuterOutline, BorderLeftOutline, BorderBottomOutline, BorderHorizontalOutline, BorderTopOutline, BorderOutline, BorderInnerOutline, BorderRightOutline, BoxPlotOutline, BoxPlotFill, BoxPlotTwoTone, BookOutline, BorderlessTableOutline, BorderVerticleOutline, BuildTwoTone, BuildOutline, BugFill, BugOutline, BugTwoTone, BulbFill, BulbTwoTone, BuildFill, BulbOutline, CalculatorFill, CalculatorTwoTone, CalendarFill, CalendarOutline, CalculatorOutline, CalendarTwoTone, CameraOutline, CameraFill, CameraTwoTone, CarTwoTone, CaretDownOutline, CarOutline, CaretLeftFill, CarFill, CaretRightOutline, CaretDownFill, CaretUpOutline, CaretRightFill, CarryOutFill, CarryOutOutline, CaretLeftOutline, CaretUpFill, BranchesOutline, CarryOutTwoTone, CheckCircleFill, CheckCircleOutline, CheckSquareOutline, CheckCircleTwoTone, CiCircleTwoTone, CheckOutline, CheckSquareTwoTone, CiOutline, CheckSquareFill, CiTwoTone, ChromeOutline, ClockCircleOutline, CiCircleOutline, ChromeFill, ClearOutline, CloseCircleTwoTone, CiCircleFill, CloseCircleOutline, ClockCircleFill, CloseCircleFill, ClockCircleTwoTone, CloseOutline, CloseSquareOutline, CloseSquareFill, CloudFill, CloseSquareTwoTone, CloudDownloadOutline, CloudTwoTone, CloudServerOutline, CloudUploadOutline, CloudSyncOutline, ClusterOutline, CodeSandboxCircleFill, CodeFill, CodepenCircleOutline, CloudOutline, CodeSandboxOutline, CodeOutline, CodeSandboxSquareFill, CodeTwoTone, CodepenSquareFill, CodepenOutline, CoffeeOutline, ColumnWidthOutline, CompressOutline, ColumnHeightOutline, CodepenCircleFill, CompassTwoTone, CommentOutline, ContainerFill, CompassOutline, ConsoleSqlOutline, ContactsOutline, ContainerTwoTone, ContactsFill, ContactsTwoTone, ContainerOutline, ControlFill, CopyFill, CopyOutline, CompassFill, CopyTwoTone, CopyrightOutline, CopyrightCircleOutline, ControlTwoTone, ControlOutline, CreditCardFill, CopyrightTwoTone, CrownFill, CopyrightCircleFill, CrownOutline, CustomerServiceTwoTone, CreditCardOutline, CustomerServiceOutline, DashboardTwoTone, CrownTwoTone, CreditCardTwoTone, CustomerServiceFill, DashboardFill, DashOutline, DatabaseOutline, DatabaseTwoTone, DatabaseFill, DashboardOutline, DeleteTwoTone, DeleteRowOutline, DeleteColumnOutline, DeliveredProcedureOutline, DeleteOutline, CopyrightCircleTwoTone, DesktopOutline, DeleteFill, DiffOutline, DiffFill, DeploymentUnitOutline, DiffTwoTone, DingtalkOutline, DollarCircleFill, DislikeFill, DingtalkSquareFill, DisconnectOutline, DollarCircleTwoTone, DollarOutline, DingtalkCircleFill, DislikeTwoTone, DollarTwoTone, DownCircleFill, DislikeOutline, DollarCircleOutline, DoubleLeftOutline, DownSquareFill, DownOutline, DownSquareOutline, DownSquareTwoTone, DownCircleTwoTone, DoubleRightOutline, DownCircleOutline, DownloadOutline, DotChartOutline, DribbbleCircleFill, DribbbleOutline, DribbbleSquareOutline, DropboxCircleFill, DingdingOutline, EditOutline, DribbbleSquareFill, DropboxSquareFill, EllipsisOutline, EnvironmentFill, EditFill, EnterOutline, EuroCircleFill, EuroTwoTone, EuroCircleOutline, EditTwoTone, EuroOutline, EnvironmentTwoTone, ExclamationCircleFill, ExpandAltOutline, EuroCircleTwoTone, ExclamationCircleTwoTone, EnvironmentOutline, ExperimentOutline, ExperimentFill, ExpandOutline, ExceptionOutline, ExportOutline, ExperimentTwoTone, ExclamationCircleOutline, ExclamationOutline, EyeFill, EyeInvisibleFill, EyeInvisibleTwoTone, DropboxOutline, DragOutline, FacebookOutline, FacebookFill, EyeTwoTone, EyeOutline, FastForwardFill, FieldBinaryOutline, FieldNumberOutline, FastBackwardOutline, FileAddFill, FastBackwardFill, FileExcelFill, FastForwardOutline, FieldStringOutline, FileDoneOutline, FileAddTwoTone, FileExcelTwoTone, FileExclamationFill, FileAddOutline, FileExclamationOutline, FieldTimeOutline, FileImageTwoTone, FileExcelOutline, FileExclamationTwoTone, FileImageFill, FileGifOutline, FileFill, FileMarkdownTwoTone, FileMarkdownOutline, FallOutline, FileImageOutline, EyeInvisibleOutline, FilePdfOutline, FileSearchOutline, FilePptTwoTone, FilePdfTwoTone, FileJpgOutline, FileTextFill, FilePptOutline, FileSyncOutline, FilePptFill, FileUnknownOutline, FileProtectOutline, FileTextTwoTone, FileWordFill, FileUnknownTwoTone, FileWordTwoTone, FileUnknownFill, FileTextOutline, FileZipFill, FilterTwoTone, FilterFill, FileWordOutline, FireOutline, FireTwoTone, FileZipOutline, FilterOutline, FlagTwoTone, FileTwoTone, FilePdfFill, FileOutline, FileMarkdownFill, FileZipTwoTone, FlagOutline, FolderAddTwoTone, FolderOpenFill, FireFill, FlagFill, FolderOutline, FolderViewOutline, FolderTwoTone, FontColorsOutline, FolderOpenTwoTone, FolderFill, ForwardOutline, FolderOpenOutline, ForkOutline, ForwardFill, FormatPainterOutline, FormatPainterFill, FormOutline, FrownFill, FrownTwoTone, FullscreenOutline, FontSizeOutline, FundFill, FunctionOutline, FundViewOutline, FullscreenExitOutline, GifOutline, FundProjectionScreenOutline, FundTwoTone, FolderAddFill, FunnelPlotTwoTone, GiftOutline, FunnelPlotFill, FundOutline, FrownOutline, GithubOutline, GoldFill, FolderAddOutline, GitlabFill, GiftFill, GitlabOutline, GoldTwoTone, GoogleCircleFill, GiftTwoTone, GooglePlusCircleFill, GoldOutline, GithubFill, GoogleOutline, GooglePlusOutline, GoogleSquareFill, GoldenFill, HddTwoTone, GooglePlusSquareFill, GlobalOutline, HeartOutline, HeartTwoTone, GroupOutline, HeartFill, HeatMapOutline, GatewayOutline, FunnelPlotOutline, HddFill, HomeFill, HighlightFill, HomeOutline, HistoryOutline, HighlightOutline, HddOutline, HourglassFill, HomeTwoTone, HourglassTwoTone, Html5Outline, Html5Fill, IdcardFill, Html5TwoTone, HourglassOutline, IdcardTwoTone, IdcardOutline, IeOutline, IeCircleFill, IeSquareFill, InboxOutline, ImportOutline, InfoCircleOutline, InfoCircleTwoTone, InsertRowAboveOutline, InsertRowRightOutline, InfoCircleFill, InfoOutline, InsertRowBelowOutline, HighlightTwoTone, InsuranceFill, InstagramFill, InteractionFill, InsertRowLeftOutline, InstagramOutline, InteractionOutline, ItalicOutline, InteractionTwoTone, LayoutOutline, IssuesCloseOutline, LayoutFill, LaptopOutline, LeftCircleFill, LayoutTwoTone, KeyOutline, LeftOutline, LeftCircleOutline, LeftSquareOutline, LeftSquareFill, LeftCircleTwoTone, LikeFill, LeftSquareTwoTone, LineOutline, LikeTwoTone, LinkedinOutline, LineChartOutline, LineHeightOutline, LinkedinFill, LinkOutline, LikeOutline, InsuranceOutline, Loading3QuartersOutline, LockFill, InsuranceTwoTone, MacCommandOutline, LockTwoTone, LoadingOutline, MailOutline, LoginOutline, MedicineBoxOutline, MailFill, MailTwoTone, MacCommandFill, ManOutline, MedicineBoxFill, MedicineBoxTwoTone, MediumCircleFill, MediumOutline, MehFill, MediumWorkmarkOutline, MenuFoldOutline, MehOutline, MediumSquareFill, MessageTwoTone, MehTwoTone, MergeCellsOutline, MinusCircleFill, MenuOutline, MenuUnfoldOutline, MessageFill, MinusCircleTwoTone, LockOutline, MinusOutline, MinusCircleOutline, LogoutOutline, MessageOutline, MoneyCollectFill, MinusSquareOutline, MinusSquareTwoTone, MobileOutline, MobileTwoTone, MoneyCollectOutline, MoreOutline, NotificationFill, NotificationOutline, MoneyCollectTwoTone, NodeIndexOutline, NodeExpandOutline, MonitorOutline, OrderedListOutline, NodeCollapseOutline, NumberOutline, PaperClipOutline, NotificationTwoTone, PauseCircleFill, PartitionOutline, PauseOutline, OneToOneOutline, PayCircleOutline, PayCircleFill, MinusSquareFill, PauseCircleOutline, PauseCircleTwoTone, PicCenterOutline, PicRightOutline, PercentageOutline, MobileFill, PictureOutline, PictureFill, PhoneTwoTone, PhoneFill, PieChartFill, PictureTwoTone, PieChartOutline, PlaySquareFill, PlayCircleTwoTone, PlayCircleFill, PlusCircleFill, PlaySquareTwoTone, PlaySquareOutline, PlayCircleOutline, PieChartTwoTone, PlusCircleOutline, PlusSquareFill, PoundCircleFill, PlusSquareOutline, PlusOutline, PoundOutline, PoundCircleOutline, PlusSquareTwoTone, PlusCircleTwoTone, PoweroffOutline, PoundCircleTwoTone, PhoneOutline, PrinterFill, PicLeftOutline, ProjectTwoTone, PrinterOutline, ProjectFill, ProfileOutline, ProfileTwoTone, ProjectOutline, PropertySafetyFill, PullRequestOutline, PropertySafetyOutline, PushpinOutline, PushpinTwoTone, PropertySafetyTwoTone, PushpinFill, QqOutline, QqCircleFill, QrcodeOutline, QqSquareFill, QuestionCircleTwoTone, QuestionCircleFill, RadarChartOutline, RadiusUprightOutline, QuestionCircleOutline, QuestionOutline, ReadFill, RadiusUpleftOutline, RadiusBottomleftOutline, RadiusSettingOutline, RadiusBottomrightOutline, ProfileFill, PrinterTwoTone, ReadOutline, ReconciliationFill, ReloadOutline, ReconciliationOutline, RedEnvelopeTwoTone, RedditCircleFill, RedoOutline, RedEnvelopeFill, RedditOutline, RestTwoTone, RightCircleOutline, RestOutline, RedditSquareFill, RestFill, RightCircleTwoTone, RightOutline, RightSquareFill, RightCircleFill, RightSquareOutline, RetweetOutline, RiseOutline, RightSquareTwoTone, RobotFill, RocketOutline, RobotOutline, RocketTwoTone, RocketFill, RedEnvelopeOutline, RollbackOutline, RotateRightOutline, RotateLeftOutline, ReconciliationTwoTone, SafetyCertificateTwoTone, SaveOutline, SafetyOutline, SaveFill, SaveTwoTone, ScheduleFill, SafetyCertificateOutline, ScanOutline, ScheduleTwoTone, SearchOutline, ScheduleOutline, SecurityScanTwoTone, SecurityScanOutline, ScissorOutline, SelectOutline, SecurityScanFill, SendOutline, SettingOutline, SettingTwoTone, SettingFill, ShareAltOutline, ShopOutline, ShopFill, ShopTwoTone, ShrinkOutline, ShakeOutline, ShoppingOutline, ShoppingCartOutline, ShoppingFill, SisternodeOutline, ShoppingTwoTone, SafetyCertificateFill, SkinOutline, SignalFill, SketchOutline, SkinTwoTone, SketchSquareFill, SkypeFill, SkinFill, SlackCircleFill, SlackSquareFill, SlidersTwoTone, SkypeOutline, SlidersFill, SlackSquareOutline, SmallDashOutline, SmileTwoTone, SlidersOutline, SnippetsFill, SnippetsOutline, SmileOutline, SolutionOutline, SlackOutline, SnippetsTwoTone, SoundTwoTone, SortAscendingOutline, SoundFill, SortDescendingOutline, SmileFill, SoundOutline, SplitCellsOutline, SketchCircleFill, StarOutline, StockOutline, StarTwoTone, StepForwardFill, StarFill, StepBackwardFill, StepForwardOutline, StopFill, SubnodeOutline, SwapLeftOutline, StopOutline, StopTwoTone, SwapRightOutline, SwapOutline, SwitcherTwoTone, SwitcherOutline, SyncOutline, StrikethroughOutline, SwitcherFill, TagOutline, TabletTwoTone, TabletOutline, TabletFill, TableOutline, TagsFill, TagFill, TagsTwoTone, TaobaoCircleOutline, StepBackwardOutline, TagsOutline, TagTwoTone, TaobaoOutline, ThunderboltOutline, TaobaoSquareFill, TeamOutline, TaobaoCircleFill, ThunderboltTwoTone, ToolFill, ThunderboltFill, ToTopOutline, ToolOutline, ToolTwoTone, TrademarkCircleFill, TrophyFill, TrademarkCircleTwoTone, TransactionOutline, TrademarkCircleOutline, TranslationOutline, TwitterCircleFill, TrophyOutline, TrademarkOutline, TrophyTwoTone, TwitterSquareFill, UnlockFill, TwitterOutline, UnderlineOutline, UndoOutline, UpCircleFill, UngroupOutline, UnlockTwoTone, UnlockOutline, UpOutline, UsbFill, UpCircleOutline, UnorderedListOutline, UpCircleTwoTone, UpSquareFill, UpSquareOutline, UserAddOutline, UsbTwoTone, UsergroupDeleteOutline, UpSquareTwoTone, UserOutline, UsbOutline, UserDeleteOutline, UserSwitchOutline, VerticalLeftOutline, VerticalAlignBottomOutline, VerifiedOutline, UsergroupAddOutline, UploadOutline, VerticalAlignMiddleOutline, VerticalAlignTopOutline, VerticalRightOutline, VideoCameraOutline, VideoCameraAddOutline, VideoCameraTwoTone, VideoCameraFill, WalletOutline, WalletFill, WarningFill, WarningOutline, WechatOutline, WalletTwoTone, WeiboCircleFill, WarningTwoTone, WeiboSquareFill, WeiboOutline, WeiboSquareOutline, WeiboCircleOutline, WechatFill, WhatsAppOutline, WifiOutline, WomanOutline, YoutubeFill, YahooOutline, WindowsFill, WindowsOutline, YoutubeOutline, YuqueOutline, ZhihuCircleFill, YuqueFill, ZhihuOutline, ZhihuSquareFill, ZoomInOutline, ZoomOutOutline, YahooFill } from '@ant-design/icons-angular/icons';
import * as i1$1 from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon';

function stepPreloader() {
    const doc = inject(DOCUMENT);
    const ssr = isPlatformServer(inject(PLATFORM_ID));
    if (ssr) {
        return () => { };
    }
    const body = doc.querySelector('body');
    body.style.overflow = 'hidden';
    let done = false;
    return () => {
        if (done)
            return;
        done = true;
        const preloader = doc.querySelector('.preloader');
        if (preloader == null)
            return;
        const CLS = 'preloader-hidden';
        preloader.addEventListener('transitionend', () => {
            preloader.className = CLS;
        });
        preloader.className += ` ${CLS}-add ${CLS}-add-active`;
        body.style.overflow = '';
    };
}

const YUNZAI_I18N_TOKEN = new InjectionToken('yunzaiI18nToken', {
    providedIn: 'root',
    factory: () => new YunzaiI18NServiceFake(inject(YunzaiConfigService))
});
class YunzaiI18nBaseService {
    get change() {
        return this._change$.asObservable().pipe(filter(w => w != null));
    }
    get defaultLang() {
        return this._defaultLang;
    }
    get currentLang() {
        return this._currentLang;
    }
    get data() {
        return this._data;
    }
    constructor(cogSrv) {
        this._change$ = new BehaviorSubject(null);
        this._currentLang = '';
        this._defaultLang = '';
        this._data = {};
        this.cog = cogSrv.merge('themeI18n', {
            interpolation: ['{{', '}}']
        });
    }
    /**
     * Flattened data source
     *
     * @example
     * {
     *   "name": "Name",
     *   "sys": {
     *     "": "System",
     *     "title": "Title"
     *   }
     * }
     * =>
     * {
     *   "name": "Name",
     *   "sys": "System",
     *   "sys.title": "Title"
     * }
     */
    flatData(data, parentKey) {
        const res = {};
        for (const key of Object.keys(data)) {
            const value = data[key];
            if (typeof value === 'object') {
                const child = this.flatData(value, parentKey.concat(key));
                Object.keys(child).forEach(childKey => (res[childKey] = child[childKey]));
            }
            else {
                res[(key ? parentKey.concat(key) : parentKey).join('.')] = `${value}`;
            }
        }
        return res;
    }
    fanyi(path, params) {
        let content = this._data[path] || '';
        if (!content)
            return path;
        if (!params)
            return content;
        if (typeof params === 'object') {
            const interpolation = this.cog.interpolation;
            const objParams = params;
            Object.keys(objParams).forEach(key => (content = content.replace(new RegExp(`${interpolation[0]}\\s?${key}\\s?${interpolation[1]}`, 'g'), `${objParams[key]}`)));
        }
        (Array.isArray(params) ? params : [params]).forEach((item, index) => (content = content.replace(new RegExp(`\\{\\s?${index}\\s?\\}`, 'g'), `${item}`)));
        return content;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18nBaseService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18nBaseService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18nBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang, data) {
        this._data = this.flatData(data ?? {}, []);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return [];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18NServiceFake, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18NServiceFake, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18NServiceFake, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * 菜单服务
 */
class MenuService {
    constructor() {
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN);
        this.aclService = inject(ACLService);
        this._change$ = new BehaviorSubject([]);
        this.data = [];
        /**
         * 是否完全受控菜单打开状态，默认：`false`
         */
        this.openStrictly = false;
        this.$routerLink = new BehaviorSubject('');
        this.i18n$ = this.i18nSrv.change.subscribe(() => this.resume());
    }
    get change() {
        return this._change$.pipe(share());
    }
    get menus() {
        return this.data;
    }
    visit(data, callback) {
        const inFn = (list, parentMenu, depth) => {
            for (const item of list) {
                callback(item, parentMenu, depth);
                if (item.children && item.children.length > 0) {
                    inFn(item.children, item, depth + 1);
                }
                else {
                    item.children = [];
                }
            }
        };
        inFn(data, null, 0);
    }
    add(items) {
        this.data = items;
        this.resume();
    }
    fixItem(item) {
        item._aclResult = true;
        if (!item.link)
            item.link = '';
        if (!item.externalLink)
            item.externalLink = '';
        // badge
        if (item.badge) {
            if (item.badgeDot !== true) {
                item.badgeDot = false;
            }
            if (!item.badgeStatus) {
                item.badgeStatus = 'error';
            }
        }
        if (!Array.isArray(item.children)) {
            item.children = [];
        }
        // icon
        if (typeof item.icon === 'string') {
            let type = 'class';
            let value = item.icon;
            // compatible `anticon anticon-user`
            if (~item.icon.indexOf(`anticon-`)) {
                type = 'icon';
                value = value.split('-').slice(1).join('-');
            }
            else if (/^https?:\/\//.test(item.icon)) {
                type = 'img';
            }
            item.icon = { type, value };
        }
        if (item.icon != null) {
            item.icon = { theme: 'outline', spin: false, ...item.icon };
        }
        item.text = item.i18n ? this.i18nSrv.fanyi(item.i18n) : item.text;
        // group
        item.group = item.group !== false;
        // hidden
        item._hidden = typeof item.hide === 'undefined' ? false : item.hide;
        // disabled
        item.disabled = typeof item.disabled === 'undefined' ? false : item.disabled;
        // acl
        item._aclResult = item.acl ? this.aclService.can(item.acl) : true;
        item.open = item.open != null ? item.open : false;
    }
    resume(callback) {
        let i = 1;
        const shortcuts = [];
        this.visit(this.data, (item, parent, depth) => {
            item._id = i++;
            item._parent = parent;
            item._depth = depth;
            this.fixItem(item);
            // shortcut
            if (parent && item.shortcut === true && parent.shortcutRoot !== true) {
                shortcuts.push(item);
            }
            if (callback)
                callback(item, parent, depth);
        });
        this.loadShortcut(shortcuts);
        this._change$.next(this.data);
    }
    /**
     * 加载快捷菜单，加载位置规则如下：
     * 1、统一在下标0的节点下（即【主导航】节点下方）
     *      1、若 children 存在 【shortcutRoot: true】则最优先【推荐】这种方式
     *      2、否则查找带有【dashboard】字样链接，若存在则在此菜单的下方创建快捷入口
     *      3、否则放在0节点位置
     */
    loadShortcut(shortcuts) {
        if (shortcuts.length === 0 || this.data.length === 0) {
            return;
        }
        const ls = this.data[0].children;
        let pos = ls.findIndex(w => w.shortcutRoot === true);
        if (pos === -1) {
            pos = ls.findIndex(w => w.link.includes('dashboard'));
            pos = (pos !== -1 ? pos : -1) + 1;
            const shortcutMenu = {
                text: '快捷菜单',
                i18n: 'shortcut',
                icon: 'icon-rocket',
                children: []
            };
            this.data[0].children.splice(pos, 0, shortcutMenu);
        }
        let _data = this.data[0].children[pos];
        if (_data.i18n)
            _data.text = this.i18nSrv.fanyi(_data.i18n);
        _data = Object.assign(_data, {
            shortcutRoot: true,
            _id: -1,
            _parent: null,
            _depth: 1
        });
        _data.children = shortcuts.map(i => {
            i._depth = 2;
            i._parent = _data;
            return i;
        });
    }
    /**
     * 清空菜单
     */
    clear() {
        this.data = [];
        this._change$.next(this.data);
    }
    /**
     * Use `url` or `key` to find menus
     *
     * 利用 `url` 或 `key` 查找菜单
     */
    find(options) {
        const opt = { recursive: false, ignoreHide: false, last: false, ...options };
        if (opt.key != null) {
            return this.getItem(opt.key);
        }
        let url = opt.url;
        let item = null;
        while (!item && url) {
            this.visit(opt.data ?? this.data, i => {
                if (!opt.last && item != null) {
                    return;
                }
                if (opt.ignoreHide && i.hide) {
                    return;
                }
                if (opt.cb) {
                    const res = opt.cb(i);
                    if (typeof res === 'boolean' && res) {
                        item = i;
                    }
                }
                if (i.link != null && i.link === url) {
                    item = i;
                }
            });
            if (!opt.recursive)
                break;
            if (/[?;]/g.test(url)) {
                url = url.split(/[?;]/g)[0];
            }
            else {
                url = url.split('/').slice(0, -1).join('/');
            }
        }
        return item;
    }
    /**
     * 根据url获取菜单列表
     * - 若 `recursive: true` 则会自动向上递归查找
     *  - 菜单数据源包含 `/ware`，则 `/ware/1` 也视为 `/ware` 项
     */
    getPathByUrl(url, recursive = false) {
        const ret = [];
        let item = this.find({ url, recursive });
        if (!item)
            return ret;
        do {
            ret.splice(0, 0, item);
            item = item._parent;
        } while (item);
        return ret;
    }
    /**
     * Get menu based on `key`
     */
    getItem(key) {
        let res = null;
        this.visit(this.data, item => {
            if (res == null && item.key === key) {
                res = item;
            }
        });
        return res;
    }
    /**
     * Set menu based on `key`
     */
    setItem(key, value, options) {
        const item = typeof key === 'string' ? this.getItem(key) : key;
        if (item == null)
            return;
        Object.keys(value).forEach(k => {
            item[k] = value[k];
        });
        this.fixItem(item);
        if (options?.emit !== false)
            this._change$.next(this.data);
    }
    /**
     * Open menu based on `key` or menu object
     */
    open(keyOrItem, options) {
        let item = typeof keyOrItem === 'string' ? this.find({ key: keyOrItem }) : keyOrItem;
        if (item == null)
            return;
        this.visit(this.menus, (i) => {
            i._selected = false;
            if (!this.openStrictly)
                i.open = false;
        });
        do {
            item._selected = true;
            item.open = true;
            item = item._parent;
        } while (item);
        if (options?.emit !== false)
            this._change$.next(this.data);
    }
    openAll(status) {
        this.toggleOpen(null, { allStatus: status });
    }
    toggleOpen(keyOrItem, options) {
        let item = typeof keyOrItem === 'string' ? this.find({ key: keyOrItem }) : keyOrItem;
        if (item == null) {
            this.visit(this.menus, (i) => {
                i._selected = false;
                i.open = options?.allStatus === true;
            });
        }
        else {
            if (!this.openStrictly) {
                this.visit(this.menus, (i) => {
                    if (i !== item)
                        i.open = false;
                });
                let pItem = item._parent;
                while (pItem) {
                    pItem.open = true;
                    pItem = pItem._parent;
                }
            }
            item.open = !item.open;
        }
        if (options?.emit !== false)
            this._change$.next(this.data);
    }
    ngOnDestroy() {
        this._change$.unsubscribe();
        this.i18n$?.unsubscribe();
    }
    setRouterLink(url) {
        this.$routerLink.next(url);
    }
    getRouterLink() {
        return this.$routerLink.asObservable();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: MenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: MenuService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: MenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

const YUNZAI_SETTING_KEYS = new InjectionToken('YUNZAI_SETTING_KEYS');
const YUNZAI_SETTING_DEFAULT = {
    provide: YUNZAI_SETTING_KEYS,
    useValue: {
        layout: 'layout',
        user: 'user',
        app: 'app'
    }
};
class SettingsService {
    constructor() {
        this.KEYS = inject(YUNZAI_SETTING_KEYS);
        this.platform = inject(Platform);
        this.notify$ = new Subject();
        this._app = null;
        this._user = null;
        this._layout = null;
    }
    getData(key) {
        if (!this.platform.isBrowser) {
            return null;
        }
        return JSON.parse(localStorage.getItem(key) || 'null') || null;
    }
    setData(key, value) {
        if (!this.platform.isBrowser) {
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    }
    get layout() {
        if (!this._layout) {
            this._layout = {
                fixed: true,
                collapsed: false,
                boxed: false,
                lang: null,
                ...this.getData(this.KEYS.layout)
            };
            this.setData(this.KEYS.layout, this._layout);
        }
        return this._layout;
    }
    get app() {
        if (!this._app) {
            this._app = {
                year: new Date().getFullYear(),
                ...this.getData(this.KEYS.app)
            };
            this.setData(this.KEYS.app, this._app);
        }
        return this._app;
    }
    get user() {
        if (!this._user) {
            this._user = { ...this.getData(this.KEYS.user) };
            this.setData(this.KEYS.user, this._user);
        }
        return this._user;
    }
    get notify() {
        return this.notify$.asObservable();
    }
    setLayout(name, value) {
        if (typeof name === 'string') {
            this.layout[name] = value;
        }
        else {
            this._layout = name;
        }
        this.setData(this.KEYS.layout, this._layout);
        this.notify$.next({ type: 'layout', name, value });
        return true;
    }
    getLayout() {
        return this._layout;
    }
    setApp(value) {
        this._app = value;
        this.setData(this.KEYS.app, value);
        this.notify$.next({ type: 'app', value });
    }
    getApp() {
        return this._app;
    }
    setUser(value) {
        this._user = value;
        this.setData(this.KEYS.user, value);
        this.notify$.next({ type: 'user', value });
    }
    getUser() {
        return this._user;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: SettingsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: SettingsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: SettingsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const REP_MAX = 6;
const SPAN_MAX = 24;
class ResponsiveService {
    constructor(cogSrv) {
        this.cog = cogSrv.merge('themeResponsive', {
            rules: {
                1: { xs: 24 },
                2: { xs: 24, sm: 12 },
                3: { xs: 24, sm: 12, md: 8 },
                4: { xs: 24, sm: 12, md: 8, lg: 6 },
                5: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
                6: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2 }
            }
        });
        if (Object.keys(this.cog.rules)
            .map(i => +i)
            .some((i) => i < 1 || i > REP_MAX)) {
            throw new Error(`[theme] the responseive rule index value range must be 1-${REP_MAX}`);
        }
    }
    genCls(count, defaultCol = 1) {
        const rule = { ...this.cog.rules[count > REP_MAX ? REP_MAX : Math.max(count, 1)] };
        const antColClass = 'ant-col';
        const itemMaxSpan = SPAN_MAX / defaultCol;
        const paddingSpan = (value) => {
            if (value == null || defaultCol <= 1 || count >= defaultCol)
                return value;
            return Math.max(value, count * itemMaxSpan);
        };
        const clsMap = [`${antColClass}-xs-${paddingSpan(rule.xs)}`];
        if (rule.sm)
            clsMap.push(`${antColClass}-sm-${paddingSpan(rule.sm)}`);
        if (rule.md)
            clsMap.push(`${antColClass}-md-${paddingSpan(rule.md)}`);
        if (rule.lg)
            clsMap.push(`${antColClass}-lg-${paddingSpan(rule.lg)}`);
        if (rule.xl)
            clsMap.push(`${antColClass}-xl-${paddingSpan(rule.xl)}`);
        if (rule.xxl)
            clsMap.push(`${antColClass}-xxl-${paddingSpan(rule.xxl)}`);
        return clsMap;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: ResponsiveService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: ResponsiveService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: ResponsiveService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });

const HTML_DIR = 'dir';
const RTL_DIRECTION = 'direction';
const RTL_NZ_COMPONENTS = ['modal', 'drawer', 'message', 'notification', 'image'];
const RTL_YELON_COMPONENTS = ['loading', 'onboarding'];
const LTR = 'ltr';
const RTL = 'rtl';
class RTLService {
    /**
     * Get or Set the current text direction
     *
     * 获取或设置当前文字方向
     */
    get dir() {
        return this._dir;
    }
    set dir(value) {
        this._dir = value;
        this.updateLibConfig();
        this.updateHtml();
        // Should be wait inited
        Promise.resolve().then(() => {
            this.d.value = value;
            this.d.change.emit(value);
            this.srv.setLayout(RTL_DIRECTION, value);
        });
    }
    /**
     * Get the next text direction
     *
     * 获取下一次文字方向
     */
    get nextDir() {
        return this.dir === LTR ? RTL : LTR;
    }
    /**
     * Subscription change notification
     *
     * 订阅变更通知
     */
    get change() {
        return this.srv.notify.pipe(filter(w => w.name === RTL_DIRECTION), map(v => v.value));
    }
    constructor() {
        this.d = inject(Directionality);
        this.nz = inject(NzConfigService);
        this.yelon = inject(YunzaiConfigService);
        this.platform = inject(Platform);
        this.doc = inject(DOCUMENT);
        this.srv = inject(SettingsService);
        this._dir = LTR;
        this.dir = this.srv.layout.direction === RTL ? RTL : LTR;
    }
    /**
     * Toggle text direction
     *
     * 切换文字方向
     */
    toggle() {
        this.dir = this.nextDir;
    }
    updateHtml() {
        if (!this.platform.isBrowser) {
            return;
        }
        const htmlEl = this.doc.querySelector('html');
        if (htmlEl) {
            const dir = this.dir;
            htmlEl.style.direction = dir;
            htmlEl.classList.remove(RTL, LTR);
            htmlEl.classList.add(dir);
            htmlEl.setAttribute(HTML_DIR, dir);
        }
    }
    updateLibConfig() {
        RTL_NZ_COMPONENTS.forEach(name => {
            this.nz.set(name, { nzDirection: this.dir });
        });
        RTL_YELON_COMPONENTS.forEach(name => {
            this.yelon.set(name, { direction: this.dir });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: RTLService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: RTLService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: RTLService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

class TitleService {
    constructor() {
        this.destroy$ = inject(DestroyRef);
        this._prefix = '';
        this._suffix = '';
        this._separator = ' - ';
        this._reverse = false;
        this.DELAY_TIME = 25;
        this.doc = inject(DOCUMENT);
        this.injector = inject(Injector);
        this.title = inject(Title);
        this.menuSrv = inject(MenuService);
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN);
        /**
         * Set default title name
         *
         * 设置默认标题名
         */
        this.default = `Not Page Name`;
        this.i18nSrv.change.pipe(takeUntilDestroyed()).subscribe(() => this.setTitle());
    }
    /**
     * Set separator
     *
     * 设置分隔符
     */
    set separator(value) {
        this._separator = value;
    }
    /**
     * Set prefix
     *
     * 设置前缀
     */
    set prefix(value) {
        this._prefix = value;
    }
    /**
     * Set suffix
     *
     * 设置后缀
     */
    set suffix(value) {
        this._suffix = value;
    }
    /**
     * Set whether to reverse
     *
     * 设置是否反转
     */
    set reverse(value) {
        this._reverse = value;
    }
    getByElement() {
        return of('').pipe(delay(this.DELAY_TIME), map(() => {
            const el = ((this.selector != null ? this.doc.querySelector(this.selector) : null) ||
                this.doc.querySelector('.yunzai-default__content-title h1') ||
                this.doc.querySelector('.page-header__title'));
            if (el) {
                let text = '';
                el.childNodes.forEach(val => {
                    if (!text && val.nodeType === 3) {
                        text = val.textContent.trim();
                    }
                });
                return text || el.firstChild.textContent.trim();
            }
            return '';
        }));
    }
    getByRoute() {
        let next = this.injector.get(ActivatedRoute);
        while (next.firstChild)
            next = next.firstChild;
        const data = (next.snapshot && next.snapshot.data) || {};
        if (data.titleI18n)
            data.title = this.i18nSrv.fanyi(data.titleI18n);
        return isObservable(data.title) ? data.title : of(data.title);
    }
    getByMenu() {
        const menus = this.menuSrv.getPathByUrl(this.injector.get(Router).url);
        if (!menus || menus.length <= 0)
            return of('');
        const item = menus[menus.length - 1];
        let title;
        if (item.i18n)
            title = this.i18nSrv.fanyi(item.i18n);
        return of(title || item.text);
    }
    /**
     * Set the document title
     */
    setTitle(title) {
        this.tit$?.unsubscribe();
        this.tit$ = of(title)
            .pipe(switchMap(tit => (tit ? of(tit) : this.getByRoute())), switchMap(tit => (tit ? of(tit) : this.getByMenu())), switchMap(tit => (tit ? of(tit) : this.getByElement())), map(tit => tit || this.default), map(title => (!Array.isArray(title) ? [title] : title)), takeUntilDestroyed(this.destroy$))
            .subscribe(titles => {
            let newTitles = [];
            if (this._prefix) {
                newTitles.push(this._prefix);
            }
            newTitles.push(...titles.filter(title => !!title));
            if (this._suffix) {
                newTitles.push(this._suffix);
            }
            if (this._reverse) {
                newTitles = newTitles.reverse();
            }
            this.title.setTitle(newTitles.join(this._separator));
        });
    }
    /**
     * Set i18n key of the document title
     */
    setTitleByI18n(key, params) {
        this.setTitle(this.i18nSrv.fanyi(key, params));
    }
    ngOnDestroy() {
        this.tit$?.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: TitleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: TitleService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: TitleService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

class I18nPipe {
    constructor() {
        this.i18n = inject(YUNZAI_I18N_TOKEN);
    }
    transform(key, params) {
        return this.i18n.fanyi(key, params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: I18nPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: I18nPipe, isStandalone: true, name: "i18n" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: I18nPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'i18n', standalone: true }]
        }] });

class YunzaiI18NGuardService {
    constructor(i18nSrv, cogSrv) {
        this.i18nSrv = i18nSrv;
        this.cogSrv = cogSrv;
    }
    process(route) {
        const lang = route.params && route.params[this.cogSrv.get('themeI18n')?.paramNameOfUrlGuard ?? 'i18n'];
        if (lang != null) {
            this.i18nSrv.use(lang);
        }
        return of(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18NGuardService, deps: [{ token: YUNZAI_I18N_TOKEN, optional: true }, { token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18NGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiI18NGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i1.YunzaiConfigService }] });
/**
 * Internationalization guard, automatically recognizes the language in Url and triggers the `YUNZAI_I18N_TOKEN.use` method
 *
 * 国际化守卫，自动识别Url中的语言，并触发 `YUNZAI_I18N_TOKEN.use` 方法
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ yunzaiI18nCanActivate ]
 * }
 * ```
 */
const yunzaiI18nCanActivate = childRoute => inject(YunzaiI18NGuardService).process(childRoute);
/**
 * Internationalization guard, automatically recognizes the language in Url and triggers the `YUNZAI_I18N_TOKEN.use` method
 *
 * 国际化守卫，自动识别Url中的语言，并触发 `YUNZAI_I18N_TOKEN.use` 方法
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ yunzaiI18nCanActivateChild ]
 * }
 * ```
 */
const yunzaiI18nCanActivateChild = route => inject(YunzaiI18NGuardService).process(route);

var yelonElGR = {
    abbr: 'el-GR',
    exception: {
        403: `Λυπούμαστε, δεν έχετε πρόσβαση σε αυτήν τη σελίδα`,
        404: `Λυπούμαστε, η σελίδα αυτή δεν βρέθηκε`,
        500: `Λυπούμαστε, σφάλμα διακομιστή`,
        backToHome: 'Επιστροφή στην αρχική σελίδα'
    },
    noticeIcon: {
        emptyText: 'Δεν υπάρχουν δεδομένα',
        clearText: 'Καθαρισμός'
    },
    reuseTab: {
        close: 'Κλείσιμο καρτέλας',
        closeOther: 'Κλείσιμο των άλλων καρτέλων',
        closeRight: 'Κλείσιμο των καρτελών δεξιά',
        refresh: 'Ανανέωση'
    },
    tagSelect: {
        expand: 'Επέκταση',
        collapse: 'Σύμπτυξη'
    },
    miniProgress: {
        target: 'Στόχος: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} από {{total}}',
        filterConfirm: 'ΟΚ',
        filterReset: 'Επαναφορά'
    },
    sf: {
        submit: 'Υποβολή',
        reset: 'Επαναφορά',
        search: 'Αναζήτηση',
        edit: 'Αποθήκευση',
        addText: 'Προσθήκη',
        removeText: 'Αφαίρεση',
        checkAllText: 'Επιλογή όλων',
        error: {
            'false schema': `Η δυαδική δομή είναι ψευδής`,
            $ref: `Δεν είναι δυνατή η επίλυση της αναφοράς {ref}`,
            additionalItems: `Δεν πρέπει να έχει περισσότερα από {limit} στοιχεία`,
            additionalProperties: `Δεν πρέπει να έχει επιπλέον χαρακτηριστικά`,
            anyOf: `Πρέπει να ταιριάζει με κάποια απο τις δομές στο "anyOf"`,
            dependencies: `τα χαρακτηριστικά {deps} είναι απαραίτητα, όταν υπάρχει το χαρακτηριστικό {property}`,
            enum: `Πρέπει να είναι ίσο με μία από τις προκαθορισμένες τιμές`,
            format: `Πρέπει να έχει την μορφή "{format}"`,
            type: `Πρέπει να είναι {type}`,
            required: `Απαιτείται`,
            maxLength: `Δεν πρέπει να είναι μεγαλύτερο από {limit} χαρακτήρες`,
            minLength: `Δεν πρέπει να είναι μικρότερο από {limit} χαρακτήρες`,
            minimum: `Πρέπει να είναι {comparison} {limit}`,
            formatMinimum: `Πρέπει να είναι {comparison} {limit}`,
            maximum: `Πρέπει να είναι {comparison} {limit}`,
            formatMaximum: `Πρέπει να είναι {comparison} {limit}`,
            maxItems: `Δεν πρέπει να έχει περισσότερα από {limit} στοιχεία`,
            minItems: `Δεν πρέπει να έχει λιγότερα από {limit} στοιχεία`,
            maxProperties: `Δεν πρέπει να έχει περισσότερα από {limit} χαρακτηριστικά`,
            minProperties: `Δεν πρέπει να έχει λιγότερα από {limit} χαρακτηριστικά`,
            multipleOf: `Πρέπει να είναι πολλαπλάσιο του {multipleOf}`,
            not: `Δεν πρέπει να είναι εγκύρο, σύμφωνα με την δομή στο "not"`,
            oneOf: `Πρέπει να ταιριάζει με ακριβώς μια απο τις δομές στο "oneOf"`,
            pattern: `Πρέπει να ταιριάζει με το πρότυπο "{pattern}"`,
            uniqueItems: `Τα στοιχεία δεν πρέπει να επαναλαμβάνονται (τα στοιχεία ## {j} και {i} είναι ίδια)`,
            custom: `Πρέπει να έχει την μορφή`,
            propertyNames: `Το όνομα του χαρακτηριστικού "{propertyName}" δεν είναι έγκυρο`,
            patternRequired: `Πρέπει να υπάρχει το χαρακτηριστικό αντιπαραβολής προτύπου "{missingPattern}"`,
            switch: `Πρέπει να περάσει ο έλεγχος εγκυρότητας της λέξης-κλειδιού με την χρήση της "switch", η περίπτωση {caseIndex} αποτυγχάνει`,
            const: `Πρέπει να είναι ίσο με σταθερά`,
            contains: `Πρέπει να περιέχει κάποιο έγκυρο στοιχείο`,
            formatExclusiveMaximum: `formatExclusiveMaximum πρέπει να είναι boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum πρέπει να είναι boolean`,
            if: `Πρέπει να ταιριάζει στην δομή "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `Παράλειψη`,
        prev: `Προηγούμενο`,
        next: `Επόμενο`,
        done: `Ολοκληρώθηκε`
    }
};

var yelonEnUS = {
    abbr: 'en-US',
    exception: {
        403: `Sorry, you don't have access to this page`,
        404: `Sorry, the page you visited does not exist`,
        500: `Sorry, the server is reporting an error`,
        backToHome: 'Back To Home'
    },
    noticeIcon: {
        emptyText: 'No data',
        clearText: 'Clear'
    },
    reuseTab: {
        close: 'Close tab',
        closeOther: 'Close other tabs',
        closeRight: 'Close tabs to right',
        refresh: 'Refresh'
    },
    tagSelect: {
        expand: 'Expand',
        collapse: 'Collapse'
    },
    miniProgress: {
        target: 'Target: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} of {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Reset'
    },
    sf: {
        submit: 'Submit',
        reset: 'Reset',
        search: 'Search',
        edit: 'Save',
        addText: 'Add',
        removeText: 'Remove',
        checkAllText: 'Check all',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Skip`,
        prev: `Prev`,
        next: `Next`,
        done: `Done`
    }
};

var yelonEsES = {
    abbr: 'es-ES',
    exception: {
        403: `Lo sentimos, no tiene acceso a esta página`,
        404: `Lo sentimos, la página que ha visitado no existe`,
        500: `Lo siento, error interno del servidor `,
        backToHome: 'Volver a la página de inicio'
    },
    noticeIcon: {
        emptyText: 'No hay datos',
        clearText: 'Limpiar'
    },
    reuseTab: {
        close: 'Cerrar pestaña',
        closeOther: 'Cerrar otras pestañas',
        closeRight: 'Cerrar pestañas a la derecha',
        refresh: 'Actualizar'
    },
    tagSelect: {
        expand: 'Expandir',
        collapse: 'Ocultar'
    },
    miniProgress: {
        target: 'Target: '
    },
    st: {
        total: '{{rango[0]}} - {{rango[1]}} de {{total}}',
        filterConfirm: 'Aceptar',
        filterReset: 'Reiniciar'
    },
    sf: {
        submit: 'Submit',
        reset: 'Reiniciar',
        search: 'Buscar',
        edit: 'Guardar',
        addText: 'Añadir',
        removeText: 'Eliminar',
        checkAllText: 'Comprobar todo',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Omitir`,
        prev: `Previo`,
        next: `Siguiente`,
        done: `Terminado`
    }
};

var yelonFrFR = {
    abbr: 'fr-FR',
    exception: {
        403: `Désolé, vous n'avez pas accès à cette page`,
        404: `Désolé, la page que vous avez visitée n'existe pas`,
        500: `Désolé, le serveur signale une erreur`,
        backToHome: "Retour à l'accueil"
    },
    noticeIcon: {
        emptyText: 'Pas de données',
        clearText: 'Effacer'
    },
    reuseTab: {
        close: "Fermer l'onglet",
        closeOther: 'Fermer les autres onglets',
        closeRight: 'Fermer les onglets à droite',
        refresh: 'Rafraîchir'
    },
    tagSelect: {
        expand: 'Etendre',
        collapse: 'Effondrer'
    },
    miniProgress: {
        target: 'Cible: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} de {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Réinitialiser'
    },
    sf: {
        submit: 'Soumettre',
        reset: 'Réinitialiser',
        search: 'Rechercher',
        edit: 'Sauvegarder',
        addText: 'Ajouter',
        removeText: 'Supprimer',
        checkAllText: 'Cochez toutes',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Passer`,
        prev: `Précédent`,
        next: `Suivant`,
        done: `Terminé`
    }
};

var yelonHrHR = {
    abbr: 'hr-HR',
    exception: {
        403: `Nažalost, nemate pristup ovoj lokaciji`,
        404: `Nažalost, lokacija ne postoji`,
        500: `Nažalost, server je javio pogrešku`,
        backToHome: 'Nazad na početnu stranicu'
    },
    noticeIcon: {
        emptyText: 'Nema podataka',
        clearText: 'Obriši'
    },
    reuseTab: {
        close: 'Zatvori karticu',
        closeOther: 'Zatvori druge kartice',
        closeRight: 'Zatvori kartice desno',
        refresh: 'Refresh'
    },
    tagSelect: {
        expand: 'Proširi',
        collapse: 'Skupi'
    },
    miniProgress: {
        target: 'Cilj: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} od {{total}}',
        filterConfirm: 'U redu',
        filterReset: 'Poništi'
    },
    sf: {
        submit: 'Pošalji',
        reset: 'Poništi',
        search: 'Pretraži',
        edit: 'Spremi',
        addText: 'Dodaj',
        removeText: 'Ukloni',
        checkAllText: 'Označi sve'
    },
    onboarding: {
        skip: `Preskočiti`,
        prev: `Prethodna`,
        next: `Sljedeći`,
        done: `Sastavljeno`
    }
};

var yelonItIT = {
    abbr: 'it-IT',
    exception: {
        403: `Spiacenti, non hai accesso a questa pagina`,
        404: `Spiacenti, la pagina che hai visitato non esiste`,
        500: `Spiacenti, il server sta riscontrando un errore`,
        backToHome: 'Torna alla Home'
    },
    noticeIcon: {
        emptyText: 'Nessun dato',
        clearText: 'Cancella memoria locale'
    },
    reuseTab: {
        close: 'Chiudi la scheda',
        closeOther: 'Chiudi le altre schede',
        closeRight: 'Chiudi le schede a destra',
        refresh: 'Aggiorna'
    },
    tagSelect: {
        expand: 'Espandi',
        collapse: 'Comprimi'
    },
    miniProgress: {
        target: 'Obiettivo: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} di {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Reimposta'
    },
    sf: {
        submit: 'Invia',
        reset: 'Reimposta',
        search: 'Cerca',
        edit: 'Salva',
        addText: 'Aggiungi',
        removeText: 'Rimuovi',
        checkAllText: 'Seleziona tutto',
        error: {
            'false schema': `Lo schema booleano è falso`,
            $ref: `Impossibile risolvere il riferimento {ref}`,
            additionalItems: `Non deve avere più di {limit} elementi`,
            additionalProperties: `Non deve avere proprietà aggiuntive`,
            anyOf: `Deve corrispondere a uno schema in "anyOf"`,
            dependencies: `Deve avere una proprietà {deps} quando è presente la proprietà {property}`,
            enum: `Deve essere uguale a uno dei valori predefiniti`,
            format: `Deve corrispondere al formato "{format}"`,
            type: `Deve essere {type}`,
            required: `Obbligatorio`,
            maxLength: `Non deve essere superiore a {limit} caratteri`,
            minLength: `Non deve essere superiore a {limit} caratteri`,
            minimum: `Deve essere {comparison} {limit}`,
            formatMinimum: `Deve essere {comparison} {limit}`,
            maximum: `Deve essere {comparison} {limit}`,
            formatMaximum: `Deve essere {comparison} {limit}`,
            maxItems: `Non deve avere più di {limit} elementi`,
            minItems: `Non deve avere meno di {limit} elementi`,
            maxProperties: `Non deve avere più di {limit} proprietà`,
            minProperties: `Non deve avere meno di {limit} proprietà`,
            multipleOf: `Deve essere un multiplo di {multipleOf}`,
            not: `Non deve essere valido secondo lo schema in "not"`,
            oneOf: `Deve corrispondere esattamente a uno schema in "oneOf"`,
            pattern: `Deve corrispondere al modello "{pattern}"`,
            uniqueItems: `Non deve avere elementi duplicati (gli elementi ## {j} e {i} sono identici)`,
            custom: `Deve corrispondere al formato "{format}"`,
            propertyNames: `Il nome della proprietà "{propertyName}" non è valido`,
            patternRequired: `Deve avere una proprietà corrispondete al modello "{missingPattern}"`,
            switch: `Deve superare la convalida della parola chiave "switch", il caso {caseIndex} non è riuscito`,
            const: `Deve essere uguale alla costante`,
            contains: `Deve contenere un elemento valido`,
            formatExclusiveMaximum: `formatExclusiveMaximum deve essere booleano`,
            formatExclusiveMinimum: `formatExclusiveMaximum deve essere booleano`,
            if: `Deve corrispondere allo schema "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `Salta`,
        prev: `Precedente`,
        next: `Successivo`,
        done: `Fatto`
    }
};

var yelonKoKR = {
    abbr: 'ko-KR',
    exception: {
        403: `죄송합니다.이 페이지에 액세스 할 수 없습니다.`,
        404: `죄송합니다. 해당 페이지가 없습니다.`,
        500: `죄송합니다, 서버 오류가 있습니다.`,
        backToHome: '홈으로 돌아갑니다.'
    },
    noticeIcon: {
        emptyText: '데이터 없음',
        clearText: '지우기'
    },
    reuseTab: {
        close: '탭 닫기',
        closeOther: '다른 탭 닫기',
        closeRight: '오른쪽 탭 닫기',
        refresh: '새롭게 하다'
    },
    tagSelect: {
        expand: '펼치기',
        collapse: '접기'
    },
    miniProgress: {
        target: '대상: '
    },
    st: {
        total: '전체 {{total}}건',
        filterConfirm: '확인',
        filterReset: '초기화'
    },
    sf: {
        submit: '제출',
        reset: '재설정',
        search: '검색',
        edit: '저장',
        addText: '추가',
        removeText: '제거',
        checkAllText: '모두 확인',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `건너 뛰기`,
        prev: `이전`,
        next: `다음`,
        done: `끝난`
    }
};

var yelonPlPL = {
    abbr: 'pl-PL',
    exception: {
        403: `Niestety, nie masz uprawnień do tej strony`,
        404: `Niestety, ta strona nie istnieje`,
        500: `Niestety, błąd serwera`,
        backToHome: 'Powróć do strony głównej'
    },
    noticeIcon: {
        emptyText: 'Brak danych',
        clearText: 'Wyczyść'
    },
    reuseTab: {
        close: 'Zamknij kartę',
        closeOther: 'Zamknij inne karty',
        closeRight: 'Zamknij karty po prawej',
        refresh: 'Refresh'
    },
    tagSelect: {
        expand: 'Rozszerz',
        collapse: 'Zmniejsz'
    },
    miniProgress: {
        target: 'Cel: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} z {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Wyczyść'
    },
    sf: {
        submit: 'Wyślij',
        reset: 'Resetuj',
        search: 'Szukaj',
        edit: 'Zapisz',
        addText: 'Dodaj',
        removeText: 'Usuń',
        checkAllText: 'Zaznacz wszystkie',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Pominąć`,
        prev: `Poprzedni`,
        next: `Kolejny`,
        done: `Gotowe`
    }
};

var yelonSlSI = {
    abbr: 'sl-SI',
    exception: {
        403: `Žal nimate dostopa do te strani`,
        404: `Žal stran, ki ste jo obiskali, ne obstaja`,
        500: `Žal strežnik poroča o napaki`,
        backToHome: 'Nazaj domov'
    },
    noticeIcon: {
        emptyText: 'Ni podatkov',
        clearText: 'Počisti'
    },
    reuseTab: {
        close: 'Zapri zavihek',
        closeOther: 'Zaprite druge zavihke',
        closeRight: 'Zaprite zavihke na desni'
    },
    tagSelect: {
        expand: 'Razširi',
        collapse: 'Strni'
    },
    miniProgress: {
        target: 'Cilj: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} of {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Reset'
    },
    sf: {
        submit: 'Pošlji',
        reset: 'Reset',
        search: 'Išči',
        edit: 'Shrani',
        addText: 'Dodaj',
        removeText: 'Odstrani',
        checkAllText: 'Preveri vse',
        error: {
            'false schema': `Boolova shema je napačna`,
            $ref: `Referenc ni mogoče razrešiti {ref}`,
            additionalItems: `Ne sme imeti več kot {limit} artiklov`,
            additionalProperties: `Ne bi smel imeti dodatnih lastnosti`,
            anyOf: `Se mora ujemati s shemo v "anyOf"`,
            dependencies: `mora imeti lastnosti {deps} ko je artikel {property} prisoten`,
            enum: `Mora biti enaka eni od vnaprej določenih vrednosti`,
            format: `Naj ustreza formatu "{format}"`,
            type: `Naj bo {type}`,
            required: `Zahtevano`,
            maxLength: `Ne sme biti daljši od {limit} znakov`,
            minLength: `Ne sme biti krajši od {limit} znakov`,
            minimum: `Naj bo {comparison} {limit}`,
            formatMinimum: `Naj bo {comparison} {limit}`,
            maximum: `Naj bo {comparison} {limit}`,
            formatMaximum: `Naj bo {comparison} {limit}`,
            maxItems: `Ne sme imeti več kot {limit} artiklov`,
            minItems: `Ne sme imeti manj kot {limit} artiklov`,
            maxProperties: `Ne sme imeti več kot {limit} lastnosti`,
            minProperties: `Ne sme imeti manj kot {limit} lastnosti`,
            multipleOf: `Mora biti večkratnik od {multipleOf}`,
            not: `Ne sme biti veljaven po shemi v "not"`,
            oneOf: `Naj ustreza natančno eni shemi v "oneOf"`,
            pattern: `Naj se ujema z vzorcem "{pattern}"`,
            uniqueItems: `Ne bi smel imeti dvojnikov (items ## {j} in {i} so identični)`,
            custom: `Naj ustreza formatu`,
            propertyNames: `Ime artikla "{propertyName}" je neveljavno`,
            patternRequired: `Mora imeti vzorec ujemanja lastnosti "{missingPattern}"`,
            switch: `Mora prestati "switch" validacijo ključne besede, primer {caseIndex} ne uspe`,
            const: `Naj bo enako konstanti`,
            contains: `Naj vsebuje veljaven artikel`,
            formatExclusiveMaximum: `formatExclusiveMaximum naj bo boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum naj bo boolean`,
            if: `Naj se ujema s shemo "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `Preskoči`,
        prev: `Prejšnje`,
        next: `Naslednji`,
        done: `Končano`
    }
};

var yelonTrTR = {
    abbr: 'tr-TR',
    exception: {
        403: `Üzgünüz, bu sayfaya erişiminiz yok`,
        404: `Maalesef bu sayfa mevcut değil`,
        500: `Üzgünüz, sunucu hatası`,
        backToHome: `Ana Sayfa'ya geri dön`
    },
    noticeIcon: {
        emptyText: 'Veri yok',
        clearText: 'Temiz'
    },
    reuseTab: {
        close: 'Sekmeyi Kapat',
        closeOther: 'Diğer sekmeleri kapat',
        closeRight: 'Sağdaki sekmeleri kapat',
        refresh: 'täzele'
    },
    tagSelect: {
        expand: 'Genişlet',
        collapse: 'Daralt'
    },
    miniProgress: {
        target: 'Hedef: '
    },
    st: {
        total: '{{range[0]}} ile {{range[1]}} arasında {{total}}',
        filterConfirm: 'Tamam',
        filterReset: 'Sıfırla'
    },
    sf: {
        submit: 'Gönder',
        reset: 'Sıfırla',
        search: 'Ara',
        edit: 'Kaydet',
        addText: 'Ekle',
        removeText: 'Kaldır',
        checkAllText: 'Tümünü kontrol et',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Atla`,
        prev: `Önceki`,
        next: `Sonraki`,
        done: `Bitti`
    }
};

var zhCN = {
    abbr: 'zh-CN',
    exception: {
        403: '抱歉，你无权访问该页面',
        404: '抱歉，你访问的页面不存在',
        500: '抱歉，服务器出错了',
        backToHome: '返回首页'
    },
    noticeIcon: {
        emptyText: '暂无数据',
        clearText: '清空'
    },
    reuseTab: {
        close: '关闭标签',
        closeOther: '关闭其它标签',
        closeRight: '关闭右侧标签',
        refresh: '刷新'
    },
    tagSelect: {
        expand: '展开',
        collapse: '收起'
    },
    miniProgress: {
        target: '目标值：'
    },
    st: {
        total: '共 {{total}} 条',
        filterConfirm: '确定',
        filterReset: '重置'
    },
    sf: {
        submit: '提交',
        reset: '重置',
        search: '搜索',
        edit: '保存',
        addText: '添加',
        removeText: '移除',
        checkAllText: '全选',
        error: {
            'false schema': `布尔模式出错`,
            $ref: `无法找到引用{ref}`,
            additionalItems: `不允许超过{limit}个元素`,
            additionalProperties: `不允许有额外的属性`,
            anyOf: `数据应为 anyOf 所指定的其中一个`,
            dependencies: `应当拥有属性{property}的依赖属性{deps}`,
            enum: `应当是预设定的枚举值之一`,
            format: `格式不正确`,
            type: `类型应当是 {type}`,
            required: `必填项`,
            maxLength: `至多 {limit} 个字符`,
            minLength: `至少 {limit} 个字符以上`,
            minimum: `必须 {comparison}{limit}`,
            formatMinimum: `必须 {comparison}{limit}`,
            maximum: `必须 {comparison}{limit}`,
            formatMaximum: `必须 {comparison}{limit}`,
            maxItems: `不应多于 {limit} 个项`,
            minItems: `不应少于 {limit} 个项`,
            maxProperties: `不应多于 {limit} 个属性`,
            minProperties: `不应少于 {limit} 个属性`,
            multipleOf: `应当是 {multipleOf} 的整数倍`,
            not: `不应当匹配 "not" schema`,
            oneOf: `只能匹配一个 "oneOf" 中的 schema`,
            pattern: `数据格式不正确`,
            uniqueItems: `不应当含有重复项 (第 {j} 项与第 {i} 项是重复的)`,
            custom: `格式不正确`,
            propertyNames: `属性名 "{propertyName}" 无效`,
            patternRequired: `应当有属性匹配模式 {missingPattern}`,
            switch: `由于 {caseIndex} 失败，未通过 "switch" 校验`,
            const: `应当等于常量`,
            contains: `应当包含一个有效项`,
            formatExclusiveMaximum: `formatExclusiveMaximum 应当是布尔值`,
            formatExclusiveMinimum: `formatExclusiveMinimum 应当是布尔值`,
            if: `应当匹配模式 "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `跳过`,
        prev: `上一项`,
        next: `下一项`,
        done: `完成`
    }
};

var yelonZhTw = {
    abbr: 'zh-TW',
    exception: {
        403: '抱歉，你無權訪問該頁面',
        404: '抱歉，你訪問的頁面不存在',
        500: '抱歉，服務器出錯了',
        backToHome: '返回首頁'
    },
    noticeIcon: {
        emptyText: '暫無數據',
        clearText: '清空'
    },
    reuseTab: {
        close: '關閉標簽',
        closeOther: '關閉其它標簽',
        closeRight: '關閉右側標簽',
        refresh: '刷新'
    },
    tagSelect: {
        expand: '展開',
        collapse: '收起'
    },
    miniProgress: {
        target: '目標值：'
    },
    st: {
        total: '共 {{total}} 條',
        filterConfirm: '確定',
        filterReset: '重置'
    },
    sf: {
        submit: '提交',
        reset: '重置',
        search: '搜索',
        edit: '保存',
        addText: '添加',
        removeText: '移除',
        checkAllText: '全選',
        error: {
            'false schema': `佈爾模式出錯`,
            $ref: `無法找到引用{ref}`,
            additionalItems: `不允許超過{ref}`,
            additionalProperties: `不允許有額外的屬性`,
            anyOf: `數據應為 anyOf 所指定的其中一個`,
            dependencies: `應當擁有屬性{property}的依賴屬性{deps}`,
            enum: `應當是預設定的枚舉值之一`,
            format: `格式不正確`,
            type: `類型應當是 {type}`,
            required: `必填項`,
            maxLength: `至多 {limit} 個字符`,
            minLength: `至少 {limit} 個字符以上`,
            minimum: `必須 {comparison}{limit}`,
            formatMinimum: `必須 {comparison}{limit}`,
            maximum: `必須 {comparison}{limit}`,
            formatMaximum: `必須 {comparison}{limit}`,
            maxItems: `不應多於 {limit} 個項`,
            minItems: `不應少於 {limit} 個項`,
            maxProperties: `不應多於 {limit} 個屬性`,
            minProperties: `不應少於 {limit} 個屬性`,
            multipleOf: `應當是 {multipleOf} 的整數倍`,
            not: `不應當匹配 "not" schema`,
            oneOf: `隻能匹配一個 "oneOf" 中的 schema`,
            pattern: `數據格式不正確`,
            uniqueItems: `不應當含有重複項 (第 {j} 項與第 {i} 項是重複的)`,
            custom: `格式不正確`,
            propertyNames: `屬性名 "{propertyName}" 無效`,
            patternRequired: `應當有屬性匹配模式 {missingPattern}`,
            switch: `由於 {caseIndex} 失敗，未通過 "switch" 校驗`,
            const: `應當等於常量`,
            contains: `應當包含一個有效項`,
            formatExclusiveMaximum: `formatExclusiveMaximum 應當是佈爾值`,
            formatExclusiveMinimum: `formatExclusiveMinimum 應當是佈爾值`,
            if: `應當匹配模式 "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `跳過`,
        prev: `上一項`,
        next: `下一項`,
        done: `完成`
    }
};

const YUNZAI_LANGS = {
    'zh-CN': {
        text: '简体中文',
        ng: ngZh,
        zorro: zh_CN,
        date: zhCN$1,
        yelon: zhCN,
        abbr: '🇨🇳'
    },
    'zh-TW': {
        text: '繁体中文',
        ng: ngZhTw,
        zorro: zh_TW,
        date: zhTW,
        yelon: yelonZhTw,
        abbr: '🇭🇰'
    },
    'en-US': {
        text: 'English',
        ng: ngEn,
        zorro: en_US,
        date: enUS,
        yelon: yelonEnUS,
        abbr: '🇬🇧'
    },
    'el-GR': {
        text: 'Ελληνικά',
        ng: ngElGr,
        zorro: el_GR,
        date: el,
        yelon: yelonElGR,
        abbr: '🇬🇷'
    },
    'es-ES': {
        text: 'Español',
        ng: ngEsEs,
        zorro: es_ES,
        date: es,
        yelon: yelonEsES,
        abbr: '🇪🇸'
    },
    'fr-FR': {
        text: 'Français',
        ng: ngFr,
        zorro: fr_FR,
        date: fr,
        yelon: yelonFrFR,
        abbr: '🇫🇷'
    },
    'hr-HR': {
        text: 'Hrvatski',
        ng: ngHr,
        zorro: hr_HR,
        date: hr,
        yelon: yelonHrHR,
        abbr: '🇭🇷'
    },
    'it-IT': {
        text: 'Italiano',
        ng: ngIt,
        zorro: it_IT,
        date: it,
        yelon: yelonItIT,
        abbr: '🇮🇹'
    },
    'ko-KR': {
        text: '한국어',
        ng: ngKo,
        zorro: ko_KR,
        date: ko,
        yelon: yelonKoKR,
        abbr: '🇰🇷'
    },
    'pl-PL': {
        text: 'Polski',
        ng: ngPl,
        zorro: pl_PL,
        date: pl,
        yelon: yelonPlPL,
        abbr: '🇵🇱'
    },
    'sl-SI': {
        text: 'Slovenščina',
        ng: ngSl,
        zorro: sl_SI,
        date: sl,
        yelon: yelonSlSI,
        abbr: '🇸🇮'
    },
    'tr-TR': {
        text: 'Türkçe',
        ng: ngTr,
        zorro: tr_TR,
        date: tr,
        yelon: yelonTrTR,
        abbr: '🇹🇷'
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 封装HttpClient，主要解决：
 * + 优化HttpClient在参数上便利性
 * + 统一实现 loading
 * + 统一处理时间格式问题
 */
class _HttpClient {
    constructor(cogSrv) {
        this.http = inject(HttpClient);
        this.lc = 0;
        this.cog = cogSrv.merge('themeHttp', {
            nullValueHandling: 'include',
            dateValueHandling: 'timestamp'
        });
    }
    /**
     * Get whether it's loading
     *
     * 获取是否正在加载中
     */
    get loading() {
        return this.lc > 0;
    }
    /**
     * Get the currently loading count
     *
     * 获取当前加载中的数量
     */
    get loadingCount() {
        return this.lc;
    }
    parseParams(params) {
        const newParams = {};
        if (params instanceof HttpParams) {
            return params;
        }
        const { nullValueHandling, dateValueHandling } = this.cog;
        Object.keys(params).forEach(key => {
            let paramValue = params[key];
            // 忽略空值
            if (nullValueHandling === 'ignore' && paramValue == null)
                return;
            // 将时间转化为：时间戳 (秒)
            if (paramValue instanceof Date &&
                (dateValueHandling === 'timestamp' || dateValueHandling === 'timestampSecond')) {
                paramValue = dateValueHandling === 'timestamp' ? paramValue.valueOf() : Math.trunc(paramValue.valueOf() / 1000);
            }
            newParams[key] = paramValue;
        });
        return new HttpParams({ fromObject: newParams });
    }
    appliedUrl(url, params) {
        if (!params)
            return url;
        url += ~url.indexOf('?') ? '' : '?';
        const arr = [];
        Object.keys(params).forEach(key => {
            arr.push(`${key}=${params[key]}`);
        });
        return url + arr.join('&');
    }
    setCount(count) {
        Promise.resolve(null).then(() => (this.lc = count <= 0 ? 0 : count));
    }
    push() {
        this.setCount(++this.lc);
    }
    pop() {
        this.setCount(--this.lc);
    }
    /**
     * Clean loading count
     *
     * 清空加载中
     */
    cleanLoading() {
        this.setCount(0);
    }
    get(url, params, options = {}) {
        return this.request('GET', url, {
            params,
            ...options
        });
    }
    post(url, body, params, options = {}) {
        return this.request('POST', url, {
            body,
            params,
            ...options
        });
    }
    delete(url, params, options = {}) {
        return this.request('DELETE', url, {
            params,
            ...options
        });
    }
    // #endregion
    // #region jsonp
    /**
     * **JSONP Request**
     *
     * @param callbackParam CALLBACK值，默认：JSONP_CALLBACK
     */
    jsonp(url, params, callbackParam = 'JSONP_CALLBACK') {
        return of(null).pipe(delay(0), tap(() => this.push()), switchMap(() => this.http.jsonp(this.appliedUrl(url, params), callbackParam)), finalize(() => this.pop()));
    }
    patch(url, body, params, options = {}) {
        return this.request('PATCH', url, {
            body,
            params,
            ...options
        });
    }
    put(url, body, params, options = {}) {
        return this.request('PUT', url, {
            body,
            params,
            ...options
        });
    }
    form(url, body, params, options = {}) {
        return this.request('POST', url, {
            body,
            params,
            ...options,
            headers: {
                'content-type': `application/x-www-form-urlencoded`
            }
        });
    }
    request(method, url, options = {}) {
        if (options.params)
            options.params = this.parseParams(options.params);
        return of(null).pipe(delay(0), tap(() => this.push()), switchMap(() => this.http.request(method, url, options)), finalize(() => this.pop()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: _HttpClient, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: _HttpClient, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: _HttpClient, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });

const YELON_LOCALE = new InjectionToken('yelon-locale');

class YelonLocaleService {
    constructor(locale) {
        this._locale = zhCN;
        this.change$ = new BehaviorSubject(this._locale);
        this.setLocale(locale || zhCN);
    }
    get change() {
        return this.change$.asObservable();
    }
    setLocale(locale) {
        if (this._locale && this._locale.abbr === locale.abbr) {
            return;
        }
        this._locale = locale;
        this.change$.next(locale);
    }
    get locale() {
        return this._locale;
    }
    getData(path) {
        return (this._locale[path] || {});
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleService, deps: [{ token: YELON_LOCALE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [YELON_LOCALE]
                }] }] });
function YELON_LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale) {
    return exist || new YelonLocaleService(locale);
}
const YELON_LOCALE_SERVICE_PROVIDER = {
    provide: YelonLocaleService,
    useFactory: YELON_LOCALE_SERVICE_PROVIDER_FACTORY,
    deps: [[new Optional(), new SkipSelf(), YelonLocaleService], YELON_LOCALE]
};

const DEFAULT = 'zh-CN';
class YunzaiHttpI18NService extends YunzaiI18nBaseService {
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
            return this.http.get(`./assets/tmp/i18n/${lang}.json`);
        }
        else {
            return this.http
                .get(`/i18n/api/v2/language/${lang}`)
                .pipe(catchError(() => this.http.get(`./assets/tmp/i18n/${lang}.json`)));
        }
    }
    loadLocaleData(lang) {
        return this.http.get(`./assets/tmp/i18n/${lang}.json`);
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
            this.yelonLocaleService.setLocale(yelonEnUS);
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
            return this.http.get(`/i18n/api/v2/language`).pipe(map$1((response) => {
                return response.data;
            }), catchError(() => of(langs)));
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiHttpI18NService, deps: [{ token: _HttpClient }, { token: SettingsService }, { token: i3.NzI18nService }, { token: YelonLocaleService }, { token: i5.Platform }, { token: YA_SERVICE_TOKEN }, { token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiHttpI18NService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiHttpI18NService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: _HttpClient }, { type: SettingsService }, { type: i3.NzI18nService }, { type: YelonLocaleService }, { type: i5.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i1.YunzaiConfigService }] });

const CLS_DRAG = 'MODAL-DRAG';
/**
 * 对话框辅助类
 */
class ModalHelper {
    constructor() {
        this.srv = inject(NzModalService);
        this.drag = inject(DragDrop);
        this.doc = inject(DOCUMENT);
    }
    createDragRef(options, wrapCls) {
        const wrapEl = this.doc.querySelector(wrapCls);
        const modalEl = wrapEl.firstChild;
        const handelEl = options.handleCls ? wrapEl.querySelector(options.handleCls) : null;
        if (handelEl) {
            handelEl.classList.add(`${CLS_DRAG}-HANDLE`);
        }
        return this.drag
            .createDrag(handelEl ?? modalEl)
            .withHandles([handelEl ?? modalEl])
            .withBoundaryElement(wrapEl)
            .withRootElement(modalEl);
    }
    /**
     * 构建一个对话框
     *
     * @param comp 组件
     * @param params 组件参数
     * @param options 额外参数
     *
     * @example
     * this.modalHelper.create(FormEditComponent, { i }).subscribe(res => this.load());
     * // 对于组件的成功&关闭的处理说明
     * // 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
     * this.nzModalRef.close(data);
     * this.nzModalRef.close();
     * // 关闭
     * this.nzModalRef.destroy();
     */
    create(comp, params, options) {
        const isBuildIn = typeof comp === 'string';
        options = deepMerge({
            size: 'lg',
            exact: true,
            includeTabs: false
        }, isBuildIn && arguments.length === 2 ? params : options);
        return new Observable((observer) => {
            const { size, includeTabs, modalOptions, drag, useNzData, focus } = options;
            let cls = [];
            let width = '';
            if (size) {
                if (typeof size === 'number') {
                    width = `${size}px`;
                }
                else if (['sm', 'md', 'lg', 'xl'].includes(size)) {
                    cls.push(`modal-${size}`);
                }
                else {
                    width = size;
                }
            }
            if (includeTabs) {
                cls.push(`modal-include-tabs`);
            }
            if (modalOptions && modalOptions.nzWrapClassName) {
                cls.push(modalOptions.nzWrapClassName);
                delete modalOptions.nzWrapClassName;
            }
            let dragOptions;
            let dragWrapCls = `${CLS_DRAG}-${+new Date()}`;
            let dragRef;
            if (drag != null && drag !== false) {
                dragOptions = {
                    handleCls: `.modal-header, .ant-modal-title`,
                    ...(typeof drag === 'object' ? drag : {})
                };
                cls.push(CLS_DRAG, dragWrapCls);
            }
            const mth = isBuildIn ? this.srv[comp] : this.srv.create;
            const subject = mth.call(this.srv, {
                nzWrapClassName: cls.join(' '),
                nzContent: isBuildIn ? undefined : comp,
                nzWidth: width ? width : undefined,
                nzFooter: null,
                nzData: params,
                ...modalOptions
            });
            // 保留 nzComponentParams 原有风格，但依然可以通过 @Inject(NZ_MODAL_DATA) 获取
            if (subject.componentInstance != null && useNzData !== true) {
                Object.assign(subject.componentInstance, params);
            }
            subject.afterOpen
                .pipe(take(1), tap(() => {
                if (dragOptions != null) {
                    dragRef = this.createDragRef(dragOptions, `.${dragWrapCls}`);
                }
            }), filter(() => focus != null), delay(modalOptions?.nzNoAnimation ? 10 : 241))
                .subscribe(() => {
                const btns = subject
                    .getElement()
                    .querySelector('.ant-modal-confirm-btns, .modal-footer')
                    ?.querySelectorAll('.ant-btn');
                const btnSize = btns?.length ?? 0;
                let el = null;
                if (btnSize === 1) {
                    el = btns[0];
                }
                else if (btnSize > 1) {
                    el = btns[focus === 'ok' ? 1 : 0];
                }
                if (el != null) {
                    el.focus();
                    el.dataset.focused = focus;
                }
            });
            subject.afterClose.pipe(take(1)).subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                dragRef?.dispose();
            });
        });
    }
    /**
     * 构建静态框，点击蒙层不允许关闭
     *
     * @param comp 组件
     * @param params 组件参数
     * @param options 额外参数
     *
     * @example
     * this.modalHelper.open(FormEditComponent, { i }).subscribe(res => this.load());
     * // 对于组件的成功&关闭的处理说明
     * // 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
     * this.nzModalRef.close(data);
     * this.nzModalRef.close();
     * // 关闭
     * this.nzModalRef.destroy();
     */
    createStatic(comp, params, options) {
        const modalOptions = {
            nzMaskClosable: false,
            ...(options && options.modalOptions)
        };
        return this.create(comp, params, { ...options, modalOptions });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: ModalHelper, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: ModalHelper, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: ModalHelper, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * 抽屉辅助类
 *
 * **注意：** 构建结果都可被订阅，但永远都不会触发 `observer.error`
 *
 * @example
 * this.drawerHelper.create('Edit', FormEditComponent, { i }).subscribe(res => this.load());
 * // 对于组件的成功&关闭的处理说明
 * // 成功
 * this.NzDrawerRef.close(data);
 * this.NzDrawerRef.close(true);
 * // 关闭
 * this.NzDrawerRef.close();
 * this.NzDrawerRef.close(false);
 */
class DrawerHelper {
    constructor() {
        this.srv = inject(NzDrawerService);
        this.parentDrawer = inject(DrawerHelper, { optional: true, skipSelf: true });
        this.openDrawersAtThisLevel = [];
    }
    get openDrawers() {
        return this.parentDrawer ? this.parentDrawer.openDrawers : this.openDrawersAtThisLevel;
    }
    /**
     * 构建一个抽屉
     */
    create(title, comp, params, options) {
        options = deepMerge({
            size: 'md',
            footer: true,
            footerHeight: 50,
            exact: true,
            drawerOptions: {
                nzPlacement: 'right',
                nzWrapClassName: ''
            }
        }, options);
        return new Observable((observer) => {
            const { size, footer, footerHeight, drawerOptions } = options;
            const defaultOptions = {
                nzContent: comp,
                nzContentParams: params,
                nzTitle: title
            };
            if (typeof size === 'number') {
                defaultOptions[drawerOptions.nzPlacement === 'top' || drawerOptions.nzPlacement === 'bottom' ? 'nzHeight' : 'nzWidth'] = options.size;
            }
            else if (!drawerOptions.nzWidth) {
                defaultOptions.nzWrapClassName = `${drawerOptions.nzWrapClassName} drawer-${options.size}`.trim();
                delete drawerOptions.nzWrapClassName;
            }
            if (footer) {
                // The 24 value is @drawer-body-padding
                defaultOptions.nzBodyStyle = {
                    'padding-bottom.px': footerHeight + 24
                };
            }
            const ref = this.srv.create({ ...defaultOptions, ...drawerOptions });
            this.openDrawers.push(ref);
            const afterClose$ = ref.afterClose.subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                afterClose$.unsubscribe();
                this.close(ref);
            });
        });
    }
    close(ref) {
        const idx = this.openDrawers.indexOf(ref);
        if (idx === -1)
            return;
        this.openDrawers.splice(idx, 1);
    }
    closeAll() {
        let i = this.openDrawers.length;
        while (i--) {
            this.openDrawers[i].close();
        }
    }
    /**
     * 构建一个抽屉，点击蒙层不允许关闭
     */
    static(title, comp, params, options) {
        const drawerOptions = {
            nzMaskClosable: false,
            ...(options && options.drawerOptions)
        };
        return this.create(title, comp, params, { ...options, drawerOptions });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: DrawerHelper, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: DrawerHelper, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: DrawerHelper, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Every http decorator must be based on `BaseAPI`, Like this:
 * ```ts
 * \@Injectable()
 * class DataService extends BaseApi {}
 * ```
 */
class BaseApi {
    constructor() {
        this.injector = inject(Injector);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: BaseApi, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: BaseApi }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: BaseApi, decorators: [{
            type: Injectable
        }] });
const paramKey = `__api_params`;
function setParam(target, key = paramKey) {
    let params = target[key];
    if (typeof params === 'undefined') {
        params = target[key] = {};
    }
    return params;
}
/**
 * 默认基准URL
 * - 有效范围：类
 */
function BaseUrl(url) {
    return function (target) {
        const params = setParam(target.prototype);
        params.baseUrl = url;
        return target;
    };
}
/**
 * 默认 `headers`
 * - 有效范围：类
 */
function BaseHeaders(headers) {
    return function (target) {
        const params = setParam(target.prototype);
        params.baseHeaders = headers;
        return target;
    };
}
function makeParam(paramName) {
    return function (key) {
        return function (target, propertyKey, index) {
            const params = setParam(setParam(target), propertyKey);
            let tParams = params[paramName];
            if (typeof tParams === 'undefined') {
                tParams = params[paramName] = [];
            }
            tParams.push({
                key,
                index
            });
        };
    };
}
/**
 * URL路由参数
 * - 有效范围：方法参数
 */
const Path = makeParam('path');
/**
 * URL 参数 `QueryString`
 * - 有效范围：方法参数
 */
const Query = makeParam('query');
/**
 * 参数 `Body`
 * - 有效范围：方法参数
 */
const Body = makeParam('body')();
/**
 * 参数 `headers`
 * - 有效范围：方法参数
 * - 合并 `BaseHeaders`
 */
const Headers = makeParam('headers');
/**
 * Request Payload
 * - Supported body (like`POST`, `PUT`) as a body data, equivalent to `@Body`
 * - Not supported body (like `GET`, `DELETE` etc) as a `QueryString`
 */
const Payload = makeParam('payload')();
function getValidArgs(data, key, args) {
    if (!data[key] || !Array.isArray(data[key]) || data[key].length <= 0) {
        return undefined;
    }
    return args[data[key][0].index];
}
function genBody(data, payload) {
    if (Array.isArray(data) || Array.isArray(payload)) {
        return Object.assign([], data, payload);
    }
    return { ...data, ...payload };
}
function makeMethod(method) {
    return function (url = '', options) {
        return (_target, targetKey, descriptor) => {
            descriptor.value = function (...args) {
                options = options || {};
                const injector = this.injector;
                const http = injector.get(_HttpClient, null);
                if (http == null) {
                    throw new TypeError(`Not found '_HttpClient', You can import 'YunzaiThemeModule' && 'HttpClientModule' in your root module.`);
                }
                const baseData = setParam(this);
                const data = setParam(baseData, targetKey);
                let requestUrl = url || '';
                requestUrl = [baseData.baseUrl || '', requestUrl.startsWith('/') ? requestUrl.substring(1) : requestUrl].join('/');
                // fix last split
                if (requestUrl.length > 1 && requestUrl.endsWith('/')) {
                    requestUrl = requestUrl.substring(0, requestUrl.length - 1);
                }
                if (options.acl) {
                    const aclSrv = injector.get(ACLService, null);
                    if (aclSrv && !aclSrv.can(options.acl)) {
                        return throwError(() => ({
                            url: requestUrl,
                            status: 401,
                            statusText: `From Http Decorator`
                        }));
                    }
                    delete options.acl;
                }
                requestUrl = requestUrl.replace(/::/g, '^^');
                (data.path || [])
                    .filter(w => typeof args[w.index] !== 'undefined')
                    .forEach((i) => {
                    requestUrl = requestUrl.replace(new RegExp(`:${i.key}`, 'g'), encodeURIComponent(args[i.index]));
                });
                requestUrl = requestUrl.replace(/\^\^/g, `:`);
                const params = (data.query || []).reduce((p, i) => {
                    p[i.key] = args[i.index];
                    return p;
                }, {});
                const headers = (data.headers || []).reduce((p, i) => {
                    p[i.key] = args[i.index];
                    return p;
                }, {});
                if (method === 'FORM') {
                    headers['content-type'] = 'application/x-www-form-urlencoded';
                }
                const payload = getValidArgs(data, 'payload', args);
                const supportedBody = ['POST', 'PUT', 'PATCH', 'DELETE'].some(v => v === method);
                return http.request(method, requestUrl, {
                    body: supportedBody ? genBody(getValidArgs(data, 'body', args), payload) : null,
                    params: !supportedBody ? { ...params, ...payload } : params,
                    headers: { ...baseData.baseHeaders, ...headers },
                    ...options
                });
            };
            return descriptor;
        };
    };
}
/**
 * `OPTIONS` 请求
 * - 有效范围：方法
 */
const OPTIONS = makeMethod('OPTIONS');
/**
 * `GET` 请求
 * - 有效范围：方法
 */
const GET = makeMethod('GET');
/**
 * `POST` 请求
 * - 有效范围：方法
 */
const POST = makeMethod('POST');
/**
 * `DELETE` 请求
 * - 有效范围：方法
 */
const DELETE = makeMethod('DELETE');
/**
 * `PUT` 请求
 * - 有效范围：方法
 */
const PUT = makeMethod('PUT');
/**
 * `HEAD` 请求
 * - 有效范围：方法
 */
const HEAD = makeMethod('HEAD');
/**
 * `PATCH` 请求
 * - 有效范围：方法
 */
const PATCH = makeMethod('PATCH');
/**
 * `JSONP` 请求
 * - 有效范围：方法
 */
const JSONP = makeMethod('JSONP');
/**
 * `FORM` 请求
 * - 有效范围：方法
 */
const FORM = makeMethod('FORM');

/**
 * Whether to customize the handling of exception messages
 *
 * 是否自定义处理异常消息
 *
 * @example
 * this.http.post(`login`, {
 *  name: 'yunzai-bot', pwd: '123456'
 * }, {
 *  context: new HttpContext()
 *              .set(ALLOW_ANONYMOUS, true)
 *              .set(CUSTOM_ERROR, true)
 * }).subscribe({
 *  next: console.log,
 *  error: console.log
 * });
 */
const CUSTOM_ERROR = new HttpContextToken(() => false);
/**
 * Whether to ignore API prefixes
 *
 * 是否忽略API前缀
 *
 * @example
 * // When environment.api.baseUrl set '/api'
 *
 * this.http.get(`/path`) // Request Url: /api/path
 * this.http.get(`/path`, { context: new HttpContext().set(IGNORE_BASE_URL, true) }) // Request Url: /path
 */
const IGNORE_BASE_URL = new HttpContextToken(() => false);
/**
 * Whether to return raw response body
 *
 * 是否原样返回请求Body
 */
const RAW_BODY = new HttpContextToken(() => false);

class YelonLocaleModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleModule, providers: [{ provide: YELON_LOCALE, useValue: zhCN }, YELON_LOCALE_SERVICE_PROVIDER] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [{ provide: YELON_LOCALE, useValue: zhCN }, YELON_LOCALE_SERVICE_PROVIDER]
                }]
        }] });

var jaJP = {
    abbr: 'ja-JP',
    exception: {
        403: 'ページへのアクセス権限がありません',
        404: 'ページが存在しません',
        500: 'サーバーエラーが発生しました',
        backToHome: 'ホームに戻る'
    },
    noticeIcon: {
        emptyText: 'データが有りません',
        clearText: 'クリア'
    },
    reuseTab: {
        close: 'タブを閉じる',
        closeOther: '他のタブを閉じる',
        closeRight: '右のタブを閉じる',
        refresh: 'リフレッシュ'
    },
    tagSelect: {
        expand: '展開する',
        collapse: '折りたたむ'
    },
    miniProgress: {
        target: '設定値: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} / {{total}}',
        filterConfirm: '確定',
        filterReset: 'リセット'
    },
    sf: {
        submit: '送信',
        reset: 'リセット',
        search: '検索',
        edit: '保存',
        addText: '追加',
        removeText: '削除',
        checkAllText: '全選択',
        error: {
            'false schema': `真偽値スキーマが不正です`,
            $ref: `参照を解決できません: {ref}`,
            additionalItems: `{limit}個を超えるアイテムを含めることはできません`,
            additionalProperties: `追加のプロパティを使用しないでください`,
            anyOf: `"anyOf"のスキーマと一致する必要があります`,
            dependencies: `プロパティ {property} を指定した場合、次の依存関係を満たす必要があります: {deps}`,
            enum: `定義された値のいずれかに等しくなければなりません`,
            format: `入力形式に一致しません: "{format}"`,
            type: `型が不正です: {type}`,
            required: `必須項目です`,
            maxLength: `最大文字数: {limit}`,
            minLength: `最少文字数: {limit}`,
            minimum: `値が不正です: {comparison} {limit}`,
            formatMinimum: `値が不正です: {comparison} {limit}`,
            maximum: `値が不正です: {comparison} {limit}`,
            formatMaximum: `値が不正です: {comparison} {limit}`,
            maxItems: `最大選択数は {limit} より小さい必要があります`,
            minItems: `最小選択数は {limit} より大きい必要があります`,
            maxProperties: `値を{limit}より大きくすることはできません`,
            minProperties: `値を{limit}より小さくすることはできません`,
            multipleOf: `値は次の数の倍数である必要があります: {multipleOf}`,
            not: `値が不正です:`,
            oneOf: `値が不正です:`,
            pattern: `次のパターンに一致する必要があります: "{pattern}"`,
            uniqueItems: `値が重複しています: 選択肢: {j} 、{i}`,
            custom: `形式と一致する必要があります`,
            propertyNames: `次のプロパティの値が無効です: "{propertyName}"`,
            patternRequired: `次のパターンに一致するプロパティが必須です: "{missingPattern}"`,
            switch: `"switch" キーワードの値が不正です: {caseIndex}`,
            const: `値が定数に一致しません`,
            contains: `有効なアイテムを含める必要があります`,
            formatExclusiveMaximum: `formatExclusiveMaximum は真偽値である必要があります`,
            formatExclusiveMinimum: `formatExclusiveMaximum は真偽値である必要があります`,
            if: `パターンと一致する必要があります: "{failingKeyword}" `
        }
    },
    onboarding: {
        skip: `スキップ`,
        prev: `前へ`,
        next: `次`,
        done: `できた`
    }
};

var viVI = {
    abbr: 'vi-VI',
    exception: {
        403: `Xin lỗi, bạn không có quyền truy cập vào trang này`,
        404: `Xin lỗi, trang bạn truy cập không tồn tại`,
        500: `Xin lỗi, máy chủ đang báo cáo một lỗi`,
        backToHome: 'Quay lại Trang chủ'
    },
    noticeIcon: {
        emptyText: 'Không có dữ liệu',
        clearText: 'Xóa'
    },
    reuseTab: {
        close: 'Đóng tab',
        closeOther: 'Đóng các tab khác',
        closeRight: 'Đóng các tab bên phải',
        refresh: 'Làm mới'
    },
    tagSelect: {
        expand: 'Mở rộng',
        collapse: 'Thu gọn'
    },
    miniProgress: {
        target: 'Mục tiêu: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} của {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Đặt lại'
    },
    sf: {
        submit: 'Gửi',
        reset: 'Đặt lại',
        search: 'Tìm kiếm',
        edit: 'Lưu',
        addText: 'Thêm',
        removeText: 'Xóa',
        checkAllText: 'Chọn tất cả',
        error: {
            'false schema': `Mô hình Boolean sai`,
            $ref: `Không thể giải quyết tham chiếu {ref}`,
            additionalItems: `Không nên có nhiều hơn {limit} mục`,
            additionalProperties: `Không nên có các thuộc tính bổ sung`,
            anyOf: `Nên phù hợp với một số mô hình trong "anyOf"`,
            dependencies: `nên có thuộc tính {deps} khi thuộc tính {property} hiện diện`,
            enum: `Nên bằng với một trong số các giá trị được xác định trước`,
            format: `Nên phù hợp với định dạng "{format}"`,
            type: `Nên là {type}`,
            required: `Bắt buộc`,
            maxLength: `Không nên dài hơn {limit} ký tự`,
            minLength: `Không nên ngắn hơn {limit} ký tự`,
            minimum: `Nên là {comparison} {limit}`,
            formatMinimum: `Nên là {comparison} {limit}`,
            maximum: `Nên là {comparison} {limit}`,
            formatMaximum: `Nên là {comparison} {limit}`,
            maxItems: `Không nên có nhiều hơn {limit} mục`,
            minItems: `Không nên có ít hơn {limit} mục`,
            maxProperties: `Không nên có nhiều hơn {limit} thuộc tính`,
            minProperties: `Không nên có ít hơn {limit} thuộc tính`,
            multipleOf: `Nên là bội số của {multipleOf}`,
            not: `Không nên hợp lệ theo mô hình trong "not"`,
            oneOf: `Nên phù hợp chính xác với một mô hình trong "oneOf"`,
            pattern: `Nên phù hợp với mẫu "{pattern}"`,
            uniqueItems: `Không nên có các mục trùng lặp (mục ## {j} và {i} giống nhau)`,
            custom: `Nên phù hợp với định dạng`,
            propertyNames: `Tên thuộc tính "{propertyName}" không hợp lệ`,
            patternRequired: `Nên có thuộc tính phù hợp với mẫu "{missingPattern}"`,
            switch: `Nên vượt qua việc xác nhận từ khóa "switch", trường hợp {caseIndex} thất bại`,
            const: `Nên bằng với hằng số`,
            contains: `Nên chứa một mục hợp lệ`,
            formatExclusiveMaximum: `formatExclusiveMaximum nên là boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum nên là boolean`,
            if: `Nên phù hợp với mô hình "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `Bỏ qua`,
        prev: `Trước`,
        next: `Tiếp`,
        done: `Hoàn thành`
    }
};

class DatePipe {
    constructor() {
        this.nzI18n = inject(NzI18nService);
        this.cog = inject(YunzaiConfigService).get('themePipe');
    }
    transform(value, formatString) {
        const formatStr = formatString ?? this.cog?.dateFormat ?? 'yyyy-MM-dd HH:mm';
        return formatDate(value, formatStr, {
            locale: this.nzI18n.getDateLocale(),
            customFormat: this.cog?.dateFormatCustom
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: DatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: DatePipe, isStandalone: true, name: "_date" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{ name: '_date', standalone: true }]
        }] });

/**
 * [Document](https://ng.yunzainfo.com/theme/keys)
 */
class KeysPipe {
    transform(value, keyIsNumber = false) {
        const ret = [];
        Object.keys(value).forEach(key => {
            ret.push({ key: keyIsNumber ? +key : key, value: value[key] });
        });
        return ret;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: KeysPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: KeysPipe, isStandalone: true, name: "keys" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: KeysPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'keys', standalone: true }]
        }] });

const ICON_YES = `<svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>`;
const ICON_NO = `<svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>`;
const CLS_YES = `class="yn__yes"`;
const CLS_NO = `class="yn__no"`;
function yn(value, opt) {
    let html = '';
    let { yes, no, mode } = { ...opt };
    yes = yes || '是';
    no = no || '否';
    switch (mode) {
        case 'full':
            html = value
                ? `<i ${CLS_YES}>${ICON_YES}<span>${yes}</span></i>`
                : `<i ${CLS_NO}>${ICON_NO}<span>${no}</span></i>`;
            break;
        case 'text':
            html = value ? `<i ${CLS_YES}>${yes}</i>` : `<i ${CLS_NO}>${no}</i>`;
            break;
        default:
            html = value ? `<i ${CLS_YES} title="${yes}">${ICON_YES}</i>` : `<i ${CLS_NO} title="${no}">${ICON_NO}</i>`;
            break;
    }
    return html;
}
class YNPipe {
    constructor() {
        this.dom = inject(DomSanitizer);
    }
    transform(value, yes, no, mode, isSafeHtml = true) {
        const html = yn(value, { yes, no, mode });
        return isSafeHtml ? this.dom.bypassSecurityTrustHtml(html) : html;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YNPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: YNPipe, isStandalone: true, name: "yn" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YNPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'yn', standalone: true }]
        }] });

class HTMLPipe {
    constructor() {
        this.dom = inject(DomSanitizer);
    }
    transform(html) {
        return html ? this.dom.bypassSecurityTrustHtml(html) : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: HTMLPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: HTMLPipe, isStandalone: true, name: "html" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: HTMLPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'html', standalone: true }]
        }] });

class URLPipe {
    constructor() {
        this.dom = inject(DomSanitizer);
    }
    transform(url) {
        return url ? this.dom.bypassSecurityTrustUrl(url) : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: URLPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: URLPipe, isStandalone: true, name: "url" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: URLPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'url', standalone: true }]
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

/* eslint-disable import/order */
// #region import
const HELPERS = [ModalHelper, DrawerHelper];
const PIPES = [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe];
// #endregion
class YunzaiThemeModule {
    constructor(iconSrv) {
        iconSrv.addIcon(...ICONS);
    }
    static forRoot() {
        return {
            ngModule: YunzaiThemeModule,
            providers: HELPERS
        };
    }
    static forChild() {
        return {
            ngModule: YunzaiThemeModule,
            providers: HELPERS
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiThemeModule, deps: [{ token: i1$1.NzIconService }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.6", ngImport: i0, type: YunzaiThemeModule, imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe], exports: [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe, YelonLocaleModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiThemeModule, providers: [YUNZAI_SETTING_DEFAULT], imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, YelonLocaleModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiThemeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, ...PIPES],
                    providers: [YUNZAI_SETTING_DEFAULT],
                    exports: [...PIPES, YelonLocaleModule]
                }]
        }], ctorParameters: () => [{ type: i1$1.NzIconService }] });

function provideYunzai(options) {
    const lang = options?.defaultLang;
    const provides = [
        { provide: YUNZAI_CONFIG, useValue: options?.config },
        { provide: YELON_LOCALE, useValue: lang?.yelon ?? zhCN },
        YELON_LOCALE_SERVICE_PROVIDER,
        importProvidersFrom([NzDrawerModule, NzModalModule]),
        YUNZAI_SETTING_DEFAULT
    ];
    if (lang) {
        registerLocaleData(lang.ng, lang.abbr);
        provides.push({ provide: LOCALE_ID, useValue: lang.abbr }, provideNzI18n(lang.zorro), {
            provide: NZ_DATE_LOCALE,
            useValue: lang.date
        });
    }
    const i18nCls = options?.i18nClass;
    if (i18nCls) {
        provides.push({ provide: YUNZAI_I18N_TOKEN, useClass: i18nCls, multi: false });
    }
    const icons = [...ICONS, ...(options.icons ?? [])];
    provides.push({
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useValue: () => {
            inject(NzIconService, { optional: true })?.addIcon(...icons);
        }
    });
    return makeEnvironmentProviders(provides);
}

/**
 * Optional pre-loading module, when it's necessary to load the resource at the first page load for some lazy routes, [example](https://github.com/hbyunzai/ng-yunzai/blob/master/src/app/routes/routes-routing.module.ts).
 *
 * 可选预加载模块，当需要对某些懒路由在第一次页面加载时也一并加载该资源时，[示例](https://github.com/hbyunzai/ng-yunzai/blob/master/src/app/routes/routes-routing.module.ts)。
 *
 * @example
 * {AT}NgModule({
 *  providers: [PreloadOptionalModules],
 *  imports: [
 *    RouterModule.forRoot([
 *      { path: '', loadChildren: null, data: { preload: true } }
 *    ], { preloadingStrategy: PreloadOptionalModules})]
 * })
 */
class PreloadOptionalModules {
    preload(route, fn) {
        return route.data?.preload === true ? fn().pipe(catchError(() => of(null))) : of(null);
    }
}

const VERSION = new Version('18.2.0');

/**
 * Generated bundle index. Do not edit.
 */

export { BaseApi, BaseHeaders, BaseUrl, Body, CUSTOM_ERROR, DELETE, DatePipe, DrawerHelper, FORM, GET, HEAD, HTMLPipe, HTML_DIR, Headers, I18nPipe, ICONS, IGNORE_BASE_URL, JSONP, KeysPipe, LTR, MenuService, ModalHelper, OPTIONS, PATCH, POST, PUT, Path, Payload, PreloadOptionalModules, Query, RAW_BODY, REP_MAX, RTL, RTLService, RTL_DIRECTION, RTL_NZ_COMPONENTS, RTL_YELON_COMPONENTS, ResponsiveService, SPAN_MAX, SettingsService, TitleService, URLPipe, VERSION, YELON_LOCALE, YELON_LOCALE_SERVICE_PROVIDER, YELON_LOCALE_SERVICE_PROVIDER_FACTORY, YNPipe, YUNZAI_I18N_TOKEN, YUNZAI_LANGS, YUNZAI_SETTING_DEFAULT, YUNZAI_SETTING_KEYS, YelonLocaleModule, YelonLocaleService, YunzaiHttpI18NService, YunzaiI18NGuardService, YunzaiI18NServiceFake, YunzaiI18nBaseService, YunzaiThemeModule, _HttpClient, yelonElGR as el_GR, yelonEnUS as en_US, yelonEsES as es_ES, yelonFrFR as fr_FR, yelonHrHR as hr_HR, yelonItIT as it_IT, jaJP as ja_JP, yelonKoKR as ko_KR, yelonPlPL as pl_PL, provideYunzai, yelonSlSI as sl_SI, stepPreloader, yelonTrTR as tr_TR, viVI as vi_VI, yn, yunzaiI18nCanActivate, yunzaiI18nCanActivateChild, zhCN as zh_CN, yelonZhTw as zh_TW };
//# sourceMappingURL=theme.mjs.map
