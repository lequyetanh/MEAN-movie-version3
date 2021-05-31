import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../service/movie.service";
import { AuthService } from "../../../service/auth.service";
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../../../service/data.service";

@Component({
    selector: "app-collection",
    templateUrl: "./collection.component.html",
    styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {

    loggedIn: boolean;
    user: any;
    statusFormMessenger:boolean = false;
    messenger: string;

    constructor(
        private movieService: MovieService,
        private authService: AuthService,
        private dataService: DataService,
        private router: Router,
        private ngZone: NgZone,
    ) {
        window.scrollTo({ left: 0, top: 0 });

    }

    ngOnInit() {
        this.dataService.getUser().subscribe((loggedIn) => {
            // console.log(loggedIn);
            this.loggedIn = loggedIn['loggedIn'];
            if (this.loggedIn == false) {
                this.router.navigateByUrl('/movie');
            } else {
                this.user = loggedIn['user'];
            }
        });
    }

    removeFavorite(movie: any, e): void {
        e.preventDefault();
        for (let i = 0; i < this.user['favorite'].length; i++) {
            // console.log(this.user['favorite'][i]);
            if (this.user['favorite'][i].id == movie.id) {
                this.user['favorite'].splice(i, 1);
                // console.log(this.user['favorite'])
            }
        }
        // console.log(this.user);
        this.dataService.addFavoriteMovie(this.user['id'], this.user).subscribe(res => {
            this.messenger = 'Xóa Phim Khỏi Danh Sách Thành Công';
            this.statusFormMessenger = true;
            setTimeout(() => {
                this.statusFormMessenger = false;
            }, 2000);
        }, (error) => {
            console.log(error)
        })
    }

    removeWatchLater(movie: any, e): void {
        e.preventDefault();
        for (let i = 0; i < this.user['watchLater'].length; i++) {
            // console.log(this.user['watchLater'][i]);
            if (this.user['watchLater'][i].id == movie.id) {
                this.user['watchLater'].splice(i, 1);
                // console.log(this.user['watchLater'])
            }
        }

        this.dataService.addFavoriteMovie(this.user['id'], this.user).subscribe(res => {
            this.messenger = 'Xóa Phim Khỏi Danh Sách Thành Công';
            this.statusFormMessenger = true;
            setTimeout(() => {
                this.statusFormMessenger = false;
            }, 2000);
        }, (error) => {
            console.log(error)
        })
    }
}
