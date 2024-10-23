import { Component, input } from '@angular/core';
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListSubheaderCssMatStyler, MatNavList } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NavigationMenuItems } from './navigation-menu-items.constant';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    MatDivider,
    MatIcon,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatNavList,
    RouterLinkActive,
    RouterLink,
    MatTooltip,
    MatIconButton,
    MatListItemIcon,
    NgClass
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  public isCollapsed = input.required<boolean>();
  public navigationMenuItems: any = NavigationMenuItems;
}
