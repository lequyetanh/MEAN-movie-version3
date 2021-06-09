import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Movie } from './../../movieModel/movieModel';
import { Country } from './../../movieModel/countryModel';
import { Category } from './../../movieModel/categoryModel';
@Injectable({
    providedIn: 'root'
})

export class MovieService {
    moviesURL = 'https://xemphimplus.herokuapp.com/movie';
    countryURL = 'https://xemphimplus.herokuapp.com/country';
    categoryURL = 'https://xemphimplus.herokuapp.com/category';
    userURL = "https://xemphimplus.herokuapp.com/api";
    useURL = "https://xemphimplus.herokuapp.com/user"; 
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) { }

    // Get All Category
    getCategory() {
        return this.http.get(`${this.categoryURL}`);
    }

    getFavorite() {
        console.log("favorite");
        // console.log(this.http.get(`${this.useURL}/favorite`));
        return this.http.get(`${this.useURL}/favorite`, {
            withCredentials: true,
        });
    }

    getCountry() {
        return this.http.get(`${this.countryURL}`);
    }

    get12Moviebo() {
        return this.http.get(`${this.moviesURL}/get12phimbo`);
    }

    get40phimle() {
        return this.http.get(`${this.moviesURL}/get40phimle`);
    }

    get4samemovie(genre) {
        return this.http.get(`${this.moviesURL}/get4samemovie/${genre}`);
    }

    get18MovieHoatHinh() {
        return this.http.get(`${this.moviesURL}/get18phimhoathinh`);
    }

    get18MovieRecent() {
        return this.http.get(`${this.moviesURL}/get18phimmoi`);
    }

    get6MovieChieuRap() {
        return this.http.get(`${this.moviesURL}/get6phimchieurap`);
    }

    get15phim() {
        return this.http.get(`${this.moviesURL}/get15phim`);
    }

    get10MovieNew() {
        return this.http.get(`${this.moviesURL}/get10phimsapchieu`);
    }

    get6SameMovieFromCategory(category) {
        return this.http.get(`${this.moviesURL}/get6phimtuongtu/${category}`);
    }

    get12Moviele() {
        return this.http.get(`${this.moviesURL}/get12phimle`);
    }

    get10MovieChieuRap() {
        return this.http.get(`${this.moviesURL}/get10phimchieurap`);
    }

    get10Moviebo() {
        return this.http.get(`${this.moviesURL}/get10phimbo`);
    }

    get10Moviele() {
        return this.http.get(`${this.moviesURL}/get10phimle`);
    }

    //update
    updateMovie(id, data): Observable<Movie[]> {
        // console.log(data);
        return this.http.put<Movie[]>(`${this.moviesURL}/update/${id}`, data);
    }

    updateUser(id, data) {
        return this.http.put(`${this.useURL}/update/${id}`, data);
    }

    getMovieFromTypeYear(typeName: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/type/${typeName}/2019`);
    }

    getMovieFromId(id: number): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/detailmovie/${id}`);
    }

    getUserFromId(id: number) {
        // const url=`${this.moviesURL}/${id}`;//gọi đến đường dẫn phim
        // console.log(id);
        return this.http.get(`${this.useURL}/detailUser/${id}`);
    }

    getMovieFromCategory(release_year: number): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/detailmovie/samemovie/${release_year}`);
    }

    getMovieFromSearch(name: string): Observable<Movie[]> {
        console.log(name);
        return this.http.get<Movie[]>(`${this.moviesURL}/${name}`);
    }
    getMovieFromType(typeName: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/type/${typeName}`);
    }
    getMovieFromTheater(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/theater`);
    }


    deleteUser(id: any): Observable<any> {
        // console.log("movie service");
        // console.log(id);
        return this.http.delete(`${this.useURL}/delete/${id}`);
    }

    deleteMovie(id: any): Observable<any> {
        // console.log("movie service");
        // console.log(id);
        return this.http.delete(`${this.moviesURL}/delete/${id}`);
    }

    // Get all employees
    getAllMovie() {
        return this.http.get(`${this.moviesURL}`);
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    // đầu vào là tổng số phim, trang hiện tại, số phim trong 1 trang
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 25) {
        // tính tổng số trang cần hiển thị = tổng số phim / số phim trên 1 trang
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 5) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 > totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // calculate start and end item indexes

        // id của phim bắt đầu trong trang
        let startIndex = (currentPage - 1) * pageSize;
        // id của phim kết thúc trong trang
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        // danh sách các trang hiển thị trong website
        // Array.from(Array((endPage + 1) - startPage).keys())   ===== tạo 1 danh sách có endPage+1 - startPage phần tử bắt đầu từ 0 và kết thúc từ endPage - startPage
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        // console.log(pages);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

}


// ================================== get all data movie from database======================================