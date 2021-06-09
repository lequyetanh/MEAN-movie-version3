import { NgModule } from '@angular/core';

import { ProfileComponent } from './../user/profile/profile.component';
import { CollectionComponent } from './../user/collection/collection.component';
import { DonateComponent } from './../user/donate/donate.component';
import { UserComponent } from './../user/user.component';

import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from './../share/share.module';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'donate', component: DonateComponent },
    { path: 'collection', component: CollectionComponent },
];

@NgModule({
    declarations: [
        ProfileComponent,
        CollectionComponent,
        DonateComponent,
        UserComponent,
    ],
    imports: [
        ShareModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
    bootstrap: []
})
export class UserModule { }

// ng add @angular/material: Purple/Green