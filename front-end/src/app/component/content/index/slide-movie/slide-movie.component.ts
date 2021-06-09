import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from "../../../../service/movie.service";
import * as $ from 'jquery';

@Component({
    selector: 'app-slide-movie',
    templateUrl: './slide-movie.component.html',
    styleUrls: ['./slide-movie.component.scss']
})
export class SlideMovieComponent implements OnInit {
    movie: any = [];
    listMovie: any = [];
    index = 1;
    background: any;
    active_nut = '0';
    loading = true;
    array5: any = [];
    @Output("keySlideMovie") dataReturn = new EventEmitter();
    constructor(
        private movieService: MovieService
    ) {
        this.array5.length = 5
        window.scrollTo({ left: 0, top: 0 });
    }

    ngOnInit() {
        this.get40phimle();
    }

    get40phimle() {
        this.movieService.get40phimle().subscribe((Movie) => {
            this.movie = Movie;
            let eachMovie: any = [];
            let count = 0;
            this.background = Movie[1].vice_name_image;
            for (let i = 0; i < Object.keys(Movie).length; i++) {
                eachMovie.push(Movie[i]);
                count++;
                if (count == 5) {
                    this.listMovie.push(eachMovie);
                    eachMovie = [];
                    count = 0;
                }
            }
            this.loading = false;
            this.dataReturn.emit(true);
        });
    }

    leftToRight() {
        // console.log("next")
        if (this.index == 39) {
            this.index = 0;
            this.background = this.movie[this.index++].vice_name_image;
        } else {
            this.background = this.movie[this.index++].vice_name_image;
        }
        var slide_sau = $('.slide-active').next();
        var nut_sau = $('.active_nut').next();
        if (slide_sau.length != 0) {
            $('.slide-active').addClass('bienmatbentrai').one('webkitAnimationEnd', function (event) {
                $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('slide-active');
            });
            slide_sau.addClass('slide-active').addClass('divaobenphai').one('webkitAnimationEnd', function (event) {
                $('.divaobenphai').removeClass('divaobenphai');
            });
            $('.round').removeClass('active_nut');
            nut_sau.addClass('active_nut');
        }
        else {
            $('.slide-active').addClass('bienmatbentrai').one('webkitAnimationEnd', function (event) {
                $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('slide-active');
            });
            $('.slide-item:first-child').addClass('slide-active').addClass('divaobenphai').one('webkitAnimationEnd', function (event) {
                $('.divaobenphai').removeClass('divaobenphai');
            });
            $('.round').removeClass('active_nut');
            $('.round:first-child').addClass('active_nut');
        }
    }

    rightToLeft() {
        // console.log("previous")
        if (this.index == 39) {
            this.index = 0;
            this.background = this.movie[this.index++].vice_name_image;
        } else {
            this.background = this.movie[this.index++].vice_name_image;
        }
        var slide_truoc = $('.slide-active').prev();
        var nut_truoc = $('.active_nut').prev();
        if (slide_truoc.length != 0) {
            $('.slide-active').addClass('bienmatbenphai').one('webkitAnimationEnd', function (event) {
                $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('slide-active');
            });
            slide_truoc.addClass('slide-active').addClass('divaobentrai').one('webkitAnimationEnd', function (event) {
                $('.divaobentrai').removeClass('divaobentrai');
            });
            $('.round').removeClass('active_nut');
            nut_truoc.addClass('active_nut');
        }
        else {
            $('.slide-active').addClass('bienmatbenphai').one('webkitAnimationEnd', function (event) {
                $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('slide-active');
            });
            $('.slide-item:last-child').addClass('slide-active').addClass('divaobentrai').one('webkitAnimationEnd', function (event) {
                $('.divaobentrai').removeClass('divaobentrai');
            });
            $('.round').removeClass('active_nut');
            $('.round:last-child').addClass('active_nut');
        }
    }

    clickButton(event) {
        if (this.index == 39) {
            this.index = 0;
            this.background = this.movie[this.index++].vice_name_image;
        } else {
            this.background = this.movie[this.index++].vice_name_image;
        }
        // console.log(event.srcElement.innerHTML);
        var current_nut = $('.active_nut').index() + 1;
        var click_nut = parseInt(event.srcElement.innerHTML) + 1;
        $('.round').removeClass('active_nut');
        this.active_nut = event.srcElement.innerHTML;
        // console.log(current_nut);
        // console.log(click_nut);

        if (click_nut > current_nut) {
            $('.slide-active').addClass('bienmatbentrai').one('webkitAnimationEnd', function (event) {
                $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('slide-active');
            });
            $('.slide-item:nth-child(' + click_nut + ')').addClass('slide-active').addClass('divaobenphai').one('webkitAnimationEnd', function (event) {
                $('.divaobenphai').removeClass('divaobenphai');
            });
        }
        if (click_nut < current_nut) {
            $('.slide-active').addClass('bienmatbenphai').one('webkitAnimationEnd', function (event) {
                $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('slide-active');
            });
            $('.slide-item:nth-child(' + click_nut + ')').addClass('slide-active').addClass('divaobentrai').one('webkitAnimationEnd', function (event) {
                $('.divaobentrai').removeClass('divaobentrai');
            });
        }
    }


}
