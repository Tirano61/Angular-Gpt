import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { GptMessageOrthographyComponent } from '@components/chats-bubbles/gptMessageOrthography/gptMessageOrthography.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';



@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrthographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
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

    this.openAiService.checkOrthopraphy(prompt)
      .subscribe( resp => {
      this.isLoading.set(false);
        
        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp,
          }
        ]);
      
    });
  
  }
  
}
