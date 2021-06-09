import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

export const routes: Routes = [
    { path: '', component: AboutComponent },
];

@NgModule({
    declarations: [
        AboutComponent,
    ],
    imports: [
        ShareModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
    bootstrap: []
})
export class AboutModule { }