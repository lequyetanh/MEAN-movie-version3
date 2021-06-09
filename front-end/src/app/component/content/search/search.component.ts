import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { MovieService } from '../../../service/movie.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    type;
    status = false;
    movies;
    listMovie: any = [];
    searchName: any;
    statusMovie = false;
    private allItems: any[];
    pager: any = {};
    pagedItems: any[];

    statusItemMovie = false;
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private location: Location,
    ) {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.type = params.get('name');
            this.searchName = this.removeAccents(this.type).toLowerCase();
            // console.log(this.searchName);
            this.getAllMovie();
        });

        // console.log(this.searchName);
    }

    ngOnInit() {
        // this.route.paramMap.subscribe((params: ParamMap) => {
        //     this.type = params.get('name');
        //     this.searchName = this.removeAccents(this.type).toLowerCase();
        //     this.getAllMovie();
        // });
    }

    ngOnChange() {

    }

    getAllMovie(): void {
        this.statusMovie = false;
        this.listMovie = [];
        // console.log("hello world")
        this.movieService.getAllMovie().subscribe(movie => {
            // console.log(movie)
            this.movies = movie;
            for (let i = 0; i < this.movies.length; i++) {
                let name = this.removeAccents(this.movies[i].name).toLowerCase();
                // let regxName = `/${this.searchName}/i`;
                // console.log(regxName);
                if (name.search(this.searchName) == -1) {
                    continue;
                }
                else {
                    this.listMovie.push(this.movies[i]);
                    // console.log(this.listMovie);
                }
            }
            this.statusMovie = true;
        })
    }

    removeAccents(str: string) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    goBack(): void {
        this.location.back();
    }

    handleData(event) {
        this.statusItemMovie = true;
        // console.log(event);
        this.pagedItems = event;
        // console.log(event); 
    }

}