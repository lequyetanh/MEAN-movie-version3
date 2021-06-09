import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
    @Input() data: any;
    @Output("keyPagination") dataReturn = new EventEmitter();
    constructor(
        private movieService: MovieService,
        private router: Router,
        private ngZone: NgZone
    ) {
        // console.log(this.data);
    }

    ngOnInit() {
        // console.log(this.data);
        // this.setPage(1);
    }

    ngOnChanges() {
        // console.log(this.data);
        this.setPage(1);
    }

    sendData() {
        this.dataReturn.emit(this.pagedItems);
    }

    delete(id: number): void {
        let result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            this.movieService.deleteMovie(id).subscribe(
                (res) => {
                    this.ngOnInit();
                    // console.log('Movie successfully delete!');
                }, (error) => {
                    // console.log(error);
                });
        }
    }

    deleteUser(id: number): void {
        let result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            this.movieService.deleteUser(id).subscribe(
                (res) => {
                    this.ngOnInit();
                    // console.log('User successfully delete!');
                }, (error) => {
                    // console.log(error);
                });
        }
    }

    setPage(page: number) {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        // get pager object from service
        this.pager = this.movieService.getPager(this.data.length, page);
        // console.log(this.pager.totalPages)

        // get current page of items
        this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.sendData();
    }

    previousPage(page) {
        if (page > 0 && page <= this.pager.totalPages) {
            this.setPage(page);
        }
    }

    nextPage(page) {
        if (page > 0 && page <= this.pager.totalPages) {
            this.setPage(page);
        }
    }

}
