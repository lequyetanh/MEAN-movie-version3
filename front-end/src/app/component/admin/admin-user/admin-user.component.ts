import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
    @Input() dataUser: any;
    constructor(
        private movieService: MovieService,
        private router: Router,
        private ngZone: NgZone 
    ) { }

    ngOnInit() {
        // console.log(this.dataUser);
    }

    deleteUser(id: number): void {
        let result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            for (let i = 0; i < this.dataUser.length; i++) {
                // console.log(this.dataUser[i]);
                if (this.dataUser[i].id == id) {
                    this.dataUser.splice(i, 1);
                    // console.log(this.dataUser)
                }
            }
            this.movieService.deleteUser(id).subscribe(
                (res) => {
                    alert('User successfully delete!');
                }, (error) => {
                    console.log(error);
                });
        }
    }

}
