import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { map } from "rxjs/operators";
import { Message } from '../interfaces/message.interface'

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    
    this.afAuth.authState.subscribe( userT => {
      console.log('State: ', userT);
      if(!userT){
        return;
      }

      this.user.name = userT.displayName;
      this.user.uid = userT.uid;
    })

  }

  login(provider: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date','desc').limit(5));
    return this.itemsCollection.valueChanges()
      .pipe(map( (messages: Message[]) => {
        console.log(messages);
        this.chats = [];

        for (let message of messages){
          this.chats.unshift(message);
        }

        return this.chats;

      }));
  }

  pushMessage(text: string){
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };

    return this.itemsCollection.add(message);
  }
}
