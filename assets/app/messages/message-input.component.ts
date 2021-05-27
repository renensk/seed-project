import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message.services";
import { Message } from "./message.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-message-input",
  templateUrl: "./message-input.component.html",

  /* Passou a ser incorporado no Component app.component.ts
        que é o PAI desse Component providers: [MessageService] */
})
export class MessageInputComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  onSave(textoConsole: string) {
    const messageAux = new Message(textoConsole, "Vini");
    this.messageService.addMessage(messageAux);
    console.log(textoConsole);
  }

  messageLoad: Message;

  onClear(form: NgForm) {
    this.messageLoad = null;
    form.resetForm();
  }
  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => (this.messageLoad = message)
    );
  }

  onSubmit(form: NgForm) {
    if (this.messageLoad) {
      //EDITAR
      this.messageLoad.content = form.value.myContentngForm;
      this.messageService.updateMessage(this.messageLoad).subscribe(
        (dadosSucesso) => console.log(dadosSucesso),
        (dadosErro) => console.log(dadosErro)
      );
      this.messageLoad = null;
    } else {
      //CRIAR
      const messageAux = new Message(form.value.myContentngForm, "Renan");
      this.messageService.addMessage(messageAux).subscribe(
        (dadosSucesso) => console.log(dadosSucesso),
        (dadosErro) => console.log(dadosErro)
      );
    }
    console.log(form);
    form.resetForm;
  }
}
