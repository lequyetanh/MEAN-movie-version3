import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    loggedIn;
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        // this.authService.loggedIn.subscribe(loggedIn => {
        //     this.loggedIn = loggedIn;
        //     if (this.loggedIn == false) {
        //         this.router.navigateByUrl('/login');
        //     }
        // });
    }

    ngOnInit() {
    }

}
