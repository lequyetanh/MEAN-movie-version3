import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReduxService {
    formSearch: Subject<boolean>;
    accountLogined: Subject<boolean>;
    list_star: Subject<Object>;
    // toggleFormIcon: Subject<boolean>;

    allMovie: any;
    constructor(private _http: HttpClient) {
        this.formSearch = new Subject();
        this.accountLogined = new Subject();
        this.list_star = new Subject();
        // this.toggleFormIcon = new Subject();
    }

    updateList_star(list_star){
        // console.log(list_star);
        this.list_star = (list_star);
        // console.log(this.list_star);
    }

    uploadImage(vals): Observable<any> {
        let data = vals;

        return this._http.post(
            'https://api.cloudinary.com/v1_1/codexmaker/image/upload',
            data
        );
    }

    checkStatus(){
        // console.log("check status")
        this.formSearch.next(false);
        this.accountLogined.next(false);
        // this.toggleFormIcon.next(false)
    }

}

// Các service có thể coi là nơi chứa các hàm chung và các biến chung 
// của tất cả các componnet ~ redux in reactjs
// những biến kiểu subscribe thì ngay khi thay đổi thì chỉ những component
// nào đang xuất hiện thì nó mới gọi đến đc còn các component khác thì không