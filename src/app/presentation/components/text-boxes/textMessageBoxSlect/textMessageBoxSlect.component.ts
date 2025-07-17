import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextMessageBoxComponent } from '../textMessageBox/textMessageBox.component';

interface Option{
  id: string;
  text: string;
}

export interface TextMessageBoxSelectEvent {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-slect',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBoxSlect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSlectComponent { 

  @Input() placeHolder: string = '';
  @Input({ required: true }) options!: Option[];

  @Output() onMessage = new EventEmitter<TextMessageBoxSelectEvent>();

  public fb = inject(FormBuilder);
  public messageForm = this.fb.group({
    prompt: [ '', Validators.required ],
    selectedOption: [ '', Validators.required ],
  });

  handleSubmit() {
    if (this.messageForm.invalid) return; 
    const { prompt, selectedOption } = this.messageForm.value;
    console.log('handleSubmit', prompt);
    this.onMessage.emit({ prompt: prompt!, selectedOption: selectedOption! });
    this.messageForm.reset();
      
  }

}
