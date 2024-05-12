import { AdminHomeComponent } from '../module/homepage/admin/admin-home.component';
import { Route } from '@angular/router';

export default [
  { path: '', component: AdminHomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
] satisfies Route[];