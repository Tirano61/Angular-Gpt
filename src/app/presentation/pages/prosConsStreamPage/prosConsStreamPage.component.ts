import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent { 

  public messages = signal<MessageInterface[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  async handleMessage(prompt: string) {
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: 'Thinking...',
      },
    ]);

    this.isLoading.set(true);

    const stream = this.openAiService.checkProsConsStream(prompt);
    this.isLoading.set(false);
    
    for await (const text of stream){
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(text: string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([ ...messages, { isGpt: true, text: text } ]);
  }
}
