import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


export interface TextMessageEvent {
  prompt: string | null;
  file: File;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {

  @Input() placeHolder: string = '';
  
  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  public fb = inject(FormBuilder);
  public messageForm = this.fb.group({
    prompt: [],
    file: [null, Validators.required],
  });

  public file: File | undefined;

  handleSelectedFile(event: any) {
    const file = event.target.files[0];
    this.messageForm.controls['file'].setValue(file);

  }

  handleSubmit() {
    if (this.messageForm.invalid) return; 
    const { prompt = '', file } = this.messageForm.value;

    this.onMessage.emit({ prompt, file: file! });
    this.messageForm.reset();
      
  }

}
