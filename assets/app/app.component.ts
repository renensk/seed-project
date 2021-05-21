import { Component } from '@angular/core';
import { Message } from './messages/message.model';
import { MessageService } from './messages/message.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})

export class AppComponent {    
        messageS: Message[] = [ new Message( "Texto Da Mensagem", "Cassiano" ),
                                new Message( "Texto 2 Da Mensagem", "Sempre atrasado" ),
                                new Message( "Texto 3 Da Mensagem", "Sempre perde ponto" )
                              ]; 
}