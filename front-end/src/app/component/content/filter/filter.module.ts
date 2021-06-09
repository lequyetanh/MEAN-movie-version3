import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { Routes, RouterModule } from '@angular/router';

import { FilterComponent } from './filter.component';

export const routes: Routes = [
    { path: '', component: FilterComponent },
];

@NgModule({
    declarations: [
        FilterComponent,
    ],
    imports: [
        ShareModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
    bootstrap: []
})
export class FilterModule { }

// ng add @angular/material: Purple/Green