import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';

@Component({
    selector: 'app-admin-genre',
    templateUrl: './admin-genre.component.html',
    styleUrls: ['./admin-genre.component.scss']
})
export class AdminGenreComponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
    @Input() dataGenre: any;
    constructor(
        private movieService: MovieService
    ) { }

    ngOnInit() {
        // console.log(this.dataGenre);
    }

}
