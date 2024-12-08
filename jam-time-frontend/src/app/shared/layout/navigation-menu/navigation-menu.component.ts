import { Component, inject, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListSubheaderCssMatStyler, MatNavList } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { routes } from '../../../app.routes';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
    selector: 'app-navigation-menu',
  imports: [
    MatIcon,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatNavList,
    RouterLinkActive,
    RouterLink,
    MatTooltip,
    MatListItemIcon,
    NgClass,
  ],
    templateUrl: './navigation-menu.component.html',
    styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  public authService = inject(AuthService);
  public isCollapsed = input.required<boolean>();
  public navigationMenuItems: any = routes.filter(r => r.title);
}
