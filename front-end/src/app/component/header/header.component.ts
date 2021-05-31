import { Component, HostListener, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import { ReduxService } from '../../service/redux.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MovieService } from '../../service/movie.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userName: any;

    loggedIn: boolean;
    error: string;
    avatar: string;
    listMovie: any = [];
    movies: any = [];
    toggle: boolean = false;
    newAvatar;
    interval: any;
    fixHeader: boolean = false;

    Country: any;
    movieName: any;
    Category: any;
    statusFormLogin: boolean = false;
    statusFormUser: boolean = false;
    statusSideNav: boolean = false;
    phimle: any = [];

    toggleForm: any;


    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone,
        public db: AngularFirestore,
        public dataService: DataService,
        public reduxService: ReduxService,
        public authService: AuthService,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private snackbar: MatSnackBar,
        public translateService: TranslateService,
        private media: MediaMatcher,
        private movieService: MovieService,
    ) {
        this.getAllMovie();
        this.dataService.getUser().subscribe((loggedIn) => {
            // console.log(loggedIn);
            if (loggedIn['loggedIn']) {
                this.userName = loggedIn['loggedIn'];
                this.avatar = loggedIn['user'].avatar;
            }
        });

        this.authService.loggedIn.subscribe(loggedIn => {
            if (loggedIn) {
                this.avatar = loggedIn;
                // alert('Avatar Updated Successfully!')
            }
        });

        this.reduxService.formSearch.subscribe(formSearch => {
            this.toggleForm = formSearch;
            console.log(formSearch)
        });
        this.reduxService.accountLogined.subscribe(statusFormUser => {
            this.statusFormUser = statusFormUser;
        });

        this.get10Moviele();
    }

    get10Moviele(): void {
        this.movieService.get10Moviele().subscribe(movie => {
            this.phimle = movie;

        })
    }

    ngOnChanges() {

    }

    @HostListener("window:scroll", ["$event"]) scrollHandler(event) {
        const height = window.scrollY;
        height >= 90 ? this.fixHeader = true : this.fixHeader = false;
    }

    clickMe() {
        // console.log("run");
        this.toggle = true;
        this.listMovie = this.movies;

        this.reduxService.formSearch.next(true);
        console.log(this.toggleForm)
    }

    blured() {
        // console.log("blured");
        this.toggle = false;
    }

    userLogin(event) {
        this.statusFormUser = false;
        this.dataService.getUser().subscribe((loggedIn) => {
            // console.log(loggedIn);
            this.userName = loggedIn['loggedIn'];
            if (loggedIn['loggedIn']) {
                this.avatar = loggedIn['user'].avatar;
            }
        });
    }

    redirect(movie: any) {
        this.router.navigate([`/detailmovie/${movie}`]);
    }

    close() {
        this.movieName = null;
        this.toggle = false;
    }

    // toggleForm() {
        // if(this.toggle == true){
        //     this.toggle = !this.toggle;
        // }
    // }

    getAllMovie(): void {
        this.movieService.getAllMovie().subscribe(movie => {
            this.movies = movie;
            // console.log("done")
        })
    }

    removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    ngOnInit() {
        this.toggle = false;
        this.getCategoryFromServer();
        this.getCountryFromServer();
    }

    onKeypressEvent(event: any) {
        // console.log("run")
        this.toggle = false;
        this.movieName = null;
        // console.log(this.toggle);
        this.router.navigate([`/search/${event}`]);
    }

    onKey(event: any) { // without type info
        // console.log(event.charCodeAt(1));

        this.listMovie = [];
        this.phimle = this.listMovie;
        for (let i = 0; i < this.movies.length; i++) {
            event = this.removeAccents(event).toLowerCase();
            let name = this.removeAccents(this.movies[i].name).toLowerCase();
            // let regxName = `/${this.searchName}/i`;
            // console.log(name);
            if (name.search(event) == -1) {
                continue;
            }
            else {
                this.listMovie.push(this.movies[i]);
                // console.log(this.listMovie);
            }
        }
        if (this.listMovie[0] == undefined) {
            // console.log("nothing");
            this.toggle = false;
        } else {
            this.toggle = true;
        }
    }

    getCategoryFromServer(): void {
        this.movieService.getCategory().subscribe(
            (updateCategory) => {
                // console.log(updateCategory);
                this.Category = updateCategory;
            }
        )
    }
    getCountryFromServer(): void {
        this.movieService.getCountry().subscribe(
            (updateCountry) => {
                this.Country = updateCountry;
            }
        )
    }


    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    onSignOut() {
        this.authService.signOut();
        window.location.reload();
    }

    setCookieDay(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    setCookieSecond(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    doLogout() {
        this.dataService.logout().subscribe((dataReturn) => {
            // console.log(dataReturn);
            this.setCookieSecond('token', dataReturn['token'], 1);
            this.userLogin("nothing");
            this.router.navigateByUrl('/movie');
        });
    }

    FormLogin() {
        this.statusFormLogin = !this.statusFormLogin;
    }

    handleData(event) {
        // console.log(event);
        this.statusFormLogin = event;
    }

    formUser() {
        // console.log(this.statusFormUser);
        this.statusFormUser = !this.statusFormUser;
    }

    openSideNav() {
        this.statusSideNav = !this.statusSideNav;
    }

    handleSideNav(event) {
        this.statusSideNav = event;
    }
}

