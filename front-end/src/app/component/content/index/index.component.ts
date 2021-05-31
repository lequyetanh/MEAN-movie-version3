import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../service/movie.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import *  as io from 'socket.io-client';
import { AuthService } from "../../../service/auth.service";
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { DataService } from '../../../service/data.service';
@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
    movieBo:any;
    movieLe:any;
    movieChieuRap:any;
    movieHoatHinh:any;
    movieRecent:any;
    statusMovie = 'phim chiếu rạp';
    statusLoading = false;
    constructor(
        private movieService: MovieService,
        public authService: AuthService,
        private router: Router,
        private dataService: DataService,
    ) {
        
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
            this.movieBo = Movie;
            // console.log(this.movieBo)
        });
    }

    get12Moviele() {
        this.movieService.get12Moviele().subscribe((Movie) => {
            this.movieLe = Movie;
        });
    }

    get18MovieRecent(){
        this.movieService.get18MovieRecent().subscribe((Movie) => {
            // console.log(Movie);
            this.movieRecent = Movie;
        });
    }

    get18MovieHoatHinh(){
        this.movieService.get18MovieHoatHinh().subscribe((Movie) => {
            // console.log(Movie);
            this.movieHoatHinh = Movie;
        });
    }

    get6MovieChieuRap(){
        this.movieService.get6MovieChieuRap().subscribe((Movie) => {
            this.movieChieuRap = Movie;
        });
    }

    changeStatusMovie(event){
        // console.log(event)
        this.statusMovie = event.srcElement.innerHTML.toLowerCase();
        // console.log(this.statusMovie);
    }

    handleData(event){
        // console.log(event)
        this.statusLoading = event;
    }

}
