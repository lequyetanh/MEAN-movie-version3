
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileSelectDirective } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { StateService } from '../../../service/state.service';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
    title = 'angular-cloudinary';

    constructor(private _uploadService: StateService) { }

    ngOnInit() {
        // this.onSelect(event);
    }

    files: File[] = [];

    onSelect(event) {
        // console.log(event);
        this.files.push(...event.addedFiles);
    }

    onRemove(event) {
        // console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }

    onUpload() {
        //Scape empty array
        if (!this.files[0]) {
            alert('Primero sube una imagen, por favor');
        }

        //Upload my image to cloudinary
        const file_data = this.files[0];
        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'angular_cloudinary');
        data.append('dix5fjiy9', 'codexmaker');

        this._uploadService.uploadImage(data).subscribe((response) => {
            if (response) {
                // console.log(response);
            }
        });
    }
}