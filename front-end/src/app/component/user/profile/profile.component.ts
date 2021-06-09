import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from "../../../service/auth.service";
import { DataService } from "../../../service/data.service";
import { MovieService } from "../../../service/movie.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../../service/state.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: any;
    loggedIn;
    avatar: any;
    title = 'fileUpload';
    images;
    multipleImages = [];
    status = false;
    inforUser: FormGroup;
    success;
    messenger;

    listFriend = [];
    listGroup = [];
    constructor(
        private movieService: MovieService,
        private reduxService: StateService,
        private authService: AuthService,
        private dataService: DataService,
        private router: Router,
        private http: HttpClient,
        public fb: FormBuilder,
    ) {
        this.getFavorite();
    }

    ngOnInit() {

    }
    files: File[] = [];

    getFavorite() {
        this.dataService.getUser().subscribe((dataUser) => {
            if (dataUser['loggedIn']) {
                this.user = dataUser['user'];
                this.avatar = this.user.avatar;
                this.mainForm();
            } else {
                this.router.navigateByUrl('/login');
            }
        });
    }


    selectImage(event) {
        this.files = [];
        // console.log(event);

        this.files.push(event.target.files[0]);
        // this.avatar = event.target.files[0].name; 
        this.status = true;

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
            this.avatar = event.target.result;
        }
    }

    onSubmit() {
        const file_data = this.files[0];
        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'angular_cloudinary');
        data.append('dix5fjiy9', 'codexmaker');

        this.reduxService.uploadImage(data).subscribe((response) => {
            if (response) {
                this.movieService.updateUser(this.user.id, { avatar: response.url })
                    .subscribe(res => {
                        this.authService.changeAvatar(response.url)
                        this.messenger = 'Update avatar thành công!';
                        this.success = true;
                        setTimeout(() => {
                            this.success = false;
                        }, 2000);
                        // this.getFavorite();
                    }, (error) => {
                        console.log(error)
                    })
            }
        });

    }

    mainForm() {
        this.inforUser = this.fb.group({
            oldPassword: [''],
            newPassword: [''],
            confirmPassword: [''],
        });
        this.inforUser.setValue({
            oldPassword: this.user.password,
            newPassword: [''],
            confirmPassword: [''],
        });
    }

    changePassword() {
        if (window.confirm('Are you sure?')) {
            this.movieService.updateUser(this.user.id, { password: this.inforUser.value.newPassword })
                .subscribe(res => {
                    this.getFavorite();
                    this.messenger = 'Thay đổi mật khẩu thành công!';
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 2000);
                }, (error) => {
                    console.log(error)
                })
        }
    }

}
