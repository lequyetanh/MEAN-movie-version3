import { Injectable } from '@angular/core';
import *  as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
// import * as Rx from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    // constructor() {
    //     this.socket = io(this.socketUrl);
    // }

    // listen(eventName: string) {
    //     return new Observable((subscriber) => {
    //         this.socket.on(eventName, data => {
    //             // console.log("data received: " + data);
    //             subscriber.next(data);
    //         })
    //     });
    // }

    // connect(): Subject<MessageEvent> {
    //     this.socket = io(this.socketUrl);

    //     let Observable = new Observable(observer => {
    //         this.socket.on('message', (data) => {
    //             console.log("Received a message from websocket server");
    //             observer.next(data);
    //         })
    //         return () => {
    //             this.socket.disconnect();
    //         }
    //     })

    //     let observer = {
    //         next: (data:Object) => {
    //             this.socket.emit('message', JSON.stringify(data));
    //         },
    //     };

    //     return Rx.Subject.create(observer, Observable);

    // }

}
