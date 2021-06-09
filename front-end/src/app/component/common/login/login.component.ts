import { Component, OnInit, Output, EventEmitter, HostBinding, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../../../service/data.service";
import *  as io from 'socket.io-client';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, firestore } from "firebase/app";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    SigninForm: FormGroup
    submittedLogin:boolean = false;
    submittedSignIn:boolean = false;
    error: string;

    checkLoginForm = {
        email: null,
        password: null,
    }

    // checkSignInForm = {
    //     username: null,
    //     email: null,
    //     password: null,
    // }

    loggedIn:boolean;
    allUser: any;
    @Output("keyLogin") statusFormLogin = new EventEmitter();
    @Output("keyUserLogin") nameUserLogin = new EventEmitter();
    statusForm = 'login';
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private dataService: DataService,
        private translateService: TranslateService,
        private afAuth: AngularFireAuth,
        private http: HttpClient,
    ) {
        this.mainForm();
        this.getAllUser();
    }

    ngOnInit() {
        this.authService.loggedIn.subscribe(loggedIn => {
            // console.log("ahihi");
            this.loggedIn = loggedIn;
            if (this.loggedIn == true) {
                // console.log("login running");
                this.router.navigateByUrl('/movie');
            }
        });
    }

    formSignin() {
        this.statusForm = 'signin';
    }

    formLogin() {
        this.statusForm = 'login';
    }

    mainForm() {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ["", [Validators.required]],
        });
        this.SigninForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });
        this.loginForm.setValue({
            email: "lequyetanh@gmail.com",
            password: "12345678",
        });
        this.SigninForm.setValue({
            name: "nguyen van a",
            email: "nguyenvana@gmail.com",
            password: "12345678",
        });
    }

    getProvider(name: string) {
        // console.log(name)
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

    login(name: string) {
        return this.afAuth.auth.signInWithPopup(this.getProvider(name))
            .then(credential => {
                const data = {
                    id: this.allUser[0].id + 1,
                    name: credential.user.displayName,
                    email: credential.user.email,
                    avatar: credential.user.photoURL,
                    password: '',
                    watchLater: [],
                    favorite: [],
                    like: [],
                    love: [],
                };
                for (var i = 0; i < this.allUser.length; i++) {
                    // console.log(data);
                    if (data.email == this.allUser[i].email) {
                        this.authService.doLoginWithSocial(data.email).subscribe((dataReturn) => {
                            this.setCookie('token', dataReturn['token'], 1);
                            this.router.navigateByUrl('/movie')
                            this.closeLoginForm();
                            this.userLogin();
                        });
                        break;
                    } else {
                        if (i == this.allUser.length - 1) {
                            this.dataService.createUser(data).subscribe(data_1 => {
                                this.authService.doLoginWithSocial(data_1.email).subscribe((dataReturn) => {
                                    this.setCookie('token', dataReturn['token'], 1);
                                    this.router.navigateByUrl('/movie')
                                    this.closeLoginForm();
                                    this.userLogin();
                                });
                            });
                            break;
                        }
                        continue;
                    }
                }
            })
            .catch(error => {
                alert(error)
            } );
    }

    getAllUser() {
        this.dataService.getAllUser().subscribe((dataReturn) => {
            // console.log(dataReturn);
            this.allUser = dataReturn;
        })
    }

    closeLoginForm() {
        this.statusFormLogin.emit(false);
    }

    userLogin() {
        this.nameUserLogin.emit(true);
    }

    // Getter to access form control
    get myForm() {
        return this.loginForm.controls;
    }

    // Getter to access form control
    get mySignInForm() {
        return this.SigninForm.controls;
    }

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000 * 10)); //10 day
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    doLogin() {
        this.submittedLogin = true;
        if (!this.loginForm.valid) {
            // alert("Điền sai kiểu dữ liệu")
            // return false
        } else {

            for (var i = 0; i < this.allUser.length; i++) {
                if (this.allUser[i].email == this.loginForm.value.email && this.allUser[i].password == this.loginForm.value.password) {

                    // console.log(this.loginForm.value);
                    this.dataService.login(this.loginForm.value).subscribe((dataReturn) => {
                        // console.log(dataReturn);
                        this.setCookie('token', dataReturn.token, 1);
                        this.router.navigateByUrl('/movie')
                        this.closeLoginForm();
                        this.userLogin();
                    });

                    // this.router.navigate(["/admin"]);

                    break;
                } else {
                    if (i == this.allUser.length - 1) {
                        alert("Email or password do not exist");
                        break;
                    }
                    continue;
                }
            }
        }
        setTimeout(() => {
            this.submittedLogin = false;
        }, 2000)
    }

    doSignin() {

        this.submittedSignIn = true;
        if (!this.SigninForm.valid) {
            // alert("Điền sai kiểu dữ liệu")
            // return false
        } else {
            // alert("OK babe")
            this.SigninForm.value.id = this.allUser[0].id + 1;
            this.SigninForm.value.watchLater = [];
            this.SigninForm.value.favorite = [];
            this.SigninForm.value.avatar = '';
            for (var i = 0; i < this.allUser.length; i++) {
                // console.log(data.email);
                if (this.SigninForm.value.email == this.allUser[i].email) {
                    alert('Email Đã Tồn Tại');
                    break;
                } else {
                    if (i == this.allUser.length - 1) {
                        // console.log("almost done");
                        this.dataService.createUser(this.SigninForm.value).subscribe(data_1 => {
                            this.formLogin();
                        });
                        break;
                    }
                    continue;
                }
            }
        }
        setTimeout(() => {
            this.submittedSignIn = false;
        }, 2000)

    }

    checkEmailLogin() {

    }
}


