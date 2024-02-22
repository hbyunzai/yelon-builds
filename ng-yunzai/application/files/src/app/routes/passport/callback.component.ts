import { Component, Input, OnInit, inject } from '@angular/core';
import { SocialService } from '@yelon/auth';
import { SettingsService } from '@yelon/theme';

@Component({
  selector: 'app-callback',
  template: ``,
  providers: [SocialService],
  standalone: true
})
export class CallbackComponent implements OnInit {
  private readonly socialService = inject(SocialService);
  private readonly settingsSrv = inject(SettingsService);
  @Input() type = '';

  ngOnInit(): void {
    this.mockModel();
  }

  private mockModel(): void {
    const info = {
      access_token: '123456789',
      name: 'yunzai-bot',
      email: `${this.type}@${this.type}.com`,
      id: 10000,
      time: +new Date()
    };
    this.settingsSrv.setUser({
      ...this.settingsSrv.user,
      ...info
    });
    this.socialService.callback(info);
  }
}
