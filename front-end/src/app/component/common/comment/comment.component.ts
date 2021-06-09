import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { StateService } from '../../../service/state.service';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../../../service/data.service";
import { getLocaleDateFormat } from '@angular/common';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    @Input() data: any;
    @Output("keyPagination") dataReturn = new EventEmitter();
    movie: any;
    statusForm = true;
    commentForm: FormGroup;
    user: any = '';
    today = new Date();
    messenger;
    statusFormLogin;
    statusFormMessenger

    toggleListAction = '';
    toggleListActionUserReply = [null, null];
    toggleFormIcon = false;

    statusFormReply = null;
    contentRepyly: any;
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private dataService: DataService,
        public reduxService: StateService,
        private router: Router,
        private ngZone: NgZone,
        public fb: FormBuilder,
    ) {
        this.dataService.getUser().subscribe(loggedIn => {
            // console.log(loggedIn)
            // this.user = loggedIn['loggedIn']
            if (loggedIn['loggedIn']) {
                this.user = loggedIn['user'];
            }
        });

        // this.reduxService.toggleFormIcon.subscribe(toggleFormIcon => {
        //     this.toggleFormIcon = toggleFormIcon;
        // });
    }
    ngOnInit() {
        // console.log(this.data.comment)
    }

    ngOnChanges() {
        this.get6SameMovieFromCategory();
        this.mainForm();
    }

    mainForm() {
        this.commentForm = this.fb.group({
            content: [""],
        });
        this.commentForm.setValue({
            content: "",
        });
    }

    submitComment() {
        // console.log(this.user)
        if (this.user) {
            // console.log(this.user)
            this.commentForm.value.idUserComment = this.data.comment[this.data.comment.length - 1].idUserComment + 1;
            this.commentForm.value.avatar = this.user.avatar;
            this.commentForm.value.user = this.user.name;
            this.commentForm.value.time = this.today.getDate() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getFullYear() + ' ' + this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
            this.commentForm.value.like = [];
            this.commentForm.value.dislike = [];
            this.commentForm.value.icon = {
                like: [],
                love: [],
                haha: [],
                yay: [],
                wow: [],
                sad: [],
                angry: [],
            };
            this.commentForm.value.reply = [];
            this.data.comment.push(this.commentForm.value);
            // console.log(this.data.comment);
            this.dataService.submitComment(this.data.id, { comment: this.data.comment }).subscribe(() => {
                this.commentForm.setValue({
                    content: "",
                });
                this.messenger = 'Nhận xét thành công';
                this.statusFormMessenger = true;
                setTimeout(() => {
                    this.statusFormMessenger = false;
                }, 2000);
            })
        } else {
            this.messenger = 'You Must Login To Use This Function';
            this.statusFormLogin = true;
            setTimeout(() => {
                this.statusFormLogin = false;
            }, 2000);
        }
    }

    changeForm() {
        this.statusForm = !this.statusForm;
    }

    get6SameMovieFromCategory(): void {
        this.movieService.get6SameMovieFromCategory(this.data.category).subscribe(
            (Movie) => {
                // console.log(Movie)
                this.movie = Movie;
                for (var i = 0; i < this.movie.length; i++) {
                    this.movie[i].views = this.numberWithCommas(this.movie[i].views);
                }
            }
        )
    }

    numberWithCommas(x: string) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    replyUser(idUserComment) {
        if(this.user){
            this.statusFormReply = idUserComment;
        }else{
            alert("Bạn Phải Đăng Nhập Để Sử Dụng Tính Năng Này")
        }
    }

    submitFormReply(idUserComment) {
        if (this.user) {
            // console.log(this.data.comment[idUserComment - 1])
            let dataReply = {
                idUserReply: null,
                user: this.user.name,
                avatar: this.user.avatar,
                content: this.contentRepyly,
                time: this.today.getDate() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getFullYear() + ' ' + this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds(),
                like: [],
                dislike: [],
                icon: {
                    like: [],
                    love: [],
                    haha: [],
                    yay: [],
                    wow: [],
                    sad: [],
                    angry: [],
                }
            }
            if (this.data.comment[idUserComment - 1].reply[0]) {
                dataReply.idUserReply = this.data.comment[idUserComment - 1].reply[this.data.comment[idUserComment - 1].reply.length - 1].idUserReply + 1;
            } else {
                dataReply.idUserReply = 1;
            }
            // console.log(dataReply)

            this.data.comment[idUserComment - 1].reply.push(dataReply);

            this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe(
                () => {
                    this.statusFormReply = null;
                    this.contentRepyly = null;
                    this.messenger = 'Nhận xét thành công';
                    this.statusFormMessenger = true;
                    setTimeout(() => {
                        this.statusFormMessenger = false;
                    }, 2000);
                }
            )
        } else {
            this.messenger = 'You Must Login To Use This Function';
            this.statusFormLogin = true;
            setTimeout(() => {
                this.statusFormLogin = false;
            }, 2000);
        }
    }

    mouseMove(idUserComment) {
        this.toggleListAction = idUserComment;
    }

    mouseLeave(time) {
        this.toggleListAction = '';
    }

    mouseMoveUserReply(idUserComment, idUserReply) {
        this.toggleListActionUserReply[0] = idUserComment;
        this.toggleListActionUserReply[1] = idUserReply;
    }

    mouseLeaveUserReply(time) {
        this.toggleListActionUserReply = [null, null];
    }

    handleDataUserComment(data) {
        this.toggleListAction = '';
        this.toggleListActionUserReply = [null, null];
        // console.log(this.toggleListAction)
        // console.log(this.toggleListActionUserReply)
        this.data = data;
    }

    likeComment(idUserComment, like, dislike) {
        // console.log(data)
        if (this.user) {
            if (like >= 0) {
                this.data.comment[idUserComment - 1]['like'].splice(this.data.comment[idUserComment - 1]['like'].indexOf(this.user.name), 1);
            }
            else {
                this.data.comment[idUserComment - 1]['like'].push(this.user.name);
            }
            if (dislike >= 0) {
                this.data.comment[idUserComment - 1]['dislike'].splice(this.data.comment[idUserComment - 1]['dislike'].indexOf(this.user.name), 1);
                // console.log(this.data.comment[i]['dislike'])
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            } else {
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            }
        } else {
            alert("Bạn Phải Đăng Nhập Để Sử Dụng Tính Năng Này")
        }
    }

    dislikeComment(idUserComment, dislike, like) {
        if (this.user) {
            if (dislike >= 0) {
                this.data.comment[idUserComment - 1]['dislike'].splice(this.data.comment[idUserComment - 1]['dislike'].indexOf(this.user.name), 1);
            }
            else {
                this.data.comment[idUserComment - 1]['dislike'].push(this.user.name);
            }
            if (like >= 0) {
                this.data.comment[idUserComment - 1]['like'].splice(this.data.comment[idUserComment - 1]['like'].indexOf(this.user.name), 1);
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            } else {
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            }
        } else {
            alert("Bạn Phải Đăng Nhập Để Sử Dụng Tính Năng Này")
        }
    }

    likeCommentReply(idUserComment, idUserReply, like, dislike) {
        if (this.user) {
            if (like >= 0) {
                this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['like'].splice(this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['like'].indexOf(this.user.name), 1);
            }
            else {
                this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['like'].push(this.user.name);
            }
            if (dislike >= 0) {
                this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['dislike'].splice(this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['dislike'].indexOf(this.user.name), 1);
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            } else {
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            }
        } else {
            alert("Bạn Phải Đăng Nhập Để Sử Dụng Tính Năng Này")
        }
    }

    dislikeCommentReply(idUserComment, idUserReply, dislike, like) {
        if (this.user) {
            if (dislike >= 0) {
                this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['dislike'].splice(this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['dislike'].indexOf(this.user.name), 1);
            }
            else {
                this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['dislike'].push(this.user.name);
            }
            if (like >= 0) {
                this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['like'].splice(this.data.comment[idUserComment - 1]['reply'][idUserReply - 1]['like'].indexOf(this.user.name), 1);
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            } else {
                this.movieService.updateMovie(this.data.id, { comment: this.data.comment }).subscribe();
            }
        } else {
            alert("Bạn Phải Đăng Nhập Để Sử Dụng Tính Năng Này")
        }
    }

    toggleIconForm() {
        this.toggleFormIcon = !this.toggleFormIcon;
    }

    handleData(data) {
        // console.log(data);
        this.commentForm.setValue({
            content: this.commentForm.value.content + data,
        });
    }

}
