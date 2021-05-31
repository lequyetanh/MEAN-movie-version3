import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../../../service/movie.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-samemovie',
    templateUrl: './samemovie.component.html',
    styleUrls: ['./samemovie.component.scss']
})
export class SamemovieComponent implements OnInit {
    @Input()
    movie: any;
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private location: Location,
        private ngZone: NgZone,
        private router: Router,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) { 
        // console.log(this.movie);
    }

    ngOnInit() {
        // console.log(this.movie);
    }

    // onSubmit(id:any) {
    //     console.log("run");
    //     this.ngZone.run(() => this.router.navigateByUrl('/detailmovie/'(id)))       
    // }

}
