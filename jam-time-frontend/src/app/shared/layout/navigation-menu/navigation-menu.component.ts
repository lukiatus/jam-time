import { Component } from '@angular/core';
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListSubheaderCssMatStyler, MatNavList } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";

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
    RouterLink
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
}
