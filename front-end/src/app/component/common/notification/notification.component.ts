import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    @Input() data: any;
    @Output("keyAlert") dataReturn = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    ok(){
        
    }


}
