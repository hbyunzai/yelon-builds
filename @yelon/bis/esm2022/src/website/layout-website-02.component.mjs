import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { YunzaiStartupService } from '../startup.service';
import { I18nPipe } from '@yelon/theme';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdlYnNpdGUtMDIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy93ZWJzaXRlL2xheW91dC13ZWJzaXRlLTAyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUNMLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG1CQUFtQixFQUVwQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBcUVsRCxNQUFNLE9BQU8sOEJBQThCO0lBbkUzQztRQXFFVyxZQUFPLEdBQVksTUFBTSxDQUFDO1FBQzFCLGlCQUFZLEdBQWEsS0FBSyxDQUFDO1FBSXZCLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENB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LFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixRQUFRO3dCQUNSLFlBQVk7d0JBQ1osS0FBSzt3QkFDTCxJQUFJO3dCQUNKLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGNBQWM7cUJBQ2Y7aUJBQ0Y7OEJBRVUsT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdGb3IsIE5nSWYsIE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBpbmplY3QsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICdAeWVsb24vYXV0aCc7XG5pbXBvcnQgeyBZdW56YWlTdGFydHVwU2VydmljZSB9IGZyb20gJy4uL3N0YXJ0dXAuc2VydmljZSc7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbyxcbiAgdXNlTG9jYWxTdG9yYWdlVXNlcixcbiAgV0lORE9XLFxuICBZdW56YWlDb25maWdTZXJ2aWNlLFxuICBZdW56YWlQcm9maWxlXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56QXZhdGFyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9hdmF0YXInO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktbGF5b3V0LXdlYnNpdGUtMDInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMlwiPlxuICAgICAgPGhlYWRlciBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLW5hdlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItaW5uZXItY29udGVudFwiPlxuICAgICAgICAgIEBpZiAoX2xvZ29TcmMpIHtcbiAgICAgICAgICAgIDxpbWcgW2FsdF09XCJfbG9nb0FsdFwiIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbmF2X19sb2dvXCIgW3NyY109XCJfbG9nb1NyY1wiIC8+XG4gICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbmF2X19sb2dvX19mdWxsXCI+TE9HTzwvZGl2PlxuICAgICAgICAgIH1cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1uYXZfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIl9jb250ZW50VHBsXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1uYXYtcmlnaHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1uYXZfX3Nsb2dhblwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJfc2xvZ2FuXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgQGlmIChpc0xvZ2luKSB7XG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMi1saW5rXCJcbiAgICAgICAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJtZW51XCJcbiAgICAgICAgICAgICAgICBbbnpEaXNhYmxlZF09XCIhX3VzZXJNZW51U2hvd1wiXG4gICAgICAgICAgICAgICAgW256UGxhY2VtZW50XT1cIidib3R0b21SaWdodCdcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG56LWF2YXRhciBuekljb249XCJ1c2VyXCIgW256U3JjXT1cIl9hdmF0YXJcIiAvPjxiPuasoui/juiuv+mXru+8mnt7IF91c2VybmFtZSB9fTwvYj5cbiAgICAgICAgICAgICAgICA8c3BhbiBuei1pY29uIG56VHlwZT1cImRvd25cIiAqbmdJZj1cIl91c2VyTWVudVNob3dcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI21lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgICAgICAgIDx1bCBuei1tZW51IG56U2VsZWN0YWJsZT5cbiAgICAgICAgICAgICAgICAgIEBmb3IgKGxpbmsgb2YgX2xpbmtzOyB0cmFjayAkaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLWxpbmtfX2xpXCIgKGNsaWNrKT1cInRvKGxpbmsudXJsKVwiPnt7IGxpbmsubmFtZSB9fTwvbGk+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIG56RGFuZ2VyIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbGlua19fbGlcIiAoY2xpY2spPVwibG9nb3V0KClcIj57e1xuICAgICAgICAgICAgICAgICAgICAnbWVudS5hY2NvdW50LmxvZ291dCcgfCBpMThuXG4gICAgICAgICAgICAgICAgICB9fTwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDItbGlua1wiIChjbGljayk9XCJsb2dpbigpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJsb2dpblwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9zcGFuPnt7ICdhcHAubG9naW4ubG9naW4nIHwgaTE4biB9fTwvYVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8bWFpbiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAyLWNvbnRhaW5lclwiPlxuICAgICAgICA8cm91dGVyLW91dGxldCAvPlxuICAgICAgPC9tYWluPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyT3V0bGV0LFxuICAgIEkxOG5QaXBlLFxuICAgIE56STE4bk1vZHVsZSxcbiAgICBOZ0ZvcixcbiAgICBOZ0lmLFxuICAgIE56RHJvcERvd25Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE5nVGVtcGxhdGVPdXRsZXQsXG4gICAgTnpBdmF0YXJNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlMYXlvdXRXZWJzaXRlMDJDb21wb25lbnQge1xuICBASW5wdXQoKSBsb2dvU3JjPzogc3RyaW5nIHwgTnpTYWZlQW55O1xuICBASW5wdXQoKSBsb2dvQWx0Pzogc3RyaW5nID0gJ2xvZ28nO1xuICBASW5wdXQoKSB1c2VyTWVudVNob3c/OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNsb2dhbj86IFRlbXBsYXRlUmVmPHZvaWQ+IHwgTnpTYWZlQW55O1xuICBASW5wdXQoKSBjb250ZW50VHBsPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBOelNhZmVBbnk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSB0b2tlblNlcnZpY2UgPSBpbmplY3QoWUFfU0VSVklDRV9UT0tFTik7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnU2VydmljZSA9IGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFydHVwU3J2ID0gaW5qZWN0KFl1bnphaVN0YXJ0dXBTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW4gPSBpbmplY3QoV0lORE9XKTtcblxuICBnZXQgX2xvZ29TcmMoKTogc3RyaW5nIHwgTnpTYWZlQW55IHtcbiAgICByZXR1cm4gdGhpcy5sb2dvU3JjO1xuICB9XG5cbiAgZ2V0IF9sb2dvQWx0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9nb0FsdCB8fCAnbG9nbyc7XG4gIH1cblxuICBnZXQgX3VzZXJNZW51U2hvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyTWVudVNob3cgfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgX3Nsb2dhbigpOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMuc2xvZ2FuO1xuICB9XG5cbiAgZ2V0IF9jb250ZW50VHBsKCk6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgTnpTYWZlQW55IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHBsO1xuICB9XG5cbiAgZ2V0IF91c2VybmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IFtfLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICByZXR1cm4gZ2V0VXNlcigpPy5yZWFsbmFtZSB8fCAnJztcbiAgfVxuXG4gIGdldCBfYXZhdGFyKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgW18sIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGNvbnN0IGJhc2VVcmw6IHN0cmluZyA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ2JpcycpPy5iYXNlVXJsIHx8ICcvYmFja3N0YWdlJztcbiAgICBjb25zdCBhdmF0YXJVcmwgPSBnZXRVc2VyKCk/LmF2YXRhcklkID8gYCR7YmFzZVVybH0vZmlsZWNlbnRlci9maWxlLyR7Z2V0VXNlcigpPy5hdmF0YXJJZH1gIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBhdmF0YXJVcmw7XG4gIH1cblxuICBnZXQgaXNMb2dpbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBbXywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgcmV0dXJuICEhdGhpcy50b2tlblNlcnZpY2UuZ2V0KCk/LmFjY2Vzc190b2tlbiAmJiAhIWdldFVzZXIoKTtcbiAgfVxuXG4gIGdldCBfbGlua3MoKTogWXVuemFpUHJvZmlsZVtdIHtcbiAgICBjb25zdCBbXywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICByZXR1cm4gZ2V0UHJvamVjdEluZm8oKT8ucHJvZmlsZUxpc3QgfHwgW107XG4gIH1cblxuICBsb2dpbigpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0dXBTcnYubG9hZCh7IGZvcmNlOiB0cnVlIH0pLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVVybCA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ2JpcycpPy5iYXNlVXJsIHx8ICcvYmFja3N0YWdlJztcbiAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gYCR7YmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICB9XG5cbiAgdG8odXJsPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHVybCkgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxufVxuIl19