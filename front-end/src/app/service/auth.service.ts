import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { auth, firestore } from "firebase/app";
// import { firebase } from 'firebase';
import { Observable, of, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
import { DataService } from "./data.service";

import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

interface User {
    id?: number;
    email?: string;
    name?: string;
    avatar?: string;
    password?: string;
    watchLater?: any;
    favorite?: any;
}

@Injectable({
    providedIn: "root",
})
export class AuthService {
    loggedIn: Subject<any>;
    admin: Subject<boolean>;
    newAvatar: Subject<boolean>;
    moviesURL = 'https://xemphimplus.herokuapp.com/movie';
    countryURL = 'https://xemphimplus.herokuapp.com/country';
    categoryURL = 'https://xemphimplus.herokuapp.com/category';
    userURL = "https://xemphimplus.herokuapp.com/api";
    useURL = "https://xemphimplus.herokuapp.com/user"; 

    user: any;
    redirectUrl: string;
    uid = "";
    data2: any;
    allUser;

    constructor(
        public db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private dbf: AngularFirestore,
        private router: Router,
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private dataService: DataService,
    ) {
        this.loggedIn = new Subject();
        this.admin = new Subject();
        // this.getLogin();
        this.accessAdmin();
        // this.getNewAvatar();
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`Users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
        this.getAllUser();

    }

    getAllUser() {
        this.dataService.getAllUser().subscribe(allUser => {
            this.allUser = allUser;
            // console.log(this.allUser);
        });
    }

    /* CATEGORIES*/
    // addCategories() {
    //     const category = {
    //         userId: 123456789,
    //         name  : 'phimhanhdong'
    //     };
    //     return this.dbf.doc(`Categories`).set(category);
    // }

    getdata() {
        this.afAuth.auth.onAuthStateChanged((Users) => {
            // this.user = Users;
            // console.log(Users.displayName);
            if (Users) {
                return Users;
            } else {
                return of(null);
            }
        });
    }

    uploadImage(image: any) {
        console.log(image);
        return this.http.post(`${this.userURL}/upload`, image);
    }

    getFavorite() {
        // console.log("favorite");
        // console.log(this.http.get(`${this.useURL}/favorite`)); 
        return this.http.get(`${this.useURL}/favorite`, {
            withCredentials: true,
        });
    }

    changeAvatar(avatarImage) {
        this.loggedIn.next(avatarImage);
    }

    getNewAvatar() {
        this.http
            .get(`${this.userURL}/avatar`, {
                withCredentials: true, // <=========== important!
            })
            .subscribe(
                (resp: any) => {
                    // console.log(resp.newAvatar);
                    this.newAvatar.next(resp.newAvatar);
                }
            );
    }

    getProvider(name: string) {
        console.log(name)
        switch (name) {
            case "google":
                // console.log(new auth.GoogleAuthProvider());
                return new auth.GoogleAuthProvider();
            case "facebook":
                // console.log("facebook");
                return new auth.FacebookAuthProvider();
            case "twitter":
                // console.log("twitter");
                return new auth.TwitterAuthProvider();
        }
    }

    oAuthLogin(name: string, callback: any) {
        return this.afAuth.auth.signInWithPopup(this.getProvider(name))
            .then(credential => {
                const data: User = {
                    id: this.allUser[0].id + 1,
                    name: credential.user.displayName,
                    email: credential.user.email,
                    avatar: credential.user.photoURL,
                    password: '',
                    watchLater: [],
                    favorite: [],
                };
                for (var i = 0; i < this.allUser.length; i++) {
                    // console.log(data.email);
                    if (data.email == this.allUser[i].email) {
                        this.doLoginWithSocial(data.email).subscribe((dataReturn) => {
                            return dataReturn;
                        });
                        break;
                    } else {
                        if (i == this.allUser.length - 1) {
                            // console.log("almost done");
                            this.dataService.createUser(data).subscribe(data_1 => {
                                this.doLoginWithSocial(data_1.email).subscribe((dataReturn) => {
                                    return dataReturn;
                                });
                                this.getAllUser();
                                // this.router.navigate(["/"]);
                            });
                            break;
                        }
                        continue;
                    }
                }
            })
            .catch(err => callback(err));
    }

    checkLogin() {
        // console.log("hello world");
        return this.http
            .get(`${this.userURL}/login`, {
                withCredentials: true, // <=========== important!
            })
    }

    accessAdmin() {
        // console.log("hello world");
        return this.http
            .get(`${this.useURL}/admin`, {
                withCredentials: true, // <=========== important!
            })
    }

    signOut() {
        this.afAuth.auth.signOut();
        alert("Logout successfully!");
    }

    readUser() {
        return this.afAuth.authState;
    }

    deleteUser(callback: any) {
        return this.afAuth.authState.subscribe((authState) => {
            authState
                .delete()
                .then((success) => callback())
                .catch((error) => callback(error));
        });
    }

    getUser() {
        return this.http.get(`${this.useURL}`);
    }

    doLoginWithSocial(email: string) {
        // console.log(email, password);
        return this.http
            .post(
                `${this.useURL}/loginWithSocial`,
                {
                    email: email,
                }
            )
    }


    logout() {
        this.http
            .post(
                `${this.userURL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            )
            .subscribe(() => {
                this.loggedIn.next(false);
            });
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = "";
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
}

// =======================sử dụng cho SignIn, LogIn, LogOut, Update, Get, Post, Delete data user=========================