import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { Routes, RouterModule } from '@angular/router';

import { AllmovieComponent } from './allmovie.component';

export const routes: Routes = [
    { path: '', component: AllmovieComponent },
];

@NgModule({
    declarations: [
        AllmovieComponent,
    ],
    imports: [
        ShareModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
    bootstrap: []
})
export class AllMovieModule { }