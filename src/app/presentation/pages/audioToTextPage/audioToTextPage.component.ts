import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { TextMessageBoxFileComponent, TextMessageEvent } from "@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component";
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent
],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent { 
  public messages = signal<MessageInterface[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    
    const text = prompt ?? file.name ?? 'Traduce el audio a texto ';

    this.isLoading.set(true);

    this.messages.update( prev => [ ...prev, { isGpt: false, text: text}]);

    this.openAiService.audioToText(file, text).subscribe(resp => this.handleResponse(resp));

  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## __Transcripción:__ 
Total-Tokens:  ${resp!.usage.total_tokens}
## El texto es:

${resp!.text}          
    `
    this.messages.update( prev => [ ...prev, { isGpt: true, text: text }]);
  }
      
}
