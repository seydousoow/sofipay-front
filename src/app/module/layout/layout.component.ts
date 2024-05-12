import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListComponent } from '@sofitay/notifications';
import { IMenuItem } from '@sofitay/models';
import { RoleService } from '../../services/role.service';
import { IconComponent } from '@sofitay/atoms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListComponent, IconComponent, RouterLinkActive, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  readonly url :string = "https://";
  private readonly adminMenu: IMenuItem[];
  private readonly transporterMenu: IMenuItem[];
  private readonly clientMenu: IMenuItem[];

  constructor(private roleService: RoleService) {
    this.adminMenu = [
      {
        icon: 'user',
        path: [''],
        label: 'Mon compte'
      },
      {
        icon: 'user',
        path: [''],
        label: 'Mon compte'
      },
      {
        icon: 'user',
        path: [''],
        label: 'Mon compte'
      },
      {
        icon: 'user',
        path: [''],
        label: 'Mon compte'
      },
    ];
    this.transporterMenu = [];
    this.clientMenu = [];
  }

  get menu(): IMenuItem[] {
    if (this.roleService.isAdmin())
      return this.adminMenu;
    if (this.roleService.isClient())
      return this.clientMenu;
    if (this.roleService.isTransporter())
      return this.transporterMenu;
    return [];
  }
}
