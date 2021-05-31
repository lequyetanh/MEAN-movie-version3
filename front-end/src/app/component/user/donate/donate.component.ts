import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../service/data.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
    loggedIn:boolean;
    constructor(
        private dataService: DataService,
        private router: Router,
    ) {
        this.dataService.getUser().subscribe((loggedIn) => {
            // console.log(loggedIn);
            this.loggedIn = loggedIn['loggedIn'];
            if (this.loggedIn == false) {
                this.router.navigateByUrl('/movie');
            }
        });
    }

    ngOnInit() {
    }

}
