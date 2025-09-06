import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chats-bubbles/chatMessage/chatMessage.component';
import { GptMessageEditableImageComponent } from '@components/chats-bubbles/gptMessageEditableImage/gptMessageEditableImage.component';
import { MyMessageComponent } from '@components/chats-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { MessageInterface } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent,
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent { 

  public messages = signal<MessageInterface[]>([
    {
      isGpt: true,
      text: 'Dummy Image',
      imageInfo: {
        url: 'http://localhost:3000/gpt/image-generation/1757125575780.png',
        alt: 'Un gato con gafas de sol y una camisa hawaiana, sentado en una playa tropical con palmeras y un mar azul de fondo.',
      }
    }
  ]);
    public isLoading = signal(false);
    public openAiService = inject( OpenAiService );

    public originalImage = signal<string | undefined>( undefined );
  
    handleMessage(prompt: string) {
  
    this.isLoading.set(true);
    this.messages.update( (prev) => ([...prev, { isGpt: false, text: prompt }]) );

    this.openAiService.imageGeneration( prompt )
      .subscribe(resp =>{
        this.isLoading.set(false);
        if( !resp ) return;
        this.messages.update( (prev) => ([...prev, { 
          isGpt: true,
          text: resp.alt, 
          imageInfo: resp, 
        }]) 
      );
    });

  }

  handleImageChange(newImage: string, originalImage: string){
    this.originalImage.set( originalImage );
    this.isLoading.set(true);
    

  }

  generateVariation(){
    this.isLoading.set(true);
    this.openAiService.imageVariation( this.originalImage()! )
      .subscribe( resp => {
        this.isLoading.set(false);
        
        if( !resp ) return;

        this.messages.update( (prev) => ([...prev, { 
          isGpt: true,
          text: resp.alt, 
          imageInfo: resp, 
        }]) );
      });
  }

}
