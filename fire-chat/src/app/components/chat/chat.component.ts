import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  message: string = ""
  constructor(public _cs: ChatService) {
    this._cs.loadMessages()
      .subscribe();
  }

  sendMessage(){

    if(this.message.length === 0){
      return;
    }
    
    this._cs.pushMessage(this.message)
        .then(() => this.message = "")
        .catch((err) => console.error('Message Error Sending!', err));
  }
}
