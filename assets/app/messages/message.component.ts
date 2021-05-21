import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.services";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styles: [
    `
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-size: 15px;
        width: 19%;
      }
    `,
  ],
})
export class MessageComponent {
  color = "blue";
  tam = 12;
  onMudaStyle() {
    this.color = "red";
    this.tam = 12;
  }

  @Input() messageVarClasse: Message = new Message("", "");
  @Input('inputMessage') messageVarClasseAlias : Message = new Message("","" );

  @Output() editClicked_MessageMetodoClasse = new EventEmitter<string>();
  @Output("outputMessage") editClicked_MessageMetodoClasseAlias =
    new EventEmitter<string>();

  constructor(private messageServiceObj: MessageService) {}

  onDeleteService() {
    this.messageServiceObj.deleteMessage(this.messageVarClasse).subscribe(
      (dadosSucesso) => console.log(dadosSucesso),
      (dadosErro) => console.log(dadosErro)
    );
  }

  onEditService() {
    alert("Ta funfando!");
    this.editClicked_MessageMetodoClasse.emit(
      "Texto veio de message (child) para o app (pai)"
    );
    this.editClicked_MessageMetodoClasseAlias.emit(
      "Texto veio de message (child) para o app (pai) - Alias"
    );

    this.messageServiceObj.editMessage(this.messageVarClasse);
  }
}
