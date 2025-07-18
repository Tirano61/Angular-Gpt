import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectEvent } from '@components/text-boxes/textMessageBoxSlect/textMessageBoxSlect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent { 

  public messages = signal<MessageInterface[]>([]);
    public isLoading = signal(false);
    public openAiService = inject( OpenAiService );
  
    handleMessage(prompt: string) {
      console.log('Received message:', prompt);
    }
    /* handleMessageWithFile({ prompt, file }: TextMessageEvent) {
      console.log('Received message:', prompt);
      console.log('Received file:', file);
    }
    handleMessageWithSelect( event: TextMessageBoxSelectEvent ) {
      console.log('Received message with select', event);
    } */
    
}
