import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { I18nPipe } from '@yelon/theme';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { YunzaiStartupService } from '../startup.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/menu";
import * as i2 from "ng-zorro-antd/dropdown";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "ng-zorro-antd/avatar";
export class YunzaiLayoutWebsite02Component {
    constructor() {
        this.logoAlt = 'logo';
        this.userMenuShow = false;
        this.tokenService = inject(YA_SERVICE_TOKEN);
        this.configService = inject(YunzaiConfigService);
        this.startupSrv = inject(YunzaiStartupService);
        this.win = inject(WINDOW);
    }
    get _logoSrc() {
        return this.logoSrc;
    }
    get _logoAlt() {
        return this.logoAlt || 'logo';
    }
    get _userMenuShow() {
        return this.userMenuShow || false;
    }
    get _slogan() {
        return this.slogan;
    }
    get _contentTpl() {
        return this.contentTpl;
    }
    get _username() {
        const [_, getUser] = useLocalStorageUser();
        return getUser()?.realname || '';
    }
    get _avatar() {
        const [_, getUser] = useLocalStorageUser();
        const baseUrl = this.configService.get('bis')?.baseUrl || '/backstage';
        const avatarUrl = getUser()?.avatarId ? `${baseUrl}/filecenter/file/${getUser()?.avatarId}` : undefined;
        return avatarUrl;
    }
    get isLogin() {
        const [_, getUser] = useLocalStorageUser();
        return !!this.tokenService.get()?.access_token && !!getUser();
    }
    get _links() {
        const [_, getProjectInfo] = useLocalStorageProjectInfo();
        return getProjectInfo()?.profileList || [];
    }
    login() {
        this.startupSrv.load({ force: true }).subscribe(() => { });
    }
    logout() {
        const baseUrl = this.configService.get('bis')?.baseUrl || '/backstage';
        this.win.location.href = `${baseUrl}/cas-proxy/app/logout`;
    }
    to(url) {
        if (url)
            this.win.location.href = url;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiLayoutWebsite02Component, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.6", type: YunzaiLayoutWebsite02Component, isStandalone: true, selector: "yunzai-layout-website-02", inputs: { logoSrc: "logoSrc", logoAlt: "logoAlt", userMenuShow: "userMenuShow", slogan: "slogan", contentTpl: "contentTpl" }, ngImport: i0, template: `
    <div class="yz-layout-website-02">
      <header class="yz-layout-website-02-nav">
        <div class="yz-layout-website-02-inner-content">
          @if (_logoSrc) {
            <img [alt]="_logoAlt" class="yz-layout-website-02-nav__logo" [src]="_logoSrc" />
          } @else {
            <div class="yz-layout-website-02-nav__logo__full">LOGO</div>
          }

          <div class="yz-layout-website-02-nav__content">
            <ng-template *ngTemplateOutlet="_contentTpl" />
          </div>

          <div class="yz-layout-website-02-nav-right">
            <div class="yz-layout-website-02-nav__slogan">
              <ng-template *ngTemplateOutlet="_slogan" />
            </div>
            @if (isLogin) {
              <a
                class="yz-layout-website-02-link"
                nz-dropdown
                [nzDropdownMenu]="menu"
                [nzDisabled]="!_userMenuShow"
                [nzPlacement]="'bottomRight'"
              >
                <nz-avatar nzIcon="user" [nzSrc]="_avatar" /><b>欢迎访问：{{ _username }}</b>
                <span nz-icon nzType="down" *ngIf="_userMenuShow"></span>
              </a>
              <nz-dropdown-menu #menu="nzDropdownMenu">
                <ul nz-menu nzSelectable>
                  @for (link of _links; track $index) {
                    <li nz-menu-item class="yz-layout-website-02-link__li" (click)="to(link.url)">{{ link.name }}</li>
                  }
                  <li nz-menu-item nzDanger class="yz-layout-website-02-link__li" (click)="logout()">{{
                    'menu.account.logout' | i18n
                  }}</li>
                </ul>
              </nz-dropdown-menu>
            } @else {
              <a class="yz-layout-website-02-link" (click)="login()">
                <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
              >
            }
          </div>
        </div>
      </header>
      <main class="yz-layout-website-02-container">
        <router-outlet />
      </main>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzI18nModule }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i2.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i4.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiLayoutWebsite02Component, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-layout-website-02',
                    template: `
    <div class="yz-layout-website-02">
      <header class="yz-layout-website-02-nav">
        <div class="yz-layout-website-02-inner-content">
          @if (_logoSrc) {
            <img [alt]="_logoAlt" class="yz-layout-website-02-nav__logo" [src]="_logoSrc" />
          } @else {
            <div class="yz-layout-website-02-nav__logo__full">LOGO</div>
          }

          <div class="yz-layout-website-02-nav__content">
            <ng-template *ngTemplateOutlet="_contentTpl" />
          </div>

          <div class="yz-layout-website-02-nav-right">
            <div class="yz-layout-website-02-nav__slogan">
              <ng-template *ngTemplateOutlet="_slogan" />
            </div>
            @if (isLogin) {
              <a
                class="yz-layout-website-02-link"
                nz-dropdown
                [nzDropdownMenu]="menu"
                [nzDisabled]="!_userMenuShow"
                [nzPlacement]="'bottomRight'"
              >
                <nz-avatar nzIcon="user" [nzSrc]="_avatar" /><b>欢迎访问：{{ _username }}</b>
                <span nz-icon nzType="down" *ngIf="_userMenuShow"></span>
              </a>
              <nz-dropdown-menu #menu="nzDropdownMenu">
                <ul nz-menu nzSelectable>
                  @for (link of _links; track $index) {
                    <li nz-menu-item class="yz-layout-website-02-link__li" (click)="to(link.url)">{{ link.name }}</li>
                  }
                  <li nz-menu-item nzDanger class="yz-layout-website-02-link__li" (click)="logout()">{{
                    'menu.account.logout' | i18n
                  }}</li>
                </ul>
              </nz-dropdown-menu>
            } @else {
              <a class="yz-layout-website-02-link" (click)="login()">
                <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
              >
            }
          </div>
        </div>
      </header>
      <main class="yz-layout-website-02-container">
        <router-outlet />
      </main>
    </div>
  `,
                    standalone: true,
                    imports: [
                        RouterOutlet,
                        I18nPipe,
                        NzI18nModule,
                        NgFor,
                        NgIf,
                        NzDropDownModule,
                        NzIconModule,
                        NgTemplateOutlet,
                        NzAvatarModule
                    ]
                }]
        }], propDecorators: { logoSrc: [{
                type: Input
            }], logoAlt: [{
                type: Input
            }], userMenuShow: [{
                type: Input
            }], slogan: [{
                type: Input
            }], contentTpl: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdlYnNpdGUtMDIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy93ZWJzaXRlL2xheW91dC13ZWJzaXRlLTAyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUNMLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG1CQUFtQixFQUVwQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBcUUxRCxNQUFNLE9BQU8sOEJBQThCO0lBbkUzQztRQXFFVyxZQUFPLEdBQVksTUFBTSxDQUFDO1FBQzFCLGlCQUFZLEdBQWEsS0FBSyxDQUFDO1FBSXZCLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENB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LFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixRQUFRO3dCQUNSLFlBQVk7d0JBQ1osS0FBSzt3QkFDTCxJQUFJO3dCQUNKLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGNBQWM7cUJBQ2Y7aUJBQ0Y7OEJBRVUsT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdGb3IsIE5nSWYsIE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBpbmplY3QsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBXSU5ET1csXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIFl1bnphaVByb2ZpbGVcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpBdmF0YXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2F2YXRhcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IFl1bnphaVN0YXJ0dXBTZXJ2aWNlIH0gZnJvbSAnLi4vc3RhcnR1cC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXVuemFpLWxheW91dC13ZWJzaXRlLTAyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDJcIj5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1uYXZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLWlubmVyLWNvbnRlbnRcIj5cbiAgICAgICAgICBAaWYgKF9sb2dvU3JjKSB7XG4gICAgICAgICAgICA8aW1nIFthbHRdPVwiX2xvZ29BbHRcIiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLW5hdl9fbG9nb1wiIFtzcmNdPVwiX2xvZ29TcmNcIiAvPlxuICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLW5hdl9fbG9nb19fZnVsbFwiPkxPR088L2Rpdj5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbmF2X19jb250ZW50XCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJfY29udGVudFRwbFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbmF2LXJpZ2h0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbmF2X19zbG9nYW5cIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiX3Nsb2dhblwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIEBpZiAoaXNMb2dpbikge1xuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbGlua1wiXG4gICAgICAgICAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwibWVudVwiXG4gICAgICAgICAgICAgICAgW256RGlzYWJsZWRdPVwiIV91c2VyTWVudVNob3dcIlxuICAgICAgICAgICAgICAgIFtuelBsYWNlbWVudF09XCInYm90dG9tUmlnaHQnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuei1hdmF0YXIgbnpJY29uPVwidXNlclwiIFtuelNyY109XCJfYXZhdGFyXCIgLz48Yj7mrKLov47orr/pl67vvJp7eyBfdXNlcm5hbWUgfX08L2I+XG4gICAgICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJkb3duXCIgKm5nSWY9XCJfdXNlck1lbnVTaG93XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDxuei1kcm9wZG93bi1tZW51ICNtZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgICAgICAgICA8dWwgbnotbWVudSBuelNlbGVjdGFibGU+XG4gICAgICAgICAgICAgICAgICBAZm9yIChsaW5rIG9mIF9saW5rczsgdHJhY2sgJGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIDxsaSBuei1tZW51LWl0ZW0gY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1saW5rX19saVwiIChjbGljayk9XCJ0byhsaW5rLnVybClcIj57eyBsaW5rLm5hbWUgfX08L2xpPlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSBuekRhbmdlciBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLWxpbmtfX2xpXCIgKGNsaWNrKT1cImxvZ291dCgpXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgJ21lbnUuYWNjb3VudC5sb2dvdXQnIHwgaTE4blxuICAgICAgICAgICAgICAgICAgfX08L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgICA8YSBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLWxpbmtcIiAoY2xpY2spPVwibG9naW4oKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwibG9naW5cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvc3Bhbj57eyAnYXBwLmxvZ2luLmxvZ2luJyB8IGkxOG4gfX08L2FcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPG1haW4gY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1jb250YWluZXJcIj5cbiAgICAgICAgPHJvdXRlci1vdXRsZXQgLz5cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck91dGxldCxcbiAgICBJMThuUGlwZSxcbiAgICBOekkxOG5Nb2R1bGUsXG4gICAgTmdGb3IsXG4gICAgTmdJZixcbiAgICBOekRyb3BEb3duTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOZ1RlbXBsYXRlT3V0bGV0LFxuICAgIE56QXZhdGFyTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTGF5b3V0V2Vic2l0ZTAyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbG9nb1NyYz86IHN0cmluZyB8IE56U2FmZUFueTtcbiAgQElucHV0KCkgbG9nb0FsdD86IHN0cmluZyA9ICdsb2dvJztcbiAgQElucHV0KCkgdXNlck1lbnVTaG93PzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzbG9nYW4/OiBUZW1wbGF0ZVJlZjx2b2lkPiB8IE56U2FmZUFueTtcbiAgQElucHV0KCkgY29udGVudFRwbD86IFRlbXBsYXRlUmVmPHZvaWQ+IHwgTnpTYWZlQW55O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgdG9rZW5TZXJ2aWNlID0gaW5qZWN0KFlBX1NFUlZJQ0VfVE9LRU4pO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1NlcnZpY2UgPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnR1cFNydiA9IGluamVjdChZdW56YWlTdGFydHVwU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgZ2V0IF9sb2dvU3JjKCk6IHN0cmluZyB8IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMubG9nb1NyYztcbiAgfVxuXG4gIGdldCBfbG9nb0FsdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvZ29BbHQgfHwgJ2xvZ28nO1xuICB9XG5cbiAgZ2V0IF91c2VyTWVudVNob3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlck1lbnVTaG93IHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IF9zbG9nYW4oKTogVGVtcGxhdGVSZWY8dm9pZD4gfCBOelNhZmVBbnkge1xuICAgIHJldHVybiB0aGlzLnNsb2dhbjtcbiAgfVxuXG4gIGdldCBfY29udGVudFRwbCgpOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFRwbDtcbiAgfVxuXG4gIGdldCBfdXNlcm5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBbXywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgcmV0dXJuIGdldFVzZXIoKT8ucmVhbG5hbWUgfHwgJyc7XG4gIH1cblxuICBnZXQgX2F2YXRhcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IFtfLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCBiYXNlVXJsOiBzdHJpbmcgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdiaXMnKT8uYmFzZVVybCB8fCAnL2JhY2tzdGFnZSc7XG4gICAgY29uc3QgYXZhdGFyVXJsID0gZ2V0VXNlcigpPy5hdmF0YXJJZCA/IGAke2Jhc2VVcmx9L2ZpbGVjZW50ZXIvZmlsZS8ke2dldFVzZXIoKT8uYXZhdGFySWR9YCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYXZhdGFyVXJsO1xuICB9XG5cbiAgZ2V0IGlzTG9naW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgW18sIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIHJldHVybiAhIXRoaXMudG9rZW5TZXJ2aWNlLmdldCgpPy5hY2Nlc3NfdG9rZW4gJiYgISFnZXRVc2VyKCk7XG4gIH1cblxuICBnZXQgX2xpbmtzKCk6IFl1bnphaVByb2ZpbGVbXSB7XG4gICAgY29uc3QgW18sIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgcmV0dXJuIGdldFByb2plY3RJbmZvKCk/LnByb2ZpbGVMaXN0IHx8IFtdO1xuICB9XG5cbiAgbG9naW4oKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydHVwU3J2LmxvYWQoeyBmb3JjZTogdHJ1ZSB9KS5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICB9XG5cbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdiaXMnKT8uYmFzZVVybCB8fCAnL2JhY2tzdGFnZSc7XG4gICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IGAke2Jhc2VVcmx9L2Nhcy1wcm94eS9hcHAvbG9nb3V0YDtcbiAgfVxuXG4gIHRvKHVybD86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh1cmwpIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cbn1cbiJdfQ==