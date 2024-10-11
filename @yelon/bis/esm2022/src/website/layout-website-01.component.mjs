import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { YunzaiStartupService } from '../startup.service';
import { I18nPipe } from '@yelon/theme';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiLayoutWebsite01Component, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.6", type: YunzaiLayoutWebsite01Component, isStandalone: true, selector: "yunzai-layout-website-01", inputs: { logoSrc: "logoSrc", logoAlt: "logoAlt", slogan: "slogan", contentTpl: "contentTpl" }, ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzI18nModule }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i2.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiLayoutWebsite01Component, decorators: [{
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
                    changeDetection: ChangeDetectionStrategy.OnPush,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdlYnNpdGUtMDEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy93ZWJzaXRlL2xheW91dC13ZWJzaXRlLTAxLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUVMLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG1CQUFtQixFQUNwQixNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQXdEbEQsTUFBTSxPQUFPLDhCQUE4QjtJQXREM0M7UUF3RFcsWUFBTyxHQUFZLE1BQU0sQ0FBQztRQUMxQixXQUFNLEdBQVksRUFBRSxDQUFDO1FBR2IsaUJBQVksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4QyxrQkFBYSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVDLGVBQVUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxQyxRQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBNkN2QztJQTNDQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLE9BQU8sT0FBTyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3pELE9BQU8sY0FBYyxFQUFFLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLFlBQVksQ0FBQztRQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxPQUFPLHVCQUF1QixDQUFDO0lBQzdELENBQUM7SUFFRCxFQUFFLENBQUMsR0FBWTtRQUNiLElBQUksR0FBRztZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDeEMsQ0FBQzs4R0FyRFUsOEJBQThCO2tHQUE5Qiw4QkFBOEIsb0xBcEQvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ1QsNERBR1MsWUFBWSxzSkFBRSxRQUFRLDRDQUFFLFlBQVksOEJBQWUsZ0JBQWdCLDI3QkFBRSxZQUFZLGtOQUFFLGdCQUFnQjs7MkZBRWxHLDhCQUE4QjtrQkF0RDFDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStDVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2lCQUMvRzs4QkFFVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdGb3IsIE5nSWYsIE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgaW5qZWN0LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICdAeWVsb24vYXV0aCc7XG5pbXBvcnQgeyBZdW56YWlTdGFydHVwU2VydmljZSB9IGZyb20gJy4uL3N0YXJ0dXAuc2VydmljZSc7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICBZdW56YWlQcm9maWxlLFxuICB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbyxcbiAgdXNlTG9jYWxTdG9yYWdlVXNlcixcbiAgV0lORE9XLFxuICBZdW56YWlDb25maWdTZXJ2aWNlXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekkxOG5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXVuemFpLWxheW91dC13ZWJzaXRlLTAxJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDFcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1uYXZfX3VzZXJcIj5cbiAgICAgICAgQGlmIChpc0xvZ2luKSB7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbGlua1wiXG4gICAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgICAgW256RHJvcGRvd25NZW51XT1cIm1lbnVcIlxuICAgICAgICAgICAgW256T3ZlcmxheVN0eWxlXT1cInsgd2lkdGg6ICcxMjBweCcgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJ1c2VyXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L3NwYW4+e3sgX3VzZXJuYW1lIH19PHNwYW4gbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjbWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgICA8dWwgbnotbWVudSBuelNlbGVjdGFibGU+XG4gICAgICAgICAgICAgIEBmb3IgKGxpbmsgb2YgX2xpbmtzOyB0cmFjayAkaW5kZXgpIHtcbiAgICAgICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbGlua19fbGlcIiAoY2xpY2spPVwidG8obGluay51cmwpXCI+e3sgbGluay5uYW1lIH19PC9saT5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIG56RGFuZ2VyIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbGlua19fbGlcIiAoY2xpY2spPVwibG9nb3V0KClcIlxuICAgICAgICAgICAgICAgID57eyAnbWVudS5hY2NvdW50LmxvZ291dCcgfCBpMThuIH19XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgPGEgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1saW5rXCIgKGNsaWNrKT1cImxvZ2luKClcIj5cbiAgICAgICAgICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwibG9naW5cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvc3Bhbj57eyAnYXBwLmxvZ2luLmxvZ2luJyB8IGkxOG4gfX08L2FcbiAgICAgICAgICA+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aGVhZGVyIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbmF2XCI+XG4gICAgICAgIEBpZiAoX2xvZ29TcmMpIHtcbiAgICAgICAgICA8aW1nIFthbHRdPVwiX2xvZ29BbHRcIiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLW5hdl9fbG9nb1wiIFtzcmNdPVwiX2xvZ29TcmNcIiAvPlxuICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbmF2X19sb2dvX19mdWxsXCI+TE9HTzwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLW5hdl9fY29udGVudFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIl9jb250ZW50VHBsXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1uYXZfX3Nsb2dhblwiPlxuICAgICAgICAgIHt7IF9zbG9nYW4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxtYWluIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtY29udGFpbmVyXCI+XG4gICAgICAgIDxyb3V0ZXItb3V0bGV0IC8+XG4gICAgICA8L21haW4+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbUm91dGVyT3V0bGV0LCBJMThuUGlwZSwgTnpJMThuTW9kdWxlLCBOZ0ZvciwgTmdJZiwgTnpEcm9wRG93bk1vZHVsZSwgTnpJY29uTW9kdWxlLCBOZ1RlbXBsYXRlT3V0bGV0XVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlMYXlvdXRXZWJzaXRlMDFDb21wb25lbnQge1xuICBASW5wdXQoKSBsb2dvU3JjPzogc3RyaW5nIHwgTnpTYWZlQW55O1xuICBASW5wdXQoKSBsb2dvQWx0Pzogc3RyaW5nID0gJ2xvZ28nO1xuICBASW5wdXQoKSBzbG9nYW4/OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgY29udGVudFRwbD86IFRlbXBsYXRlUmVmPHZvaWQ+IHwgTnpTYWZlQW55O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgdG9rZW5TZXJ2aWNlID0gaW5qZWN0KFlBX1NFUlZJQ0VfVE9LRU4pO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1NlcnZpY2UgPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnR1cFNydiA9IGluamVjdChZdW56YWlTdGFydHVwU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgZ2V0IF9sb2dvU3JjKCk6IHN0cmluZyB8IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMubG9nb1NyYztcbiAgfVxuXG4gIGdldCBfbG9nb0FsdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvZ29BbHQgfHwgJ2xvZ28nO1xuICB9XG5cbiAgZ2V0IF9zbG9nYW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zbG9nYW4gfHwgJyc7XG4gIH1cblxuICBnZXQgX2NvbnRlbnRUcGwoKTogVGVtcGxhdGVSZWY8dm9pZD4gfCBOelNhZmVBbnkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRUcGw7XG4gIH1cblxuICBnZXQgX3VzZXJuYW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3QgW18sIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIHJldHVybiBnZXRVc2VyKCk/LnJlYWxuYW1lIHx8ICcnO1xuICB9XG5cbiAgZ2V0IGlzTG9naW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgW18sIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIHJldHVybiAhIXRoaXMudG9rZW5TZXJ2aWNlLmdldCgpPy5hY2Nlc3NfdG9rZW4gJiYgISFnZXRVc2VyKCk7XG4gIH1cblxuICBnZXQgX2xpbmtzKCk6IFl1bnphaVByb2ZpbGVbXSB7XG4gICAgY29uc3QgW18sIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgcmV0dXJuIGdldFByb2plY3RJbmZvKCk/LnByb2ZpbGVMaXN0IHx8IFtdO1xuICB9XG5cbiAgbG9naW4oKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydHVwU3J2LmxvYWQoeyBmb3JjZTogdHJ1ZSB9KS5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICB9XG5cbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdiaXMnKT8uYmFzZVVybCB8fCAnL2JhY2tzdGFnZSc7XG4gICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IGAke2Jhc2VVcmx9L2Nhcy1wcm94eS9hcHAvbG9nb3V0YDtcbiAgfVxuXG4gIHRvKHVybD86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh1cmwpIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cbn1cbiJdfQ==