import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent { 

  @Input() placeHolder: string = '';
  @Input() desableCorrections: boolean = false;

  @Output() onMessage = new EventEmitter<string>();

  public fb = inject(FormBuilder);
  public messageForm = this.fb.group({
    prompt: [ '', Validators.required ]
  });

  handleSubmit() {
    if (this.messageForm.invalid) return; 
    const { prompt } = this.messageForm.value;
    console.log('handleSubmit', prompt);
    this.onMessage.emit(prompt ?? '');
    this.messageForm.reset();
      
  }

}
