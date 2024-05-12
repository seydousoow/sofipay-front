import { Route } from '@angular/router';
import { TransporterHomeComponent } from '../module/homepage/transporter/transporter-home.component';

export default [
  { path: '', component: TransporterHomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
] satisfies Route[];