import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../service/movie.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    moviebo = {
        data: null,
        loading: true,
    };
    moviele = {
        data: null,
        loading: true,
    };
    movie: any;
    movieChieuRap = {
        data: null,
        loading: true,
    };
    movieNew = {
        data: null,
        loading: true,
    };
    statusMovie = 'phim bộ';
    @Input() data: any;

    array5: any = [];
    constructor(
        private movieService: MovieService,
    ) {
        this.array5.length = 5;
    }

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
                this.moviebo.data = Movie;
                this.moviebo.loading = false;
                for (var i = 0; i < this.moviebo.data.length; i++) {
                    this.moviebo.data[i].views = this.numberWithCommas(this.moviebo.data[i].views);
                }
            }
        )
    }

    getMovieNew() {
        this.movieService.get10MovieNew().subscribe(
            (Movie) => {
                this.movieNew.data = Movie;
                this.movieNew.loading = false;
                for (var i = 0; i < this.movieNew.data.length; i++) {
                    this.movieNew.data[i].views = this.numberWithCommas(this.movieNew.data[i].views);
                }
            }
        )
    }

    get10Moviele(): void {
        this.movieService.get10Moviele().subscribe(
            (Movie) => {
                this.moviele.data = Movie;
                this.moviele.loading = false;
                for (var i = 0; i < Object.keys(this.moviele.data).length; i++) {
                    this.moviele.data[i].views = this.numberWithCommas(this.moviele.data[i].views);
                }
            }
        )
    }

    get10MovieChieuRap() {
        this.movieService.get10MovieChieuRap().subscribe(
            (Movie) => {
                this.movieChieuRap.data = Movie;
                this.movieChieuRap.loading = false;
                for (var i = 0; i < Object.keys(this.movieChieuRap.data).length; i++) {
                    this.movieChieuRap.data[i].views = this.numberWithCommas(this.movieChieuRap.data[i].views);
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

    changeStatusMovie(event) {
        // console.log(event)
        this.statusMovie = event.srcElement.innerHTML.toLowerCase();
        // console.log(this.statusMovie);
    }
}
