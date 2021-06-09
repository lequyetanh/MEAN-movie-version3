import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../../movieModel/movieModel';
import { MovieService } from '../../../service/movie.service';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-allmovie',
    templateUrl: './allmovie.component.html',
    styleUrls: ['./allmovie.component.scss']
})
export class AllmovieComponent implements OnInit {
    type: String = null;
    year: any;
    movieType: Movie[];
    movies: any[];
    searchForm: FormGroup;
    array: any = [];
    list: any = [];
    movie: any = [];
    tab = false;

    genre: any = [];
    country: any = [];
    release_year: any = [];
    run_time: any = [];

    loading = true;
    array20 = [];

    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute,
        private location: Location,
        public fb: FormBuilder,
    ) {
        this.array20.length = 16;
        window.scrollTo({ left: 0, top: 0 });
    }

    private allItems: any[];
    pager: any = {};
    pagedItems: any = [];


    ngOnInit() {
        this.getMovie()
    }

    getMovie(){
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.loading = true;
            const type = params.get('type');
            this.type = type;
            this.movieService.getMovieFromType(type).subscribe(
                (movie) => {
                    // this.movieType = movie;
                    this.movies = movie;
                    // console.log(this.time);
                }
            );
        })
    }

    ngAfterContentChecked() {
        // this.handleData(event);
    }

    goBack(): void {
        this.location.back();
    }

    handleData(event) {
        setTimeout(() => {
            this.pagedItems = event;
            this.loading = false;
        })
        // console.log(event); 
    }
}