import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';

export const routes: Routes = [
    { path: '', component: SearchComponent },
];

@NgModule({
    declarations: [
        SearchComponent,
    ],
    imports: [
        ShareModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
    bootstrap: []
})
export class SearchModule { }