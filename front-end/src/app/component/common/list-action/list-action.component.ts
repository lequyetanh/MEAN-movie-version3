import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { DataService } from "../../../service/data.service";

@Component({
    selector: 'app-list-action',
    templateUrl: './list-action.component.html',
    styleUrls: ['./list-action.component.scss']
})
export class ListActionComponent implements OnInit {

    @Input() data: any;
    @Input() inforUserComment: any;
    @Input() inforUserReply: any;
    @Output("keyListAction") dataReturn = new EventEmitter();
    user: any;
    constructor(
        private movieService: MovieService,
        private dataService: DataService,
    ) {
        this.dataService.getUser().subscribe(loggedIn => {
            // console.log(loggedIn)
            // this.user = loggedIn['loggedIn']
            if (loggedIn['loggedIn']) {
                this.user = loggedIn['user'];
            }
        });
    }

    ngOnInit() {
    }

    ngOnChanges() {
        // console.log(this.data)
        // console.log(this.inforUserComment)
        // console.log(this.inforUserReply)

    }

    // có khả năng data ở đây thay đổi thì data ở file cha cũng tự thay đổi theo

    updateIcon(icon: any) {
        if (this.user) {
            if (this.inforUserComment) {

                if (this.data.comment[this.inforUserComment.idUserComment - 1]['icon'][icon].indexOf(this.inforUserComment.name) >= 0) {
                    this.data.comment[this.inforUserComment.idUserComment - 1]['icon'][icon].splice(this.data.comment[this.inforUserComment.idUserComment - 1]['icon'][icon].indexOf(this.inforUserComment.name), 1);
                } else {
                    this.data.comment[this.inforUserComment.idUserComment - 1]['icon'][icon].push(this.inforUserComment.name);
                }
                this.dataReturn.emit(this.data);

                // console.log(this.data.comment);
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe(
                    () => {
                        this.dataReturn.emit(this.data);
                    }
                )
            }
            if (this.inforUserReply) {

                if (this.data.comment[this.inforUserReply.idUserComment - 1]['reply'][this.inforUserReply.idUserReply - 1]['icon'][icon].indexOf(this.inforUserReply.name) >= 0) {
                    this.data.comment[this.inforUserReply.idUserComment - 1]['reply'][this.inforUserReply.idUserReply - 1]['icon'][icon].splice(this.data.comment[this.inforUserReply.idUserComment - 1]['reply'][this.inforUserReply.idUserReply - 1]['icon'][icon].indexOf(this.inforUserReply.name), 1);
                } else {
                    this.data.comment[this.inforUserReply.idUserComment - 1]['reply'][this.inforUserReply.idUserReply - 1]['icon'][icon].push(this.inforUserReply.name);
                }
                this.dataReturn.emit(this.data);

                // console.log(this.data.comment);
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe(
                    () => {
                        this.dataReturn.emit(this.data);
                    }
                )
            }
        }else{
            alert("Bạn Phải Đăng Nhập Để Sử Dụng Tính Năng Này")
        }
    }
}
