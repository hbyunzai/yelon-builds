import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { environment } from '@env/environment';
import { TitleService, VERSION as VERSION_YUNZAI, stepPreloader } from '@yelon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
  host: {
    '[attr.ng-yunzai-version]': 'ngYunzaiVersion',
    '[attr.ng-zorro-version]': 'ngZorroVersion'
  }
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly titleSrv = inject(TitleService);
  private readonly modalSrv = inject(NzModalService);
  ngYunzaiVersion = VERSION_YUNZAI.full;
  ngZorroVersion = VERSION_ZORRO.full;

  private donePreloader = stepPreloader();

  ngOnInit(): void {
    let configLoad = false;
    this.router.events.subscribe(ev => {
      if (ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }
      if (configLoad && ev instanceof NavigationError) {
        this.modalSrv.confirm({
          nzTitle: `提醒`,
          nzContent: environment.production ? `应用可能已发布新版本，请点击刷新才能生效。` : `无法加载路由：${ev.url}`,
          nzCancelDisabled: false,
          nzOkText: '刷新',
          nzCancelText: '忽略',
          nzOnOk: () => location.reload()
        });
      }
      if (ev instanceof NavigationEnd) {
        this.donePreloader();
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      }
    });
  }
}
