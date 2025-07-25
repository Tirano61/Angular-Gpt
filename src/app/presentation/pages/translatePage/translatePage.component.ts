import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxSelectEvent, TextMessageBoxSlectComponent } from '@components/text-boxes/textMessageBoxSlect/textMessageBoxSlect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSlectComponent
],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent { 

  public messages = signal<MessageInterface[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );
  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]); 
  
  handleMessageWithSelect( event: TextMessageBoxSelectEvent ) {
    const message = `Traduce el siguiente texto al ${event.selectedOption}: ${event.prompt}`;
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: message,
      }
    ]);

    this.openAiService.checkTranslate(event.prompt, event.selectedOption)
      .subscribe( resp => {
      this.isLoading.set(false);
        
        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
          }
        ]);
      
    });
  }
}
