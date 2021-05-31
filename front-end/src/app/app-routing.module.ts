import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/content/index/index.component';
import { SearchComponent } from './component/content/search/search.component';
import { DetailmovieComponent } from './component/content/detailmovie/detailmovie.component';
import { FilterComponent } from './component/content/filter/filter.component';
import { AllmovieComponent } from './component/content/allmovie/allmovie.component';
import { EditComponent } from './component/admin/admin-movie/edit/edit.component';
import { CreateComponent } from './component/admin/admin-movie/create/create.component';
import { WatchmovieComponent } from './component/content/watchmovie/watchmovie.component';
import { AdminComponent } from './component/admin/admin.component';
import { NotFoundComponent } from './component/content/not-found/not-found.component';
import { AboutComponent } from './component/content/about/about.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { DonateComponent } from './component/user/donate/donate.component';
import { CollectionComponent } from './component/user/collection/collection.component';
const routes: Routes = [
    { path: '', redirectTo: '/movie', pathMatch: 'full' },
    { path: 'movie', component: IndexComponent },
    { path: 'detailmovie/:id', component: DetailmovieComponent },
    { path: 'watchmovie/:id', component: WatchmovieComponent },

    { path: 'filter', component: FilterComponent },
    { path: 'movietype/:type', component: AllmovieComponent },
    { path: 'search/:name', component: SearchComponent },
    { path: 'about', component: AboutComponent },

    {
        path: 'user',
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'donate', component: DonateComponent },
            { path: 'collection', component: CollectionComponent },
        ]
    },
    {
        path: 'admin',
        children: [
            { path: '', component: AdminComponent },
            { path: 'create', component: CreateComponent },
            { path: 'edit/:id', component: EditComponent },
        ]
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
