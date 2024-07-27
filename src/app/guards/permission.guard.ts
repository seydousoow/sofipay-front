import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { TRole } from '@sofipay/models';
import { RoleService } from '../services/role.service';

@Injectable()
export class PermissionGuard {
  constructor(private roleService: RoleService, private router: Router) {}

  hasPermission(permission: TRole): boolean | UrlTree {
    return this.roleService.hasPermission(permission) ? true : this.router.parseUrl('/unauthorized');
  }

}

export const hasPermission = (permission: TRole, permissionService = inject(PermissionGuard)) => permissionService.hasPermission(permission);
