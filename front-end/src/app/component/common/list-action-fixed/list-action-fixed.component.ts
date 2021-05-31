
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-list-action-fixed',
    templateUrl: './list-action-fixed.component.html',
    styleUrls: ['./list-action-fixed.component.scss']
})
export class ListActionFixedComponent implements OnInit {
    @Input() data: any;
    @Output("keyListActionFixed") dataReturn = new EventEmitter();
    constructor() { }

    ngOnInit() {
        // console.log(this.data);
    }

}
