import { Component, OnInit, NgZone, Input, EventEmitter, ElementRef, Output, ViewChildren } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { AfterViewInit, Directive, ViewChild } from '@angular/core';
import * as $ from 'jquery';


@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

    videoForm: FormGroup;
    indexTag = {};
    listTag: any = {};
    datatagForm: any = [];
    statusFormEdit = '';
    @Input() data: any;
    subtitle: String;
    @Output("keyEditForm") dataTag = new EventEmitter();
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
    ) { }

    ngOnInit() {
        this.listTag.name = this.data.name;
        this.statusFormEdit = this.data.name;

        console.log(this.data);
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

    dataReturn() {
        this.listTag.content = [];
        let count = 0;
        while (true) {
            if ($('.tagItem')[count]) {
                if ($('.tagItem')[count].value == '') {
                    count++;
                    continue;
                } else {
                    this.listTag.content.push($('.tagItem')[count++].value);
                }
            } else {
                break;
            }
        }
        // console.log(this.listTag);
        this.dataTag.emit(this.listTag);
    }

    dataMovieReturn() {
        this.listTag.content = [];

        let count = 0;
        // let eachMovie = {
        //     video: '',
        //     episode: '',
        //     subtitle: ''
        // };
        while (true) {
            if ($('.eachMovie')[count]) {
                //để biến eachMovie ở đây thì ok còn nếu để ở bên ngoài thì dính bug
                let eachMovie = {
                    video: '',
                    episode: '',
                    subtitle: ''
                };
                eachMovie.video = $('.video-edit-form')[count].value;
                eachMovie.episode = $('.episode-edit-form')[count].value;
                eachMovie.subtitle = $(".subtitle")[count].value;
                // console.log(eachMovie);
                count++;
                // console.log(this.listTag);
                this.listTag.content.push(eachMovie);
                // console.log(this.listTag);
            } else {
                break;
            }
        }

        // console.log(this.listTag);
        this.dataTag.emit(this.listTag);
    }

    addTag() {
        this.data.data.length = this.data.data.length + 1;
       
    }

    addContent() {
        this.data.data.length = this.data.data.length + 1;
    }

    addMovie() {
        // this.data.data.length = this.data.data.length + 1;
        this.data.data.push({
            video: null,
            episode:null,
            subtitle: 'VIETSUB',
        })
    }

    removeTag(index) {
        // console.log(index);
        // console.log(this.data)
        this.data.data.splice(index, 1);
    }

}
