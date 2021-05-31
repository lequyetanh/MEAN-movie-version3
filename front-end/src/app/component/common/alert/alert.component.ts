import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    @Input() data: any;
    @Output("keyAlert") dataReturn = new EventEmitter();
    constructor() { }

    ngOnInit() {
        // console.log(this.data)
    }

    yes(){
        this.dataReturn.emit(true);
    }

    no(){
        this.dataReturn.emit(false); 
    }

}
