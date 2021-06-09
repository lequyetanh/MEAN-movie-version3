import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../service/movie.service";
import { AuthService } from "../../../service/auth.service";
import { StateService } from './../../../service/state.service';
@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
    movieBo = {
        data: null,
        loading: true,
    };
    movieLe = {
        data: null,
        loading: true,
    };
    movieChieuRap = {
        data: null,
        loading: true,
    };
    movieHoatHinh = {
        data: null,
        loading: true,
    };
    movieRecent = {
        data: null,
        loading: true,
    };
    statusMovie = 'phim chiếu rạp';

    array6 = [];
    array18 = [];
    count: any = 1;
    constructor(
        private movieService: MovieService,
        public authService: AuthService,
        private stateService: StateService,
    ) {
        this.stateService.count.subscribe(count => {
            // console.log(count);
            this.count = count
            // return count;
        });
        // console.log(this.count)
        this.array6.length = 6;
        this.array18.length = 12;
    }
    ngOnInit() {
        this.get12Moviebo();
        this.get12Moviele();
        this.get18MovieHoatHinh();
        this.get18MovieRecent();
        this.get6MovieChieuRap();
    }

    get12Moviebo() {
        this.movieService.get12Moviebo().subscribe((Movie) => {
            this.movieBo.data = Movie;
            this.movieBo.loading = false;
            // console.log(this.movieBo)
        });
    }

    get12Moviele() {
        this.movieService.get12Moviele().subscribe((Movie) => {
            this.movieLe.data = Movie;
            this.movieLe.loading = false;
        });
    }

    get18MovieRecent() {
        this.movieService.get18MovieRecent().subscribe((Movie) => {
            // console.log(Movie);
            this.movieRecent.data = Movie;
            this.movieRecent.loading = false;
        });
    }

    get18MovieHoatHinh() {
        this.movieService.get18MovieHoatHinh().subscribe((Movie) => {
            // console.log(Movie);
            this.movieHoatHinh.data = Movie;
            this.movieHoatHinh.loading = false;
        });
    }

    get6MovieChieuRap() {
        this.movieService.get6MovieChieuRap().subscribe((Movie) => {
            this.movieChieuRap.data = Movie;
            this.movieChieuRap.loading = false;
        });
    }

    changeStatusMovie(event) {
        // console.log(event)
        this.statusMovie = event.srcElement.innerHTML.toLowerCase();
        // console.log(this.statusMovie);
    }

    handleData(event) {
        // console.log(event)
    }

}
