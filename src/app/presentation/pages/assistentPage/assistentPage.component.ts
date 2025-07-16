import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-assistent-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './assistentPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistentPageComponent { }
