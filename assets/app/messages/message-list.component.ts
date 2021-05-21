import { Message } from "./message.model";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message.services";

@Component({
  selector: "app-message-list",
  template: `
    <div class="col-mds-8 col-md-offset-2">
      <app-message
        [messageVarClasse]="msg"
        (editClicked_MessageMetodoClasse)="msg.content = $event"
        *ngFor="let msg of messageS"
      >
      </app-message>
    </div>
  `
  /* Passou a ser incorporado no Component app.component.ts
      que é o PAI desse Component providers: [MessageService] */
})
export class MessageListComponent implements OnInit {
  messageS: Message[] = [
    new Message("Texto Da Mensagem-LIST-Comp", "Cassiano-LIST-Comp"),
    new Message("Texto 2 Da Mensagem-LIST-Comp", "Sempre atrasado-LIST-Comp"),
    new Message(
      "Texto 3 Da Mensagem-LIST-Comp",
      "Sempre perde ponto-LIST-Comp"
    ),
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    //messageS aponta para o array messageSService que armazena os dados
    // this.messageS = this.messageService.getMessages();
    this.messageService.getMessages().subscribe(
      (dadosSucesso: Message[]) => {
        this.messageS = dadosSucesso;
        console.log(dadosSucesso);
      },
      (dadosErro) => console.log(dadosErro)
    );
  }
}
