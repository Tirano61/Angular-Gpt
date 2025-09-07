import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ChatMessageComponent } from "@components/chats-bubbles/chatMessage/chatMessage.component";
import { MyMessageComponent } from "@components/chats-bubbles/myMessage/myMessage.component";
import { TextMessageBoxComponent } from "@components/text-boxes/textMessageBox/textMessageBox.component";
import { TypingLoaderComponent } from "@components/typingLoader/typingLoader.component";
import { MessageInterface } from "@interfaces/message.interface";
import { OpenAiService } from "app/presentation/services/openai.service";


@Component({
  selector: 'app-assistent-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistentPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistentPageComponent implements OnInit{
  
  public messages = signal<MessageInterface[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  public threadId = signal<string | undefined>( undefined );
  
  ngOnInit(): void {
    this.openAiService.createThread()
      .subscribe( id => {
        this.threadId.set( id );
        console.log('Thread ID:', id);
      });
  }

  handleMessage(question: string) {
    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { text: question, isGpt: false }] );

    this.openAiService.postQuestion( this.threadId()!, question )
      .subscribe( replies => {
        this.isLoading.set(false);
        
        // Limpiar mensajes existentes y mostrar toda la conversación
        const allMessages: MessageInterface[] = [];
        
        for (const reply of replies) {
          // Cada content es un array, tomamos el primer elemento
          const messageText = reply.content[0] || '';
          
          allMessages.push({
            text: messageText,
            isGpt: reply.role === 'assistant'
          });
        }
        
        // Reemplazar todos los mensajes con la conversación completa
        this.messages.set(allMessages);
      });
  }


}


