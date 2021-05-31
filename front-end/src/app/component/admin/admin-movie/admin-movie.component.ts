import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-admin-movie',
    templateUrl: './admin-movie.component.html',
    styleUrls: ['./admin-movie.component.scss']
})
export class AdminMovieComponent implements OnInit {

    @Input() dataMovie: any;
    todaydate = new Date();
    movies: any = [];
    searchForm: FormGroup;
    movie: any = [];

    result = true;

    array: any = [];
    list: any = [];
    showAlert = false;
    idMovieDelete: any;

    genre: any = [];
    country: any = [];
    release_year: any = ["Tất cả", "Dưới 2016", "2016", "2017", "2018", "2019", "Trên 2019"];
    run_time: any = ["Tất cả", "Dưới 1 tiếng", "1-2 tiếng", "Trên 2 tiếng"];
    category: any = ["Tất cả", "phim bộ", "phim lẻ"];

    private allItems: any[];
    pager: any = {};
    pagedItems: any[];

    statusEachMovie = false;
    constructor(
        private movieService: MovieService,
        private router: Router,
        private ngZone: NgZone,
        public fb: FormBuilder,
    ) {
        this.getData();
    }

    ngOnInit() {
        this.mainForm();
    }

    ngOnChanges() {
        // console.log(this.dataMovie);
        this.movie = this.dataMovie;
        this.movies = this.dataMovie;
        this.result = true;
    }

    delete(id: number): void {
        this.showAlert = true;
        this.idMovieDelete = id;
    }

    handleDataAlert(event) {
        this.showAlert = false;
        if (event == false) {

        } else {
            this.result = false;
            this.movieService.deleteMovie(this.idMovieDelete).subscribe(
                (res) => {
                    for (let i = 0; i < this.movies.length; i++) {
                        if (this.movies[i].id == this.idMovieDelete) {
                            this.movies.splice(i, 1);
                        }
                    }
                    this.result = true;
                    // window.location.reload();
                    console.log('Movie successfully delete!');
                }, (error) => {
                    console.log(error);
                });
        }
    }

    reset() {
        this.movies = this.movie;
        this.ngOnInit();
        this.searchForm.setValue({
            genre: this.genre[0],
            country: this.country[0],
            release_year: this.release_year[0],
            run_time: this.run_time[0],
            category: this.category[0],
        });
    }

    getData() {
        this.movieService.getCategory().subscribe(data => {
            for (var i = 0; i < Object.keys(data).length; i++) {
                this.genre.push(data[i].name);
            }
            this.genre.unshift("Tất cả");
            this.movieService.getCountry().subscribe(data => {
                for (var i = 0; i < Object.keys(data).length; i++) {
                    this.country.push(data[i].name);
                }
                this.country.unshift("Tất cả");
                this.searchForm.setValue({
                    genre: this.genre[0],
                    country: this.country[0],
                    release_year: this.release_year[0],
                    run_time: this.run_time[0],
                    category: this.category[0],
                });
            })
        })
    }

    mainForm() {
        this.searchForm = this.fb.group({
            genre: [''],
            country: [''],
            release_year: [''],
            run_time: [''],
            category: ['']
        })
    }

    updateMovieType(e) {
        this.searchForm.get('category').setValue(e, {
            onlySelf: true
        })
    }

    updateCategory(e) {
        this.searchForm.get('genre').setValue(e, {
            onlySelf: true
        })
    }

    updateCountry(e) {
        this.searchForm.get('country').setValue(e, {
            onlySelf: true
        })
    }

    updateTime(e) {
        this.searchForm.get('run_time').setValue(e, {
            onlySelf: true
        })
    }

    updateYear(e) {
        this.searchForm.get('release_year').setValue(e, {
            onlySelf: true
        })
    }

    onSubmit() {
        this.result = false;
        this.movies = [];
        // this.pagedItems = [];
        this.list = [];
        // console.log(this.searchForm.value);
        this.array = [];
        if (this.searchForm.value.category != 'Tất cả') {
            this.array.push('category');
        }
        if (this.searchForm.value.genre != 'Tất cả') {
            this.array.push('genre');
        }
        if (this.searchForm.value.country != 'Tất cả') {
            this.array.push('country');
        }
        if (this.searchForm.value.run_time != 'Tất cả') {
            this.array.push('run_time');
        }
        if (this.searchForm.value.release_year != 'Tất cả') {
            this.array.push('release_year');
        }
        console.log(this.array);
        if (this.array[0] == undefined) {
            this.movies = this.movie;
            this.result = true;
        } else {
            for (var j = 0; j < this.movie.length; j++) {
                for (var i = 0; i < this.array.length; i++) {
                    if (this.array[i] == "genre" || this.array[i] == "country" || this.array[i] == "category") {
                        if (this.movie[j][this.array[i]].indexOf(this.searchForm.value[this.array[i]]) !== -1) {
                            if (i == this.array.length - 1) {
                                this.list.push(this.movie[j]);
                                break;
                            }
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                    if (this.array[i] == "run_time") {
                        if (this.searchForm.value[this.array[i]] == "Dưới 1 tiếng") {
                            if (this.movie[j].run_time < 60) {
                                if (i == this.array.length - 1) {
                                    this.list.push(this.movie[j]);
                                    break;
                                }
                                continue;
                            }
                            else {
                                break;
                            }
                        }

                        if (this.searchForm.value[this.array[i]] == "1-2 tiếng") {
                            if (this.movie[j].run_time >= 60 && this.movie[j].run_time <= 120) {
                                if (i == this.array.length - 1) {
                                    this.list.push(this.movie[j]);
                                    break;
                                }
                                continue;
                            }
                            else {
                                break;
                            }
                        }

                        if (this.searchForm.value[this.array[i]] == "Trên 2 tiếng") {
                            if (this.movie[j].run_time > 120) {
                                if (i == this.array.length - 1) {
                                    this.list.push(this.movie[j]);
                                    break;
                                }
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                    }

                    if (this.array[i] == "release_year") {
                        if (this.searchForm.value[this.array[i]] == "Dưới 2016") {
                            if (this.movie[j].release_year < 2016) {
                                if (i == this.array.length - 1) {
                                    this.list.push(this.movie[j]);
                                    break;
                                }
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                        for (var release = 0; release < this.release_year.length; release++) {
                            if (this.searchForm.value[this.array[i]] == this.release_year[release]) {
                                if (this.movie[j].release_year == this.release_year[release]) {
                                    if (i == this.array.length - 1) {
                                        this.list.push(this.movie[j]);
                                        break;
                                    }
                                    continue;
                                }
                                else {
                                    break;
                                }
                            }
                        }

                        if (this.searchForm.value[this.array[i]] == "Trên 2019") {
                            if (this.movie[j].release_year > 2019) {
                                if (i == this.array.length - 1) {
                                    this.list.push(this.movie[j]);
                                    break;
                                }
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
            if (this.list[0] == undefined) {
                this.result = false;
            } else {
                // console.log(this.list);
                this.movies = this.list;
                // this.pagedItems = this.movies;
                // console.log(this.movies);
                this.result = true;
            }
        }
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.movieService.getPager(this.movies.length, page);

        // get current page of items
        this.pagedItems = this.movies.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    handleData(event) {
        // console.log(event);
        this.pagedItems = event;
        this.statusEachMovie = true;
        // console.log(event);
    }


}
