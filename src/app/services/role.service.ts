import { Injectable } from '@angular/core';
import { TRole } from '@sofipay/models';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RoleService {

  constructor(private auth: AuthenticationService) {
  }

  public isMaster(): boolean {
    return this.role === 'MASTER';
  }

  public isTransporter(): boolean {
    return this.role === 'TRANSPORTER';
  }

  public isClient(): boolean {
    return this.role === 'CLIENT';
  }

  private get role(): TRole | undefined {
    return this.auth.currentUser?.role;
  }

  public get isActive(): boolean {
    return this.auth.currentUser?.active ?? false;
  }

  hasPermission(permission: TRole): boolean {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return false;
    return currentUser.active && currentUser.role === permission;
  }

}
