import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { I18nPipe } from '@yelon/theme';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { YunzaiStartupService } from '../startup.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/menu";
import * as i2 from "ng-zorro-antd/dropdown";
import * as i3 from "ng-zorro-antd/icon";
export class YunzaiLayoutWebsite01Component {
    constructor() {
        this.logoAlt = 'logo';
        this.slogan = '';
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
    get _slogan() {
        return this.slogan || '';
    }
    get _contentTpl() {
        return this.contentTpl;
    }
    get _username() {
        const [_, getUser] = useLocalStorageUser();
        return getUser()?.realname || '';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiLayoutWebsite01Component, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.11", type: YunzaiLayoutWebsite01Component, isStandalone: true, selector: "yunzai-layout-website-01", inputs: { logoSrc: "logoSrc", logoAlt: "logoAlt", slogan: "slogan", contentTpl: "contentTpl" }, ngImport: i0, template: `
    <div class="yz-layout-website-01">
      <div class="yz-layout-website-01-nav__user">
        @if (isLogin) {
          <a
            class="yz-layout-website-01-link"
            nz-dropdown
            [nzDropdownMenu]="menu"
            [nzOverlayStyle]="{ width: '120px' }"
          >
            <span nz-icon nzType="user" nzTheme="outline"></span>{{ _username }}<span nz-icon nzType="down"></span>
          </a>
          <nz-dropdown-menu #menu="nzDropdownMenu">
            <ul nz-menu nzSelectable>
              @for (link of _links; track $index) {
                <li nz-menu-item class="yz-layout-website-01-link__li" (click)="to(link.url)">{{ link.name }}</li>
              }
              <li nz-menu-item nzDanger class="yz-layout-website-01-link__li" (click)="logout()"
                >{{ 'menu.account.logout' | i18n }}
              </li>
            </ul>
          </nz-dropdown-menu>
        } @else {
          <a class="yz-layout-website-01-link" (click)="login()">
            <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
          >
        }
      </div>

      <header class="yz-layout-website-01-nav">
        @if (_logoSrc) {
          <img [alt]="_logoAlt" class="yz-layout-website-01-nav__logo" [src]="_logoSrc" />
        } @else {
          <div class="yz-layout-website-01-nav__logo__full">LOGO</div>
        }

        <div class="yz-layout-website-01-nav__content">
          <ng-template *ngTemplateOutlet="_contentTpl" />
        </div>
        <div class="yz-layout-website-01-nav__slogan">
          {{ _slogan }}
        </div>
      </header>
      <main class="yz-layout-website-01-container">
        <router-outlet />
      </main>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzI18nModule }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i2.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiLayoutWebsite01Component, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-layout-website-01',
                    template: `
    <div class="yz-layout-website-01">
      <div class="yz-layout-website-01-nav__user">
        @if (isLogin) {
          <a
            class="yz-layout-website-01-link"
            nz-dropdown
            [nzDropdownMenu]="menu"
            [nzOverlayStyle]="{ width: '120px' }"
          >
            <span nz-icon nzType="user" nzTheme="outline"></span>{{ _username }}<span nz-icon nzType="down"></span>
          </a>
          <nz-dropdown-menu #menu="nzDropdownMenu">
            <ul nz-menu nzSelectable>
              @for (link of _links; track $index) {
                <li nz-menu-item class="yz-layout-website-01-link__li" (click)="to(link.url)">{{ link.name }}</li>
              }
              <li nz-menu-item nzDanger class="yz-layout-website-01-link__li" (click)="logout()"
                >{{ 'menu.account.logout' | i18n }}
              </li>
            </ul>
          </nz-dropdown-menu>
        } @else {
          <a class="yz-layout-website-01-link" (click)="login()">
            <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
          >
        }
      </div>

      <header class="yz-layout-website-01-nav">
        @if (_logoSrc) {
          <img [alt]="_logoAlt" class="yz-layout-website-01-nav__logo" [src]="_logoSrc" />
        } @else {
          <div class="yz-layout-website-01-nav__logo__full">LOGO</div>
        }

        <div class="yz-layout-website-01-nav__content">
          <ng-template *ngTemplateOutlet="_contentTpl" />
        </div>
        <div class="yz-layout-website-01-nav__slogan">
          {{ _slogan }}
        </div>
      </header>
      <main class="yz-layout-website-01-container">
        <router-outlet />
      </main>
    </div>
  `,
                    standalone: true,
                    imports: [RouterOutlet, I18nPipe, NzI18nModule, NgFor, NgIf, NzDropDownModule, NzIconModule, NgTemplateOutlet]
                }]
        }], propDecorators: { logoSrc: [{
                type: Input
            }], logoAlt: [{
                type: Input
            }], slogan: [{
                type: Input
            }], contentTpl: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdlYnNpdGUtMDEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy93ZWJzaXRlL2xheW91dC13ZWJzaXRlLTAxLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUVMLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG1CQUFtQixFQUNwQixNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQXVEMUQsTUFBTSxPQUFPLDhCQUE4QjtJQXJEM0M7UUF1RFcsWUFBTyxHQUFZLE1BQU0sQ0FBQztRQUMxQixXQUFNLEdBQVksRUFBRSxDQUFDO1FBR2IsaUJBQVksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4QyxrQkFBYSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVDLGVBQVUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxQyxRQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBNkN2QztJQTNDQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLE9BQU8sT0FBTyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3pELE9BQU8sY0FBYyxFQUFFLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLFlBQVksQ0FBQztRQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxPQUFPLHVCQUF1QixDQUFDO0lBQzdELENBQUM7SUFFRCxFQUFFLENBQUMsR0FBWTtRQUNiLElBQUksR0FBRztZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDeEMsQ0FBQzsrR0FyRFUsOEJBQThCO21HQUE5Qiw4QkFBOEIsb0xBbkQvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ1QsNERBRVMsWUFBWSxzSkFBRSxRQUFRLDRDQUFFLFlBQVksOEJBQWUsZ0JBQWdCLDI3QkFBRSxZQUFZLGtOQUFFLGdCQUFnQjs7NEZBRWxHLDhCQUE4QjtrQkFyRDFDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStDVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7aUJBQy9HOzhCQUVVLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ0ZvciwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIGluamVjdCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOIH0gZnJvbSAnQHllbG9uL2F1dGgnO1xuaW1wb3J0IHsgSTE4blBpcGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtcbiAgWXVuemFpUHJvZmlsZSxcbiAgdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8sXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQ29uZmlnU2VydmljZVxufSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IFl1bnphaVN0YXJ0dXBTZXJ2aWNlIH0gZnJvbSAnLi4vc3RhcnR1cC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXVuemFpLWxheW91dC13ZWJzaXRlLTAxJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDFcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1uYXZfX3VzZXJcIj5cbiAgICAgICAgQGlmIChpc0xvZ2luKSB7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbGlua1wiXG4gICAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgICAgW256RHJvcGRvd25NZW51XT1cIm1lbnVcIlxuICAgICAgICAgICAgW256T3ZlcmxheVN0eWxlXT1cInsgd2lkdGg6ICcxMjBweCcgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJ1c2VyXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L3NwYW4+e3sgX3VzZXJuYW1lIH19PHNwYW4gbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjbWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgICA8dWwgbnotbWVudSBuelNlbGVjdGFibGU+XG4gICAgICAgICAgICAgIEBmb3IgKGxpbmsgb2YgX2xpbmtzOyB0cmFjayAkaW5kZXgpIHtcbiAgICAgICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbGlua19fbGlcIiAoY2xpY2spPVwidG8obGluay51cmwpXCI+e3sgbGluay5uYW1lIH19PC9saT5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIG56RGFuZ2VyIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbGlua19fbGlcIiAoY2xpY2spPVwibG9nb3V0KClcIlxuICAgICAgICAgICAgICAgID57eyAnbWVudS5hY2NvdW50LmxvZ291dCcgfCBpMThuIH19XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgPGEgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1saW5rXCIgKGNsaWNrKT1cImxvZ2luKClcIj5cbiAgICAgICAgICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwibG9naW5cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvc3Bhbj57eyAnYXBwLmxvZ2luLmxvZ2luJyB8IGkxOG4gfX08L2FcbiAgICAgICAgICA+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aGVhZGVyIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbmF2XCI+XG4gICAgICAgIEBpZiAoX2xvZ29TcmMpIHtcbiAgICAgICAgICA8aW1nIFthbHRdPVwiX2xvZ29BbHRcIiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLW5hdl9fbG9nb1wiIFtzcmNdPVwiX2xvZ29TcmNcIiAvPlxuICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbmF2X19sb2dvX19mdWxsXCI+TE9HTzwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLW5hdl9fY29udGVudFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIl9jb250ZW50VHBsXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1uYXZfX3Nsb2dhblwiPlxuICAgICAgICAgIHt7IF9zbG9nYW4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxtYWluIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtY29udGFpbmVyXCI+XG4gICAgICAgIDxyb3V0ZXItb3V0bGV0IC8+XG4gICAgICA8L21haW4+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtSb3V0ZXJPdXRsZXQsIEkxOG5QaXBlLCBOekkxOG5Nb2R1bGUsIE5nRm9yLCBOZ0lmLCBOekRyb3BEb3duTW9kdWxlLCBOekljb25Nb2R1bGUsIE5nVGVtcGxhdGVPdXRsZXRdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dFdlYnNpdGUwMUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxvZ29TcmM/OiBzdHJpbmcgfCBOelNhZmVBbnk7XG4gIEBJbnB1dCgpIGxvZ29BbHQ/OiBzdHJpbmcgPSAnbG9nbyc7XG4gIEBJbnB1dCgpIHNsb2dhbj86IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBjb250ZW50VHBsPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBOelNhZmVBbnk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSB0b2tlblNlcnZpY2UgPSBpbmplY3QoWUFfU0VSVklDRV9UT0tFTik7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnU2VydmljZSA9IGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFydHVwU3J2ID0gaW5qZWN0KFl1bnphaVN0YXJ0dXBTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW4gPSBpbmplY3QoV0lORE9XKTtcblxuICBnZXQgX2xvZ29TcmMoKTogc3RyaW5nIHwgTnpTYWZlQW55IHtcbiAgICByZXR1cm4gdGhpcy5sb2dvU3JjO1xuICB9XG5cbiAgZ2V0IF9sb2dvQWx0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9nb0FsdCB8fCAnbG9nbyc7XG4gIH1cblxuICBnZXQgX3Nsb2dhbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNsb2dhbiB8fCAnJztcbiAgfVxuXG4gIGdldCBfY29udGVudFRwbCgpOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFRwbDtcbiAgfVxuXG4gIGdldCBfdXNlcm5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBbXywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgcmV0dXJuIGdldFVzZXIoKT8ucmVhbG5hbWUgfHwgJyc7XG4gIH1cblxuICBnZXQgaXNMb2dpbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBbXywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgcmV0dXJuICEhdGhpcy50b2tlblNlcnZpY2UuZ2V0KCk/LmFjY2Vzc190b2tlbiAmJiAhIWdldFVzZXIoKTtcbiAgfVxuXG4gIGdldCBfbGlua3MoKTogWXVuemFpUHJvZmlsZVtdIHtcbiAgICBjb25zdCBbXywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICByZXR1cm4gZ2V0UHJvamVjdEluZm8oKT8ucHJvZmlsZUxpc3QgfHwgW107XG4gIH1cblxuICBsb2dpbigpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0dXBTcnYubG9hZCh7IGZvcmNlOiB0cnVlIH0pLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVVybCA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoJ2JpcycpPy5iYXNlVXJsIHx8ICcvYmFja3N0YWdlJztcbiAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gYCR7YmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICB9XG5cbiAgdG8odXJsPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHVybCkgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxufVxuIl19