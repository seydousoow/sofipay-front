import { Route, UrlSegment } from '@angular/router';
import { isAuthenticated } from './guards/authenticated.guard';
import { LayoutComponent } from './module/layout/layout.component';
import { hasPermission } from './guards/permission.guard';
import { LoginComponent } from './module/auth/login/login.component';
import { UnauthorizedComponent } from './module/auth/unauthorized/unauthorized.component';
import { RegisterComponent } from './module/auth/register/register.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '',
    canMatch: [(_: Route, segments: UrlSegment[]) => isAuthenticated(segments)],
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        canMatch: [() => hasPermission('MASTER')],
        loadChildren: () => import('./router/admin.routes')
      },
      {
        path: 'client',
        canMatch: [() => hasPermission('CLIENT')],
        loadChildren: () => import('./router/client.routes')
      },
      {
        path: 'trz',
        canMatch: [() => hasPermission('TRANSPORTER')],
        loadChildren: () => import('./router/transporter.routes')
      },
      { path: '', pathMatch: 'full', redirectTo: 'client' },
      { path: '**', redirectTo: 'unauthorized', pathMatch: 'full' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
