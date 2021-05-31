import { Component, OnInit, Input, EventEmitter, Output, NgZone } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    moviebo: any;
    moviele: any;
    movie: any;
    movieChieuRap:any;
    movieNew:any;
    statusMovie = 'phim bộ';
    @Input() data: any;
    constructor(
        private movieService: MovieService,
        private ngZone: NgZone,
        private router: Router,
    ) { }

    ngOnInit() {
        this.get10Moviebo();
        this.get10Moviele();
        this.get10MovieChieuRap();
        this.getMovieNew();
    }

    ngOnChanges() {
        
    }

    get10Moviebo(): void {
        this.movieService.get10Moviebo().subscribe(
            (Movie) => {
                this.moviebo = Movie;
                for (var i = 0; i < this.moviebo.length; i++) {
                    this.moviebo[i].views = this.numberWithCommas(this.moviebo[i].views);
                }
            }
        )
    }

    getMovieNew(){
        this.movieService.get10MovieNew().subscribe(
            (Movie) => {
                this.movieNew = Movie;
                for (var i = 0; i < this.movieNew.length; i++) {
                    this.movieNew[i].views = this.numberWithCommas(this.movieNew[i].views);
                }
            }
        )
    }

    get10Moviele(): void {
        this.movieService.get10Moviele().subscribe(
            (Movie) => {
                this.moviele = Movie;
                for (var i = 0; i < Object.keys(this.moviele).length; i++) {
                    this.moviele[i].views = this.numberWithCommas(this.moviele[i].views);
                }
            }
        )
    }

    get10MovieChieuRap(){
        this.movieService.get10MovieChieuRap().subscribe(
            (Movie) => {
                this.movieChieuRap = Movie;
                for (var i = 0; i < Object.keys(this.movieChieuRap).length; i++) {
                    this.movieChieuRap[i].views = this.numberWithCommas(this.movieChieuRap[i].views);
                }
            }
        )
    }

    numberWithCommas(x: string) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    changeStatusMovie(event){
        // console.log(event)
        this.statusMovie = event.srcElement.innerHTML.toLowerCase();
        // console.log(this.statusMovie);
    }
}
