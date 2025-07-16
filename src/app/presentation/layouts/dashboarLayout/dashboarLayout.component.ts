import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarMenuItemComponent } from '../../components/sideBarMenuItem/sideBarMenuItem.component';
import { routes } from '../../../app.routes';
import { ChatMessageComponent } from '../../components/chats-bubbles/chatMessage/chatMessage.component';

@Component({
  selector: 'app-dashboar-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SideBarMenuItemComponent,
    
  ],
  templateUrl: './dashboarLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboarLayoutComponent {

  public routes = routes[0].children?.filter((route) => route.data);

}
