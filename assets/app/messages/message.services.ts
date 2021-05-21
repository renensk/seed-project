import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
        
    private messageSService: Message[] = [];

    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http){}

    addMessage(message: Message){
        this.messageSService.push(message);
        console.log(this.messageSService);

        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/message', bodyReq, {headers: myHeaders})
        .map((responseRecebida: Response ) => responseRecebida.json())
        .map((responseRecebida: Response) => {
            const aux = responseRecebida.json();
            const newObjMessage = new Message(aux.objMessageSave.content,"Cassiano",
                                                                aux.objMessageSave._id,null);
            this.messageSService.push(newObjMessage);
            return newObjMessage;
        })
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    getMessages(){
        //return this.messageSService;
        return this.http.get('http://localhost:3000/message')
        .map((responseRecebida: Response) =>{
            const responseEmJSON = responseRecebida.json();
            const messageSResponseRecebida = responseEmJSON.objSMessageSRecuperadoS;
            let transfomedCastMessagesModelFrontend: Message[] = [];
                for(let msg of messageSResponseRecebida){
                    transfomedCastMessagesModelFrontend.push(
                    new Message(msg.content, 'Renan', msg._id, null));
                }
                this.messageSService = transfomedCastMessagesModelFrontend;
            return transfomedCastMessagesModelFrontend;    
        })
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
    
    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    deleteMessage(message: Message){
        this.messageSService.splice(this.messageSService.indexOf(message), 1);
        return this.http.delete('http://localhost:3000/message/'+ message.messageId)
        .map((responseRecebida: Response) => responseRecebida.json())
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    updateMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type':'application/json'});
        return this.http.patch('http://localhost:3000/message/'+ message.messageId,
                                                                bodyReq,{headers: myHeaders})
        .map((responseRecebida: Response) => responseRecebida.json())
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

}