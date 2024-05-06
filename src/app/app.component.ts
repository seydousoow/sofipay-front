import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sofitay';

  constructor(registry: SvgIconRegistryService) {
    const basePath = '../assets/icons';
    registry.loadSvg(`${basePath}/folder.svg`, 'document-docs')?.subscribe();
    registry.loadSvg(`${basePath}/map-pin.svg`, 'map-pin')?.subscribe();
    registry.loadSvg(`${basePath}/shopping-cart.svg`, 'shopping-cart')?.subscribe();
    registry.loadSvg(`${basePath}/comment.svg`, 'comment')?.subscribe();
    registry.loadSvg(`${basePath}/arrows-left-right.svg`, 'arrows-left-right')?.subscribe();
    registry.loadSvg(`${basePath}/mail.svg`, 'mail')?.subscribe();
    registry.loadSvg(`${basePath}/no-symbol.svg`, 'no-symbol')?.subscribe();
    registry.loadSvg(`${basePath}/user.svg`, 'user')?.subscribe();
    registry.loadSvg(`${basePath}/grid.svg`, 'grid')?.subscribe();
    registry.loadSvg(`${basePath}/question.svg`, 'question-circle')?.subscribe();
    registry.loadSvg(`${basePath}/cog.svg`, 'cog')?.subscribe();
    registry.loadSvg(`${basePath}/bar-3.svg`, 'hamburger')?.subscribe();
    registry.loadSvg(`${basePath}/close.svg`, 'close')?.subscribe();
    registry.loadSvg(`${basePath}/arrow-left.svg`, 'arrow-left')?.subscribe();
    registry.loadSvg(`${basePath}/arrow-right.svg`, 'arrow-right')?.subscribe();
    registry.loadSvg(`${basePath}/chevron-up.svg`, 'chevron-up')?.subscribe();
    registry.loadSvg(`${basePath}/chevron-right.svg`, 'chevron-right')?.subscribe();
    registry.loadSvg(`${basePath}/chevron-left.svg`, 'chevron-left')?.subscribe();
    registry.loadSvg(`${basePath}/chevron-down.svg`, 'chevron-down')?.subscribe();
    registry.loadSvg(`${basePath}/chevron-up-down.svg`, 'chevron-up-down')?.subscribe();
    registry.loadSvg(`${basePath}/location.svg`, 'location')?.subscribe();
    registry.loadSvg(`${basePath}/folder.svg`, 'folder')?.subscribe();
    registry.loadSvg(`${basePath}/clock.svg`, 'clock')?.subscribe();
    registry.loadSvg(`${basePath}/padlock.svg`, 'padlock')?.subscribe();
    registry.loadSvg(`${basePath}/bank.svg`, 'bank')?.subscribe();
    registry.loadSvg(`${basePath}/logout.svg`, 'logout')?.subscribe();
    registry.loadSvg(`${basePath}/calendar.svg`, 'calendar')?.subscribe();
    registry.loadSvg(`${basePath}/check-circle.svg`, 'check-circle')?.subscribe();
    registry.loadSvg(`${basePath}/information-circle.svg`, 'information-circle')?.subscribe();
    registry.loadSvg(`${basePath}/check.svg`, 'check')?.subscribe();
    registry.loadSvg(`${basePath}/plus.svg`, 'plus')?.subscribe();
    registry.loadSvg(`${basePath}/minus.svg`, 'minus')?.subscribe();
    registry.loadSvg(`${basePath}/upload.svg`, 'upload')?.subscribe();
    registry.loadSvg(`${basePath}/bell.svg`, 'bell')?.subscribe();
    registry.loadSvg(`${basePath}/caret-down-fill.svg`, 'caret-down-fill')?.subscribe();
    registry.loadSvg(`${basePath}/caret-up-fill.svg`, 'caret-up-fill')?.subscribe();
    registry.loadSvg(`${basePath}/eye.svg`, 'eye')?.subscribe();
    registry.loadSvg(`${basePath}/download.svg`, 'download')?.subscribe();
    registry.loadSvg(`${basePath}/pencil.svg`, 'pencil')?.subscribe();
    registry.loadSvg(`${basePath}/trash.svg`, 'trash')?.subscribe();
    registry.loadSvg(`${basePath}/notification-header/alert.svg`, 'header-alert')?.subscribe();
    registry.loadSvg(`${basePath}/notification-header/news.svg`, 'header-news')?.subscribe();
    registry.loadSvg(`${basePath}/circle-fill.svg`, 'circle-fill')?.subscribe();
    registry.loadSvg(`${basePath}/search.svg`, 'search')?.subscribe();
    registry.loadSvg(`${basePath}/login.svg`, 'login')?.subscribe();
    registry.loadSvg(`${basePath}/filter.svg`, 'filter')?.subscribe();
    registry.loadSvg(`${basePath}/exclamation-triangle.svg`, 'exclamation-triangle')?.subscribe();
    registry.loadSvg(`${basePath}/clock-pending.svg`, 'clock-pending')?.subscribe();
    registry.loadSvg(`${basePath}/envelope.svg`, 'envelope')?.subscribe();
    registry.loadSvg(`${basePath}/star.svg`, 'star')?.subscribe();
    registry.loadSvg(`${basePath}/image.svg`, 'image')?.subscribe();
    registry.loadSvg(`${basePath}/square2x2.svg`, 'square2x2')?.subscribe();
  }

}
