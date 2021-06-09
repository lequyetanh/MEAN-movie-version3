import { CoverComponent } from './../common/cover/cover.component';
import { PaginationComponent } from './../common/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './../common/alert/alert.component';
import { ContentComponent } from './../content/content.component';

import { MovieService } from './../../service/movie.service';
import { AuthService } from './../../service/auth.service';
import { DataService } from './../../service/data.service';
import { StateService } from './../../service/state.service';

import { Routes, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        CoverComponent,
        PaginationComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AlertComponent,
        ContentComponent
    ],
    declarations: [
        CoverComponent,
        PaginationComponent,
        AlertComponent,
        ContentComponent
    ],
    entryComponents: [
        CoverComponent,
        PaginationComponent,
        AlertComponent,
        ContentComponent
    ],
    providers: [
        MovieService,
        AuthService,
        DataService,
        StateService
    ],
})
export class ShareModule {}
