import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContentComponent } from './component/content/content.component';

import { DetailmovieComponent } from './component/content/detailmovie/detailmovie.component';
import { WatchmovieComponent } from './component/content/watchmovie/watchmovie.component';
import { IndexComponent } from './component/content/index/index.component';
import { AllmovieComponent } from './component/content/allmovie/allmovie.component';
import { EditComponent } from './component/admin/admin-movie/edit/edit.component';
import { CreateComponent } from './component/admin/admin-movie/create/create.component';
import { SamemovieComponent } from './component/common/samemovie/samemovie.component';
import { MovieService } from './service/movie.service';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/common/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileComponent } from './component/user/profile/profile.component';
import { CollectionComponent } from './component/user/collection/collection.component';
import { DonateComponent } from './component/user/donate/donate.component';
import { UserComponent } from './component/user/user.component';
import { AboutComponent } from './component/content/about/about.component';
import { CommentComponent } from './component/common/comment/comment.component';
import { SlideMovieComponent } from './component/content/index/slide-movie/slide-movie.component';
import { PaginationComponent } from './component/common/pagination/pagination.component';
import { SearchComponent } from './component/content/search/search.component';
import { FilterComponent } from './component/content/filter/filter.component';
import { WebSocketService } from './service/web-socket.service';
import { ReduxService } from './service/redux.service';
import { AdminUserComponent } from './component/admin/admin-user/admin-user.component';
import { AdminMovieComponent } from './component/admin/admin-movie/admin-movie.component';
import { AdminGenreComponent } from './component/admin/admin-genre/admin-genre.component';
import { AdminCountryComponent } from './component/admin/admin-country/admin-country.component';
import { FormMovieComponent } from './component/admin/admin-movie/create/form-movie/form-movie.component';
import { EditFormComponent } from './component/admin/admin-movie/edit/edit-form/edit-form.component';
import { SidenavComponent } from './component/header/sidenav/sidenav.component';
import { CoverComponent } from './component/common/cover/cover.component';
import { NotificationComponent } from './component/common/notification/notification.component';
import { AlertComponent } from './component/common/alert/alert.component';
import { ListActionComponent } from './component/common/list-action/list-action.component';
import { ListActionFixedComponent } from './component/common/list-action-fixed/list-action-fixed.component';
import { NotFoundComponent } from './component/content/not-found/not-found.component';
import { ListIconComponent } from './component/common/list-icon/list-icon.component';
import { AvatarComponent } from './component/common/avatar/avatar.component';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [
        // FileSelectDirective,
        AvatarComponent,
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        DetailmovieComponent,
        IndexComponent,
        WatchmovieComponent,
        SamemovieComponent,
        AllmovieComponent,
        AdminComponent,
        EditComponent,
        CreateComponent,
        LoginComponent,
        ProfileComponent,
        CollectionComponent,
        DonateComponent,
        UserComponent,
        AboutComponent,
        CommentComponent,
        SlideMovieComponent,
        PaginationComponent,
        SearchComponent,
        FilterComponent,
        AdminUserComponent,
        AdminMovieComponent,
        AdminGenreComponent,
        AdminCountryComponent,
        FormMovieComponent,
        EditFormComponent,
        SidenavComponent,
        CoverComponent,
        NotificationComponent,
        AlertComponent,
        ListActionComponent,
        ListActionFixedComponent,
        NotFoundComponent,
        ListIconComponent,
    ],
    imports: [
        CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'dix5fjiy9' } as CloudinaryConfiguration),
        FileUploadModule,
        ToastrModule.forRoot(),
        [BrowserModule],
        AppRoutingModule,
        BrowserAnimationsModule,
        A11yModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        MovieService,
        AuthService,
        DataService,
        AngularFireAuth,
        TranslateService,
        TranslateStore,
        WebSocketService,
        ReduxService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// ng add @angular/material: Purple/Green