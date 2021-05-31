
import { MovieService } from '../../service/movie.service';
import { DataService } from '../../service/data.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    movie: any;
    loggedIn: any;
    admin: any;
    genre: any = [];
    country: any = [];
    allUser: any;
    statusAccess = false;
    status = 'movie';
    constructor(
        private movieService: MovieService,
        private dataService: DataService,
        public authService: AuthService,
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.dataService.checkAdmin().subscribe((dataAdmin) => {
            // console.log(dataAdmin);
            if (dataAdmin['loggedIn']) {
                // console.log("hello world");
                this.getAllMovie();
                this.getAllCountry();
                this.getAllGenre();
                this.getAllUser();
            } else {
                this.router.navigateByUrl('/movie');
                alert("please login with authorization admin");
            }
            // console.log(favoriteMovie);
        });
    }
    pagedItems: any = [null];

    ngOnInit() {

    }

    getAllUser() {
        this.dataService.getAllUser().subscribe((allUser) => {
            // console.log(allUser);
            this.allUser = allUser;
        })
    }

    getAllMovie(): void {
        this.movieService.getAllMovie().subscribe(
            (Movie) => {
                // console.log(Movie);
                this.movie = Movie;
                this.statusAccess = true;
                // this.setPage(1);
            }
        )
    }

    getAllCountry() {
        this.movieService.getCountry().subscribe(data => {
            this.country = data;
            // this.setPage(1);
        })
    }

    getAllGenre() {
        this.movieService.getCategory().subscribe(data => {
            this.genre = data;
        })
    }

    handleData(event) {
        this.pagedItems = event;
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        // console.log(event);
    }

    clickItem(event) {
        this.status = event.srcElement.innerHTML.toLowerCase();
        // console.log(this.status);
    }

}
