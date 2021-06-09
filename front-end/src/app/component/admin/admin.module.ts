import { NgModule } from '@angular/core';

import { EditComponent } from './admin-movie/edit/edit.component';
import { CreateComponent } from './admin-movie/create/create.component';
import { AdminComponent } from './admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminMovieComponent } from './admin-movie/admin-movie.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { FormMovieComponent } from './admin-movie/create/form-movie/form-movie.component';
import { EditFormComponent } from './admin-movie/edit/edit-form/edit-form.component';

// import { AdminRoutingModule } from './admin-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from './../share/share.module';

export const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditComponent },
];

@NgModule({
    declarations: [
        AdminComponent,
        EditComponent,
        CreateComponent,
        AdminUserComponent,
        AdminMovieComponent,
        AdminGenreComponent,
        AdminCountryComponent,
        FormMovieComponent,
        EditFormComponent,
    ],
    imports: [
        ShareModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
    bootstrap: []
})
export class AdminModule { }

// ng add @angular/material: Purple/Green