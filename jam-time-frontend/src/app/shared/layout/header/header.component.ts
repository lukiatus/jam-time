import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatBadge } from "@angular/material/badge";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication/authentication.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatBadge,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    MatTooltip,
    NgIf,
    RouterLink,
    MatMenuTrigger,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public authService = inject(AuthenticationService);
  @Output() public toggleSidenav = new EventEmitter<void>();
}
