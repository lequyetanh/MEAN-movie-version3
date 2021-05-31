
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../../movieModel/movieModel';
import { MovieService } from '../../../service/movie.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-allmovie',
    templateUrl: './allmovie.component.html',
    styleUrls: ['./allmovie.component.scss']
})
export class AllmovieComponent implements OnInit {
    type: String;
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

    statusMovie = false;
    statusItemMovie = false;
    
    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute,
        private location: Location,
        public fb: FormBuilder,
    ) { 
        window.scrollTo({ left: 0, top: 0});
    }

    private allItems: any[];
    pager: any = {};
    pagedItems: any = [];


    ngOnInit() {
        this.getType();
    }

    getType(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.statusMovie = false;
            this.statusItemMovie = false;
            const type = params.get('type');
            this.type = type;
            this.movieService.getMovieFromType(type).subscribe(
                (movie) => {
                    // this.movieType = movie;
                    this.movies = movie;
                    this.statusMovie = true;
                    // console.log(this.time);
                }
            );
        })
    }

    goBack(): void {
        this.location.back();
    }

    handleData(event) {
        this.pagedItems = event;
        this.statusMovie = true;
        this.statusItemMovie = true;
        // console.log(event); 
    }
}
