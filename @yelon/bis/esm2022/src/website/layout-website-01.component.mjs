import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzI18nModule }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i2.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdlYnNpdGUtMDEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy93ZWJzaXRlL2xheW91dC13ZWJzaXRlLTAxLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUVMLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG1CQUFtQixFQUNwQixNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQXVEbEQsTUFBTSxPQUFPLDhCQUE4QjtJQXJEM0M7UUF1RFcsWUFBTyxHQUFZLE1BQU0sQ0FBQztRQUMxQixXQUFNLEdBQVksRUFBRSxDQUFDO1FBR2IsaUJBQVksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4QyxrQkFBYSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVDLGVBQVUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxQyxRQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBNkN2QztJQTNDQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLE9BQU8sT0FBTyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3pELE9BQU8sY0FBYyxFQUFFLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLFlBQVksQ0FBQztRQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxPQUFPLHVCQUF1QixDQUFDO0lBQzdELENBQUM7SUFFRCxFQUFFLENBQUMsR0FBWTtRQUNiLElBQUksR0FBRztZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDeEMsQ0FBQzs4R0FyRFUsOEJBQThCO2tHQUE5Qiw4QkFBOEIsb0xBbkQvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ1QsNERBRVMsWUFBWSxzSkFBRSxRQUFRLDRDQUFFLFlBQVksOEJBQWUsZ0JBQWdCLDI3QkFBRSxZQUFZLGtOQUFFLGdCQUFnQjs7MkZBRWxHLDhCQUE4QjtrQkFyRDFDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStDVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7aUJBQy9HOzhCQUVVLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ0ZvciwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIGluamVjdCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IFl1bnphaVN0YXJ0dXBTZXJ2aWNlIH0gZnJvbSAnLi4vc3RhcnR1cC5zZXJ2aWNlJztcbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIFl1bnphaVByb2ZpbGUsXG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBXSU5ET1csXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2Vcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktbGF5b3V0LXdlYnNpdGUtMDEnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLW5hdl9fdXNlclwiPlxuICAgICAgICBAaWYgKGlzTG9naW4pIHtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1saW5rXCJcbiAgICAgICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwibWVudVwiXG4gICAgICAgICAgICBbbnpPdmVybGF5U3R5bGVdPVwieyB3aWR0aDogJzEyMHB4JyB9XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBuei1pY29uIG56VHlwZT1cInVzZXJcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvc3Bhbj57eyBfdXNlcm5hbWUgfX08c3BhbiBuei1pY29uIG56VHlwZT1cImRvd25cIj48L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxuei1kcm9wZG93bi1tZW51ICNtZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgICAgIDx1bCBuei1tZW51IG56U2VsZWN0YWJsZT5cbiAgICAgICAgICAgICAgQGZvciAobGluayBvZiBfbGlua3M7IHRyYWNrICRpbmRleCkge1xuICAgICAgICAgICAgICAgIDxsaSBuei1tZW51LWl0ZW0gY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1saW5rX19saVwiIChjbGljayk9XCJ0byhsaW5rLnVybClcIj57eyBsaW5rLm5hbWUgfX08L2xpPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDxsaSBuei1tZW51LWl0ZW0gbnpEYW5nZXIgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1saW5rX19saVwiIChjbGljayk9XCJsb2dvdXQoKVwiXG4gICAgICAgICAgICAgICAgPnt7ICdtZW51LmFjY291bnQubG9nb3V0JyB8IGkxOG4gfX1cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICA8YSBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLWxpbmtcIiAoY2xpY2spPVwibG9naW4oKVwiPlxuICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJsb2dpblwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9zcGFuPnt7ICdhcHAubG9naW4ubG9naW4nIHwgaTE4biB9fTwvYVxuICAgICAgICAgID5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1uYXZcIj5cbiAgICAgICAgQGlmIChfbG9nb1NyYykge1xuICAgICAgICAgIDxpbWcgW2FsdF09XCJfbG9nb0FsdFwiIGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbmF2X19sb2dvXCIgW3NyY109XCJfbG9nb1NyY1wiIC8+XG4gICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1uYXZfX2xvZ29fX2Z1bGxcIj5MT0dPPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICA8ZGl2IGNsYXNzPVwieXotbGF5b3V0LXdlYnNpdGUtMDEtbmF2X19jb250ZW50XCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiX2NvbnRlbnRUcGxcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWxheW91dC13ZWJzaXRlLTAxLW5hdl9fc2xvZ2FuXCI+XG4gICAgICAgICAge3sgX3Nsb2dhbiB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPG1haW4gY2xhc3M9XCJ5ei1sYXlvdXQtd2Vic2l0ZS0wMS1jb250YWluZXJcIj5cbiAgICAgICAgPHJvdXRlci1vdXRsZXQgLz5cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1JvdXRlck91dGxldCwgSTE4blBpcGUsIE56STE4bk1vZHVsZSwgTmdGb3IsIE5nSWYsIE56RHJvcERvd25Nb2R1bGUsIE56SWNvbk1vZHVsZSwgTmdUZW1wbGF0ZU91dGxldF1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTGF5b3V0V2Vic2l0ZTAxQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbG9nb1NyYz86IHN0cmluZyB8IE56U2FmZUFueTtcbiAgQElucHV0KCkgbG9nb0FsdD86IHN0cmluZyA9ICdsb2dvJztcbiAgQElucHV0KCkgc2xvZ2FuPzogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGNvbnRlbnRUcGw/OiBUZW1wbGF0ZVJlZjx2b2lkPiB8IE56U2FmZUFueTtcblxuICBwcml2YXRlIHJlYWRvbmx5IHRva2VuU2VydmljZSA9IGluamVjdChZQV9TRVJWSUNFX1RPS0VOKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWdTZXJ2aWNlID0gaW5qZWN0KFl1bnphaUNvbmZpZ1NlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHN0YXJ0dXBTcnYgPSBpbmplY3QoWXVuemFpU3RhcnR1cFNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbiA9IGluamVjdChXSU5ET1cpO1xuXG4gIGdldCBfbG9nb1NyYygpOiBzdHJpbmcgfCBOelNhZmVBbnkge1xuICAgIHJldHVybiB0aGlzLmxvZ29TcmM7XG4gIH1cblxuICBnZXQgX2xvZ29BbHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2dvQWx0IHx8ICdsb2dvJztcbiAgfVxuXG4gIGdldCBfc2xvZ2FuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2xvZ2FuIHx8ICcnO1xuICB9XG5cbiAgZ2V0IF9jb250ZW50VHBsKCk6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgTnpTYWZlQW55IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHBsO1xuICB9XG5cbiAgZ2V0IF91c2VybmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IFtfLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICByZXR1cm4gZ2V0VXNlcigpPy5yZWFsbmFtZSB8fCAnJztcbiAgfVxuXG4gIGdldCBpc0xvZ2luKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IFtfLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICByZXR1cm4gISF0aGlzLnRva2VuU2VydmljZS5nZXQoKT8uYWNjZXNzX3Rva2VuICYmICEhZ2V0VXNlcigpO1xuICB9XG5cbiAgZ2V0IF9saW5rcygpOiBZdW56YWlQcm9maWxlW10ge1xuICAgIGNvbnN0IFtfLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIHJldHVybiBnZXRQcm9qZWN0SW5mbygpPy5wcm9maWxlTGlzdCB8fCBbXTtcbiAgfVxuXG4gIGxvZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnR1cFNydi5sb2FkKHsgZm9yY2U6IHRydWUgfSkuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgnYmlzJyk/LmJhc2VVcmwgfHwgJy9iYWNrc3RhZ2UnO1xuICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSBgJHtiYXNlVXJsfS9jYXMtcHJveHkvYXBwL2xvZ291dGA7XG4gIH1cblxuICB0byh1cmw/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodXJsKSB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9XG59XG4iXX0=