import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CacheService } from '@yelon/cache';
import { YzStompService } from './yz.stomp.service';
export class YzLayoutBasicComponent {
    constructor(cacheService, yzStompService) {
        this.cacheService = cacheService;
        this.yzStompService = yzStompService;
        this.options = {
            logoExpanded: `./assets/logo-full.svg`,
            logoCollapsed: `./assets/logo.svg`
        };
        this.intro = '';
        this.text = '';
        this.icon = '';
    }
    ngOnInit() {
        const current = this.cacheService.get('_yz_current', { mode: 'none' });
        const project = this.cacheService.get('_yz_project_info', { mode: 'none' });
        this.text = current.text ? current.text : '应用名称';
        this.intro = current.intro ? current.intro : '应用描述';
        this.icon = current.icon ? current.icon : `./assets/tmp/img/avatar.jpg`;
        this.options.logoExpanded = project.maxLogoUrl ? project.maxLogoUrl : `./assets/logo-full.svg`;
        this.options.logoCollapsed = project.miniLogoUrl ? project.miniLogoUrl : `./assets/logo.svg`;
        this.yzStompService.listen();
    }
    ngOnDestroy() {
        this.yzStompService.unListen();
    }
}
YzLayoutBasicComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-layout-basic',
                template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="contentTpl">
      <layout-default-header-item direction="left">
        <yz-header-application></yz-header-application>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <yz-header-notify></yz-header-notify>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <yz-header-theme-btn></yz-header-theme-btn>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <div
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
            <div nz-menu-item>
              <yz-header-fullscreen></yz-header-fullscreen>
            </div>
            <div nz-menu-item>
              <yz-header-clear-storage></yz-header-clear-storage>
            </div>
            <div nz-menu-item>
              <yz-header-i18n></yz-header-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yz-header-user></yz-header-user>
      </layout-default-header-item>
      <ng-template #asideUserTpl>
        <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="yunzai-default__aside-user">
          <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="icon"></nz-avatar>
          <div class="yunzai-default__aside-user-info">
            <strong>{{ text }}</strong>
            <p class="mb0">{{ intro }}</p>
          </div>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/">{{ 'menu.backtohome' | i18n }}</li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>
      <ng-template #contentTpl>
        <reuse-tab #reuseTab></reuse-tab>
        <router-outlet (activate)="reuseTab.activate($event)"></router-outlet>
      </ng-template>
    </layout-default>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzLayoutBasicComponent.ctorParameters = () => [
    { type: CacheService },
    { type: YzStompService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYmFzaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5iYXNpYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFJdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUc1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFtRXBELE1BQU0sT0FBTyxzQkFBc0I7SUFVakMsWUFBb0IsWUFBMEIsRUFBVSxjQUE4QjtRQUFsRSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVR0RixZQUFPLEdBQXlCO1lBQzlCLFlBQVksRUFBRSx3QkFBd0I7WUFDdEMsYUFBYSxFQUFFLG1CQUFtQjtTQUNuQyxDQUFDO1FBRUYsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFNBQUksR0FBVyxFQUFFLENBQUM7SUFFdUUsQ0FBQztJQUUxRixRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEYsTUFBTSxPQUFPLEdBQWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1FBQy9GLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1FBQzdGLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7OztZQTFGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0RFQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQXJFUSxZQUFZO1lBR1osY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9jYWNoZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0T3B0aW9ucyB9IGZyb20gJ0B5ZWxvbi90aGVtZS9sYXlvdXQtZGVmYXVsdCc7XG5cbmltcG9ydCB7IFl6U3RvbXBTZXJ2aWNlIH0gZnJvbSAnLi95ei5zdG9tcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXotbGF5b3V0LWJhc2ljJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGF5b3V0LWRlZmF1bHQgW29wdGlvbnNdPVwib3B0aW9uc1wiIFthc2lkZVVzZXJdPVwiYXNpZGVVc2VyVHBsXCIgW2NvbnRlbnRdPVwiY29udGVudFRwbFwiPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cImxlZnRcIj5cbiAgICAgICAgPHl6LWhlYWRlci1hcHBsaWNhdGlvbj48L3l6LWhlYWRlci1hcHBsaWNhdGlvbj5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8eXotaGVhZGVyLW5vdGlmeT48L3l6LWhlYWRlci1ub3RpZnk+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuXG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHl6LWhlYWRlci10aGVtZS1idG4+PC95ei1oZWFkZXItdGhlbWUtYnRuPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cblxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbS10cmlnZ2VyXG4gICAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwic2V0dGluZ3NNZW51XCJcbiAgICAgICAgICBuelRyaWdnZXI9XCJjbGlja1wiXG4gICAgICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cInNldHRpbmdcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjc2V0dGluZ3NNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgICA8ZGl2IG56LW1lbnUgc3R5bGU9XCJ3aWR0aDogMjAwcHg7XCI+XG4gICAgICAgICAgICA8ZGl2IG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl6LWhlYWRlci1mdWxsc2NyZWVuPjwveXotaGVhZGVyLWZ1bGxzY3JlZW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXotaGVhZGVyLWNsZWFyLXN0b3JhZ2U+PC95ei1oZWFkZXItY2xlYXItc3RvcmFnZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5ei1oZWFkZXItaTE4bj48L3l6LWhlYWRlci1pMThuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgPHl6LWhlYWRlci11c2VyPjwveXotaGVhZGVyLXVzZXI+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPG5nLXRlbXBsYXRlICNhc2lkZVVzZXJUcGw+XG4gICAgICAgIDxkaXYgbnotZHJvcGRvd24gbnpUcmlnZ2VyPVwiY2xpY2tcIiBbbnpEcm9wZG93bk1lbnVdPVwidXNlck1lbnVcIiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyXCI+XG4gICAgICAgICAgPG56LWF2YXRhciBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWF2YXRhclwiIFtuelNyY109XCJpY29uXCI+PC9uei1hdmF0YXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWluZm9cIj5cbiAgICAgICAgICAgIDxzdHJvbmc+e3sgdGV4dCB9fTwvc3Ryb25nPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJtYjBcIj57eyBpbnRybyB9fTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgPHVsIG56LW1lbnU+XG4gICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIHJvdXRlckxpbms9XCIvXCI+e3sgJ21lbnUuYmFja3RvaG9tZScgfCBpMThuIH19PC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPG5nLXRlbXBsYXRlICNjb250ZW50VHBsPlxuICAgICAgICA8cmV1c2UtdGFiICNyZXVzZVRhYj48L3JldXNlLXRhYj5cbiAgICAgICAgPHJvdXRlci1vdXRsZXQgKGFjdGl2YXRlKT1cInJldXNlVGFiLmFjdGl2YXRlKCRldmVudClcIj48L3JvdXRlci1vdXRsZXQ+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbGF5b3V0LWRlZmF1bHQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl6TGF5b3V0QmFzaWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIG9wdGlvbnM6IExheW91dERlZmF1bHRPcHRpb25zID0ge1xuICAgIGxvZ29FeHBhbmRlZDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgLFxuICAgIGxvZ29Db2xsYXBzZWQ6IGAuL2Fzc2V0cy9sb2dvLnN2Z2BcbiAgfTtcblxuICBpbnRybzogc3RyaW5nID0gJyc7XG4gIHRleHQ6IHN0cmluZyA9ICcnO1xuICBpY29uOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLCBwcml2YXRlIHl6U3RvbXBTZXJ2aWNlOiBZelN0b21wU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50OiBOelNhZmVBbnkgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9jdXJyZW50JywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgY29uc3QgcHJvamVjdDogTnpTYWZlQW55ID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfcHJvamVjdF9pbmZvJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy50ZXh0ID0gY3VycmVudC50ZXh0ID8gY3VycmVudC50ZXh0IDogJ+W6lOeUqOWQjeensCc7XG4gICAgdGhpcy5pbnRybyA9IGN1cnJlbnQuaW50cm8gPyBjdXJyZW50LmludHJvIDogJ+W6lOeUqOaPj+i/sCc7XG4gICAgdGhpcy5pY29uID0gY3VycmVudC5pY29uID8gY3VycmVudC5pY29uIDogYC4vYXNzZXRzL3RtcC9pbWcvYXZhdGFyLmpwZ2A7XG4gICAgdGhpcy5vcHRpb25zLmxvZ29FeHBhbmRlZCA9IHByb2plY3QubWF4TG9nb1VybCA/IHByb2plY3QubWF4TG9nb1VybCA6IGAuL2Fzc2V0cy9sb2dvLWZ1bGwuc3ZnYDtcbiAgICB0aGlzLm9wdGlvbnMubG9nb0NvbGxhcHNlZCA9IHByb2plY3QubWluaUxvZ29VcmwgPyBwcm9qZWN0Lm1pbmlMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28uc3ZnYDtcbiAgICB0aGlzLnl6U3RvbXBTZXJ2aWNlLmxpc3RlbigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy55elN0b21wU2VydmljZS51bkxpc3RlbigpO1xuICB9XG59XG4iXX0=