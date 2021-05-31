import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';

@Component({
    selector: 'app-admin-country',
    templateUrl: './admin-country.component.html',
    styleUrls: ['./admin-country.component.scss']
})
export class AdminCountryComponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
    @Input() dataCountry: any;
    constructor(
        private movieService: MovieService
    ) { }

    ngOnInit() {
        // console.log(this.dataCountry);
    }

}
