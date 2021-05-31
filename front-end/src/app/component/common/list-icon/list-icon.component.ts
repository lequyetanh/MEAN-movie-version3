import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-list-icon',
    templateUrl: './list-icon.component.html',
    styleUrls: ['./list-icon.component.scss']
})
export class ListIconComponent implements OnInit {

    statusIcon = 'people';
    @Output("keyListIcon") dataReturn = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    uploadIcon(event){
        event.preventDefault();
        this.dataReturn.emit(event.srcElement.innerHTML);
        // console.log(event.srcElement.innerHTML);
    }

    changeStatusIcon(name){
        this.statusIcon = name;
    }

}
