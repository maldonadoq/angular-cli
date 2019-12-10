import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { map } from "rxjs/operators";
import { Message } from '../interfaces/message.interface'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore) {

  }

  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats');
    return this.itemsCollection.valueChanges()
      .pipe(map( (messages: Message[]) => {
        console.log(messages);
        this.chats = messages
      }));
  }

  pushMessage(text: string){
    let message: Message = {
      name: 'Demo',
      message: text,
      date: new Date().getTime()
    };

    return this.itemsCollection.add(message);
  }
}
