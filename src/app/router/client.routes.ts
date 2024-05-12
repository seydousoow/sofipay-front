import { Route } from '@angular/router';
import { ClientHomeComponent } from '../module/homepage/client/client-home.component';

export default [
  { path: '', component: ClientHomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
] satisfies Route[];