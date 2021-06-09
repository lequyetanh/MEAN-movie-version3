import { Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    HostListener,
    ChangeDetectorRef,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { DataService } from "./service/data.service";
import { AuthService } from "./service/auth.service";
import { StateService } from "./service/state.service";
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import *  as io from 'socket.io-client';


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public form: boolean = false;
    public button: boolean = true;
    public icon: boolean = true;
    allUser: Array<object>;
    loggedIn;
    index = 1;
    @ViewChild('snav', { static: true }) snav: any;

    constructor(
        private afAuth: AngularFireAuth,
        private dataService: DataService,
        public authService: AuthService,
        public reduxService: StateService,
        private router: Router,

    ) {
        // this.getAllUser();
    }

    toggleButton() {
        this.form = !this.form;
        this.icon = !this.icon;
    }

    scrollTop() {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }

    getAllUser() {
        this.dataService.getAllUser().subscribe(allUser => {
            this.allUser = allUser;
            // console.log(this.allUser);
        })
    }

    @HostListener("window:scroll", ["$event"])
    scrollHandler(event) {
        const height = window.scrollY;
        const el = document.getElementById("btn-returnToTop");
        height >= 500 ? (el.className = "show") : (el.className = "hide");
    }

    updateList_start() {
        this.index += 1;
        this.reduxService.updateList_start(this.index);
    }

    // rightClick(event) {
    //     event.preventDefault();
    // }

    // @HostListener('document:keydown', ['$event'])
    // handleKeyboardEvent(event: KeyboardEvent): void {
    //     if (event.keyCode == 123 || this.ctrlShiftKey(event, 'I') || this.ctrlShiftKey(event, 'J') || this.ctrlShiftKey(event, 'C') || event.ctrlKey && event.keyCode === 'U'.charCodeAt(0)) {
    //         event.preventDefault();
    //         // return false;
    //     }
    // }

    // ctrlShiftKey(e, keyCode) {
    //     // console.log(e.ctrlKey);  //xem có bấm nút ctrl không
    //     // console.log(e.shiftKey);  // xem có bấm nút shift không
    //     // console.log(e.keyCode);
    //     // console.log(keyCode.charCodeAt(0))

    //     // kiểm tra xem tổ hợp phím bấm có phải là tổ hợp phím của ctrl + shift + I/J/C không;
    //     // đúng thì return true else false;
    //     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    // }
}


// // Disable right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//     if (
//         e.keyCode === 123 ||
//         ctrlShiftKey(e, 'I') ||
//         ctrlShiftKey(e, 'J') ||
//         ctrlShiftKey(e, 'C') ||
//         (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//     )
//         return false;
// };