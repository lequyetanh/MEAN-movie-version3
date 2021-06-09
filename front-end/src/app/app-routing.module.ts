import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, Route, PreloadAllModules } from '@angular/router';

import { IndexComponent } from './component/content/index/index.component';
import { SearchComponent } from './component/content/search/search.component';
import { DetailmovieComponent } from './component/content/detailmovie/detailmovie.component';
import { WatchmovieComponent } from './component/content/watchmovie/watchmovie.component';
import { NotFoundComponent } from './component/content/not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/movie', pathMatch: 'full' },
    { path: 'movie', component: IndexComponent },
    { path: 'detailmovie/:id', component: DetailmovieComponent },
    { path: 'watchmovie/:id', component: WatchmovieComponent },
    {
        path: 'filter',
        loadChildren: () => import('./component/content/filter/filter.module').then(m => m.FilterModule),
    },
    { path: 'movietype/:type', 
    loadChildren: () => import('./component/content/allmovie/allmovie.module').then(m => m.AllMovieModule),
    },
    { path: 'search/:name', 
    loadChildren: () => import('./component/content/search/search.module').then(m => m.SearchModule),
    },
    { path: 'about', 
    loadChildren: () => import('./component/content/about/about.module').then(m => m.AboutModule),
    },
    {
        path: 'user',
        loadChildren: () => import('./component/user/user.module').then(m => m.UserModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./component/admin/admin.module').then(m => m.AdminModule),
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }


