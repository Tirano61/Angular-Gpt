import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxSelectEvent, TextMessageBoxSlectComponent } from '@components/text-boxes/textMessageBoxSlect/textMessageBoxSlect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSlectComponent
],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {

  public messages = signal<MessageInterface[]>([]);
    public isLoading = signal(false);
    public openAiService = inject( OpenAiService );
    public voices = signal([
        {id: 'nova',  text: 'nova'},
        {id: 'alloy',  text: 'alloy'}, 
        {id: 'ash',  text: 'ash'}, 
        {id: 'ballad',  text: 'ballad'},  
        {id: 'coral',  text: 'coral'}, 
        {id: 'echo',  text: 'echo'}, 
        {id: 'fable', text: 'fable'}, 
        {id: 'onyx', text: 'onyx'}, 
        {id: 'sage', text: 'sage'}, 
        {id: 'shimmer', text: 'shimmer'},
        {id: 'verse', text: 'verse'},
        {id: 'zephyr', text: 'zephyr'},
        {id: 'nova-2', text: 'nova-2'},
        {id: 'alloy-2', text: 'alloy-2'},
        {id: 'ash-2', text: 'ash-2'},
        {id: 'ballad-2', text: 'ballad-2'},
        {id: 'coral-2', text: 'coral-2'},
        {id: 'echo-2', text: 'echo-2'},
        {id: 'fable-2', text: 'fable-2'},
        {id: 'onyx-2', text: 'onyx-2'},
        {id: 'sage-2', text: 'sage-2'},
        {id: 'shimmer-2', text: 'shimmer-2'},
        {id: 'verse-2', text: 'verse-2'},
        {id: 'zephyr-2', text: 'zephyr-2'},
        {id: 'nova-3', text: 'nova-3'},
        {id: 'alloy-3', text: 'alloy-3'},
        {id: 'ash-3', text: 'ash-3'}, 
        {id: 'ballad-3', text: 'ballad-3'},
        {id: 'coral-3', text: 'coral-3'},
        {id: 'echo-3', text: 'echo-3'},
        {id: 'fable-3', text: 'fable-3'},
        {id: 'onyx-3', text: 'onyx-3'},
        {id: 'sage-3', text: 'sage-3'},
        {id: 'shimmer-3', text: 'shimmer-3'},
        {id: 'verse-3', text: 'verse-3'},
        {id: 'zephyr-3', text: 'zephyr-3'},
        {id: 'nova-4', text: 'nova-4'},
        {id: 'alloy-4', text: 'alloy-4'},     
  ]);

    handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxSelectEvent ) {
      const message = `${selectedOption} - ${prompt}`;

      this.messages.update( ( messages ) => [
        ...messages,
        { isGpt: false, text: message },
      ]);
      this.isLoading.set(true);
      this.openAiService.textToAudio( prompt, selectedOption ).subscribe(({ message, audioUrl }) =>{
        this.isLoading.set(false);
        this.messages.update( prev =>[
          ...prev,
          {
            isGpt: true,
            text: prompt,
            audioUrl: audioUrl
          }
        ])
      });
      
    } 
 }
