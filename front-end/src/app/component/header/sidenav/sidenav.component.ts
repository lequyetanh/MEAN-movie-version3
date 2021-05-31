import { Component, OnInit, Output, EventEmitter, HostBinding, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { MovieService } from '../../../service/movie.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    Category:any = [];
    Country: any = [];
    statusFormCountry = false;
    statusFormCategory = false;

    active = 'Trang Chủ';

    @Output("keySideNav") data = new EventEmitter();
    constructor(
        private movieService: MovieService,
    ) { }

    ngOnInit() {
        this.getCategoryFromServer();
        this.getCountryFromServer();
    }

    closeSideNav(){
        if(this.statusFormCategory == false && this.statusFormCountry == false){
            this.data.emit(false);
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

    toggleFormCountry(){
        this.statusFormCountry = !this.statusFormCountry;
        // console.log(this.statusFormCountry);
    }

    toggleFormCategory(){
        this.statusFormCategory = !this.statusFormCategory;
        // console.log(this.statusFormCategory);
    }

    change(event) {
        this.active = event.srcElement.innerHTML;
    }

}
