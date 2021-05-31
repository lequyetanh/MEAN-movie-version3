import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    uid = '';
    loggedIn: Subject<boolean>;
    moviesURL: string = 'https://xemphimplus.herokuapp.com/movie';
    countryURL: string = 'https://xemphimplus.herokuapp.com/country';
    categoryURL: string = 'https://xemphimplus.herokuapp.com/category';
    userURL: string = "https://xemphimplus.herokuapp.com/api";
    useURL: string = "https://xemphimplus.herokuapp.com/user";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        private afAuth: AngularFireAuth,
        private dbf: AngularFirestore,
    ) {
        this.afAuth.authState.subscribe(auth => {
            auth ? this.uid = auth.uid : this.uid = null;
            // console.log(this.uid);
        });
        this.loggedIn = new Subject();
        this.checkLogin();
        this.getUser();

        // this.getMovieCategory();
    }

    checkLogin() {
        var cookie = this.getCookie('token');
        this.http
            .get(`${this.useURL}/checkUser`, {
                headers: {
                    authorization: cookie
                }
            }).subscribe(
                (resp: any) => {
                    // console.log(resp);
                    // return resp.loggedIn;
                    this.loggedIn.next(resp);
                },
            );
    }

    getUser() {
        var cookie = this.getCookie('token');
        return this.http
            .get(`${this.useURL}/checkUser`, {
                headers: {
                    authorization: cookie
                }
            });
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    checkUser() {
        var cookie = this.getCookie('token');
        if (cookie) {
            this.checkLogin();
            return this.http.get(`${this.useURL}/checkUser`, {
                headers: {
                    authorization: cookie
                }
            });
        } else {
            alert("You have login first");
        }
    }

    checkAdmin() {
        var cookie = this.getCookie('token');

        return this.http.get(`${this.useURL}/checkAdmin`, {
            headers: {
                authorization: cookie
            }
        });
    }

    logout() {
        var cookie = this.getCookie('token');
        return this.http
            .get(`${this.useURL}/logout`, {
                headers: {
                    authorization: cookie
                }
            })
    }

    login(data): Observable<any> {
        let url = `${this.useURL}/login`;
        // console.log(data);
        return this.http.post(url, data);
    }
    
    getCountry() {
        return this.http.get(`${this.countryURL}`);
    }

    getCategory() {
        return this.http.get(`${this.categoryURL}`);
    }

    submitComment(id:any, commentForm:any){
        // console.log(id);
        // console.log(commentForm);
        let url = `${this.moviesURL}/update/${id}`;
        return this.http
            .put(url, commentForm, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }


    // Create
    createmovie(data): Observable<any> {
        let url = `${this.moviesURL}/create`;
        // console.log(data);
        return this.http.post(url, data)
            .pipe(
                catchError(this.errorMgmt)
            )
    }

    createUser(data): Observable<any> {
        let url = `${this.useURL}/create`;
        // console.log(data);
        return this.http.post(url, data)
            .pipe(
                catchError(this.errorMgmt)
            )
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    addFavoriteMovie(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.useURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    getAllUser(): Observable<any> {
        return this.http.get(`${this.useURL}`);
    }

    getUserFromName(name): Observable<any> {
        return this.http.get(`${this.useURL}/detailUser/name/${name}`);
    }

    addWatchLater(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.useURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }


    getMovieCategory(category: string) {
        this.dbf.collection('Users')
            .doc(`${this.uid}`)
            .collection('movie').doc('favoritemovie').get().subscribe(movie => {
                // console.log(movie);
            });
    }

    updateAvatar(id, name) {
        // console.log(name);
        return this.http.put(`${this.useURL}/update/${id}/avatar`, name);
    }
}


// ===============================================get, post, put, delete Admin ======================================