import { Component, OnInit, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
    selector: 'app-form-movie',
    templateUrl: './form-movie.component.html',
    styleUrls: ['./form-movie.component.scss']
})
export class FormMovieComponent implements OnInit {
    videoForm: FormGroup;
    subtitle: any = ['VIETSUB', 'Thuyết Minh'];
    listVideo = [''];
    dataVideoForm:any =[];
    @Output("keyFormMovie") data = new EventEmitter();
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
    ) { }

    ngOnInit() {
        this.mainForm();
    }

    mainForm() {
        this.videoForm = this.fb.group({
            video: [''],
            episode: [''],
            subtitle: ['']
        });
        this.videoForm.setValue({
            video: '',
            episode: '',
            subtitle: this.subtitle[0]
        });
    }

    updateSubtitle(e) {
        this.videoForm.get('subtitle').setValue(e, {
            onlySelf: true
        })
    }

    addVideo(){
        this.listVideo.length = this.listVideo.length+1;
        this.dataVideoForm.push(this.videoForm.value);
        console.log(this.dataVideoForm)
    }

    dataReturn(){
        this.dataVideoForm.push(this.videoForm.value);
        console.log(this.dataVideoForm);
        this.data.emit(this.dataVideoForm);
    }

}
