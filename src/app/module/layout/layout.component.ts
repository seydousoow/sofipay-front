import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListComponent } from '@sofipay/notifications';
import { IMenuItem } from '@sofipay/models';
import { RoleService } from '../../services/role.service';
import { IconComponent } from '@sofipay/atoms';

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
    this.transporterMenu = [
      {
        icon: 'square2x2',
        path: ['/', 'trz'],
        label: 'Dashboard'
      },
      {
        icon: 'shopping-cart',
        path: ['/'],
        label: 'Marché'
      },
      {
        icon: 'user',
        path: ['/'],
        label: 'Carburant'
      },
      {
        icon: 'image',
        path: ['/'],
        label: 'Document'
      },
      {
        icon: 'profile-card',
        path: ['/'],
        label: 'Facturation'
      },
      {
        icon: 'bank',
        path: ['/'],
        label: 'E-money'
      }
    ];
    this.adminMenu = [];
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
