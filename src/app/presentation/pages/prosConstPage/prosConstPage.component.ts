
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-const-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConstPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConstPageComponent {

  public messages = signal<MessageInterface[]>([]);
    public isLoading = signal(false);
    public openAiService = inject( OpenAiService );
  
    handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      }
    ]);

    this.openAiService.checkProsCons(prompt)
      .subscribe( resp => {
      this.isLoading.set(false);
        
        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.content,
          }
        ]);
      
    });
  
  }

}
