import { Component, OnInit, Input, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../../service/movie.service";
import { DataService } from "../../../service/data.service";
import { AuthService } from "../../../service/auth.service";
import { StateService } from "../../../service/state.service";

@Component({
    selector: "app-detailmovie",
    templateUrl: "./detailmovie.component.html",
    styleUrls: ["./detailmovie.component.scss"],
})
export class DetailmovieComponent implements OnInit {
    movie: any;
    movies: any = [];
    id: any;
    userId: any;
    loggedIn;
    user: any;
    favorite = false;
    watchLater = false;
    background: any;
    statusFormMessenger = false;
    statusFormLogin = false;
    messenger: string;
    list_star = [{
        type: 'blank',
        title: 'Rất Dở'
    }, {
        type: 'blank',
        title: 'Dở'
    }, {
        type: 'blank',
        title: 'Bình Thường'
    }, {
        type: 'blank',
        title: 'Hay'
    }, {
        type: 'blank',
        title: 'Rất Hay'
    }];
    indexStandard = [[0, 1.5], [2, 3.5], [4, 5.5], [6, 7.5], [8, 9.5]]
    currentUrl;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private movieService: MovieService,
        private dataService: DataService,
        public authService: AuthService,
        private stateService: StateService,
    ) {
        this.dataService.getUser().subscribe(loggedIn => {
            this.loggedIn = loggedIn['loggedIn'];
            if (loggedIn['loggedIn']) {
                this.user = loggedIn['user'];
                // console.log(this.user);
                this.getFavorite();
            } else {

            }
        });

        // this.user = this.stateService.user;
        console.log(this.user)
        window.scrollTo({ left: 0, top: 0 });
    }


    ngOnInit() {
        this.movieDetail();
    }

    movieDetail(): void {
        this.route.paramMap.subscribe(paramMap => {
            // console.log(this.router.url);
            this.currentUrl = "https://lequyetanh.github.io" + this.router.url;
            this.id = paramMap.get('id');
            this.movies = [];
            this.movieService.getMovieFromId(this.id).subscribe((movie) => {
                this.movie = movie;
                this.movie[0].views = this.numberWithCommas(this.movie[0].views);
                this.getListStar(this.movie[0].rate);
                this.getFavorite();
                // console.log(this.movie[0].rate_vote)
                // this.movie[0].rate_vote = this.numberWithCommas(this.movie[0].rate_vote);
                // console.log(movie);
                if (this.movie[0]['vice_name_image'][0] == '') {
                    this.background = "https://xemphimplus.net/assets/theme/v1/img/default-cover.webp";
                } else {
                    this.background = this.movie[0]['vice_name_image'][0];
                }
                // console.log(this.background);
                const category = this.movie[0].release_year;
                // console.log(id);
                this.movieService
                    .getMovieFromCategory(category)
                    .subscribe((category) => {
                        for (var i = 0; i < Object.keys(category).length; i++) {
                            if (category[i].id == this.id) {
                                continue;
                            } else {
                                this.movies.push(category[i]);
                            }
                        }
                    });
            });

            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        })
    }

    getListStar(rate) {
        // console.log(rate)
        for (let i = 0; i < this.list_star.length; i++) {
            if (rate > this.indexStandard[i][0] && rate <= this.indexStandard[i][1]) {
                this.list_star[i].type = 'fas fa-star-half-alt yellow';
            }
            if (rate > this.indexStandard[i][1]) {
                this.list_star[i].type = 'fas fa-star yellow';
            }
            if (rate <= this.indexStandard[i][0]) {
                this.list_star[i].type = 'fas fa-star';
            }
        }
        // console.log(this.list_star);
        this.stateService.updateList_star(this.list_star);
    }

    hover(index) {
        // console.log(index)
        for (let i = 0; i < this.list_star.length; i++) {
            if (index < i) {
                // console.log(i)
                // console.log(this.list_star[i])
                this.list_star[i].type = 'fas fa-star'
            } else {
                this.list_star[i].type = 'fas fa-star yellow'
            }
        }
    }

    numberWithCommas(x: string) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    rate_vote(number) {
        // console.log(typeof(number));
        this.movie[0].rate = Math.round((this.movie[0].rate * this.movie[0].rate_vote + number) / (++this.movie[0].rate_vote) * 100) / 100;
        this.updateMovie();
        // this.movie[0].rate_vote ++;
        // console.log(this.movie[0].rate);
    }

    updateMovie() {
        // console.log(this.movie[0].rate_vote)
        this.movieService.updateMovie(this.movie[0].id, { rate: this.movie[0].rate, rate_vote: this.movie[0].rate_vote })
            .subscribe(res => {
                // console.log('Content updated successfully!')
            }, (error) => {
                console.log(error)
            })
    }

    getFavorite() {
        this.userId = this.user.id;
        for (var i = 0; i < this.user.favorite.length; i++) {
            if (this.user.favorite[i].id == this.id) {
                this.favorite = true;
                break;
            } else {
                if (i == this.user.favorite.length - 1) {
                    this.favorite = false;
                }
                continue;
            }
        }

        // console.log(this.favorite);

        for (var i = 0; i < this.user.watchLater.length; i++) {
            if (this.user.watchLater[i].id == this.id) {
                this.watchLater = true;
                break;
            } else {
                if (i == this.user.watchLater.length - 1) {
                    this.watchLater = false;
                }
                continue;
            }
        }

        // console.log(this.watchLater);

    }


    pushFavorite(movie: any) {
        if (this.loggedIn == false) {
            this.messenger = 'You must login to use this function';
            this.statusFormLogin = true;
            setTimeout(() => {
                this.statusFormLogin = false;
            }, 2000);
        } else {
            this.user.favorite.push(movie);
            this.favorite = !this.favorite;
            this.dataService
                .addFavoriteMovie(this.userId, this.user)
                .subscribe(
                    (res) => {
                        this.messenger = 'Thêm Phim Vào Danh Sách Yêu Thích Thành Công';
                        this.statusFormMessenger = true;
                        setTimeout(() => {
                            this.statusFormMessenger = false;
                        }, 2000);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    pushWatchLater(movie: any) {
        if (this.loggedIn == false) {
            this.messenger = 'You Must Login To Use This Function';
            this.statusFormLogin = true;
            setTimeout(() => {
                this.statusFormLogin = false;
            }, 2000);
        } else {
            this.user.watchLater.push(movie);
            this.watchLater = !this.watchLater;
            this.dataService
                .addFavoriteMovie(this.userId, this.user)
                .subscribe(
                    (res) => {
                        this.messenger = 'Thêm Phim Vào Danh Sách Xem Sau Thành Công';
                        this.statusFormMessenger = true;
                        setTimeout(() => {
                            this.statusFormMessenger = false;
                        }, 2000);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    removeFavorite(movie: any): void {
        // console.log(movie)
        for (let i = 0; i < this.user.favorite.length; i++) {
            // console.log(this.user.favorite[i]);
            if (this.user.favorite[i].id == movie.id) {
                this.user.favorite.splice(i, 1);
                // console.log(this.user.favorite)
            }
        }

        // console.log(this.user.favorite.indexOf(movie));
        this.dataService.addFavoriteMovie(this.userId, this.user).subscribe(res => {
            this.favorite = false;
            this.messenger = 'Xóa Phim Khỏi Danh Sách Yêu Thích Thành Công';
            this.statusFormMessenger = true;
            setTimeout(() => {
                this.statusFormMessenger = false;
            }, 2000);
        }, (error) => {
            console.log(error)
        })
    }

    removeWatchLater(movie: any): void {

        for (let i = 0; i < this.user.watchLater.length; i++) {
            if (this.user.watchLater[i].id == movie.id) {
                this.user.watchLater.splice(i, 1);
                // console.log(this.user.watchLater)
            }
        }

        this.dataService.addFavoriteMovie(this.userId, this.user).subscribe(res => {
            this.watchLater = false;
            this.messenger = 'Xóa Phim Khỏi Danh Sách Xem Sau Thành Công';
            this.statusFormMessenger = true;
            setTimeout(() => {
                this.statusFormMessenger = false;
            }, 2000);
        }, (error) => {
            console.log(error)
        })

    }

    likeMovie() {
        if (this.user.like.indexOf(this.movie[0].name) >= 0) {
            this.user.like.splice(this.user.like.indexOf(this.movie[0].name), 1);
            this.dataService.addFavoriteMovie(this.user.id, this.user).subscribe();
        } else {
            this.user.like.push(this.movie[0].name);
            this.dataService.addFavoriteMovie(this.user.id, this.user).subscribe();
        }
    }

    loveMovie() {
        if (this.user.love.indexOf(this.movie[0].name) >= 0) {
            this.user.love.splice(this.user.love.indexOf(this.movie[0].name), 1);
            this.dataService.addFavoriteMovie(this.user.id, this.user).subscribe();
        } else {
            this.user.love.push(this.movie[0].name);
            this.dataService.addFavoriteMovie(this.user.id, this.user).subscribe();
        }
    }



    // postToFeed() {
    //     let url = 'http://www.facebook.com/sharer.php?u=' + "http://localhost:4200/detailmovie/11094";
    //     let newwindow = window.open(url, 'name', 'height=500,width=520,top=200,left=300,resizable');
    //     if (window.focus) {
    //         newwindow.focus()
    //     }
    // }
}

// bi bug ở chỗ favorite watchLater
