import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message: string = ""
  element: HTMLElement;

  constructor(public _cs: ChatService) {
    this._cs.loadMessages()
      .subscribe( () => {

        setTimeout( () => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20)
      });
  }

  sendMessage(){

    if(this.message.length === 0){
      return;
    }
    
    this._cs.pushMessage(this.message)
        .then(() => this.message = "")
        .catch((err) => console.error('Message Error Sending!', err));
  }

  ngOnInit(){
    this.element = document.getElementById('app-messages');
  }
}
