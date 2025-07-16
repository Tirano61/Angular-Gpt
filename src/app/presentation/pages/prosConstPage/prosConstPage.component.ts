import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-const-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './prosConstPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConstPageComponent { }
