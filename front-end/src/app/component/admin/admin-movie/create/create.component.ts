import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../../../../service/data.service';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    movieForm: FormGroup;
    tags: any = [];
    actor: any = [];
    vice_name_image: any = [];
    content: any = [];

    category: any = ['phim bộ', 'phim lẻ']

    country: any = [];
    selectedCountry: any = [];
    listCountry: any = [];
    statusFormTag = 'tags';

    // genre:any=["phim hành động", "phim hồi hộp-gay cấn", "phim viễn tưởng", "phim chiến tranh", "phim hình sự", "phim phiêu lưu", "phim hài hước", "phim võ thuật", "phim kinh dị", "phim bí ẩn-siêu nhiên", "phim cổ trang", "phim thần thoại", "phim tâm lý", "phim tài liệu", "phim tình cảm-lãng mạng", "phim chính kịch", "phim thể thao-âm nhạc", "phim gia đình", "phim hoạt hình"];
    genre: any = [];
    selectedgenre: any = [];
    listgenre: any = [];
    name_image = 'https://bilugo.com/upload/images/2021/01/xao-quyet-2020_1611205561.jpg';

    constructor(
        private dataService: DataService,
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
    ) {
        this.getData();
    }

    ngOnInit() {
        this.mainForm();
        // for (let i = 0; i < 3; i++) {
        //     this.addActor();
        //     this.addContent();
        //     this.addTag();
        //     this.addViceImage();
        // }
    }

    updateCategory(e) {
        this.movieForm.get('category').setValue(e, {
            onlySelf: true
        })
    }

    addgenre() {
        const arr = this.genre.map(item => {
            return this.fb.control(false);
        });
        return this.fb.array(arr);
    }

    addCountry() {
        const arr = this.country.map(item => {
            return this.fb.control(false);
        });
        return this.fb.array(arr);
    }

    get genreArray() {
        return <FormArray>this.movieForm.get('genre');
    }

    get countryArray() {
        return <FormArray>this.movieForm.get('country');
    }


    getSelectedgenre() {
        this.selectedgenre = [];
        this.genreArray.controls.forEach((control, i) => {
            if (control.value) {
                this.selectedgenre.push(this.genre[i]);
            }
        });
        // console.log(this.selectedgenre);
    }

    getSelectedCountry() {
        this.selectedCountry = [];
        this.countryArray.controls.forEach((control, i) => {
            if (control.value) {
                this.selectedCountry.push(this.country[i]);
            }
        });
        // console.log(this.selectedCountry);
    }

    mainForm() {
        // console.log(this.listgenre);
        this.movieForm = this.fb.group({
            name: [''],
            status: [''],
            release_year: [''],
            rate: [''],
            IMDb: [''],
            name_image: [''],
            trailer: [''],
            real_name: [''],
            views: [''],
            run_time: [''],
            rate_vote: [''],
            IMDb_vote: [''],
            director: [''],
            category: [''],
            tags: this.fb.array([this.addTagGroup()]),
            actor: this.fb.array([this.addActorGroup()]),
            genre: this.addgenre(),
            country: this.addCountry(),
            vice_name_image: this.fb.array([this.addViceImageGroup()]),
            content: this.fb.array([this.addContentGroup()]),
            // name_video: [''],
        });
        this.movieForm.setValue({
            name: 'Avatar 2',
            status: 'VietSub',
            release_year: 2017,
            rate: 6,
            IMDb: null,
            name_image: this.name_image,
            trailer: '',
            real_name: 'Avatar 2',
            views: 36746,
            run_time: 120,
            rate_vote: 1234,
            IMDb_vote: null,
            director: 'James Cameron',
            category: this.category[1],
            tags: [
                {
                    tags: "avatar"
                }
            ],
            actor: [{
                actor: "Bill Gate",
            }],
            genre: this.listgenre,
            country: this.listCountry,
            vice_name_image: [{
                vice_name_image: 'avatar-2-2017-big',
            }],
            content: [{
                content: 'Avatar là câu chuyện về người anh hùng “bất đắc dĩ” Jake Sully – một cựu sĩ quan thủy quân lục chiến bị liệt nửa thân. Người anh em sinh đôi của anh được chọn để tham gia vào chương trình cấy gien với người ngoài hành tinh Na’vi nhằm tạo ra một giống loài mới có thể hít thở không khí tại hành tinh Pandora. Giống người mới này được gọi là Avatar. Sau khi anh của Jake bị giết, Jake được chọn để thay thế anh mình và đã trở thành một Avatar, Jake có nhiệm vụ đi tìm hiểu và nghiên cứu hành tinh Pandora. Những thông tin mà anh thu thập được rất có giá trị cho chiến dịch xâm chiếm hành tinh xanh thứ hai này của loài người.',
            }]
            // name_video: 'https://www.youtube.com/watch?v=6ziBFh3V1aM&pbjreload=101',
        });
    }

    addTagGroup() {
        return this.fb.group({
            tags: [],
        });
    }

    addTag() {
        this.tagArray.push(this.addTagGroup());
    }
    removeTag(index) {
        this.tagArray.removeAt(index);
    }
    get tagArray() {
        return <FormArray>this.movieForm.get('tags');
    }


    addActorGroup() {
        return this.fb.group({
            actor: [],
        });
    }
    addActor() {
        this.actorArray.push(this.addActorGroup());
    }
    removeActor(index) {
        this.actorArray.removeAt(index);
    }
    get actorArray() {
        return <FormArray>this.movieForm.get('actor');
    }

    addContentGroup() {
        return this.fb.group({
            content: [],
        });
    }
    addContent() {
        this.contentArray.push(this.addContentGroup());
    }
    removeContent(index) {
        this.contentArray.removeAt(index);
    }
    get contentArray() {
        return <FormArray>this.movieForm.get('content');
    }

    addViceImageGroup() {
        return this.fb.group({
            vice_name_image: [],
        });
    }
    addViceImage() {
        this.vice_name_imageArray.push(this.addViceImageGroup());
    }
    removeViceImage(index) {
        this.vice_name_imageArray.removeAt(index);
    }
    get vice_name_imageArray() {
        return <FormArray>this.movieForm.get('vice_name_image');
    }

    getData() {
        this.dataService.getCountry().subscribe(country => {
            for (var i = 0; i < Object.keys(country).length; i++) {
                this.country.push(country[i].name);
                this.listCountry.push(false);
            }

            // console.log(this.country);
            this.dataService.getCategory().subscribe(genre => {
                for (var i = 0; i < Object.keys(genre).length; i++) {
                    this.genre.push(genre[i].name);
                    this.listgenre.push(false);
                }
                // console.log(this.genre);
                this.ngOnInit();
            });
        });
    }

    get myForm() {
        return this.movieForm.controls;
    }

    handleData(event) {
        console.log(event)
        this.movieForm.value.movie = event;
    }

    onSubmit() {
        if (this.movieForm.value.movie == undefined) {
            alert("Bạn Chưa Save");
        } else {
            this.movieForm.value.tags.forEach(element => {
                this.tags.push(element.tags);
            })

            this.movieForm.value.actor.forEach(element => {
                this.actor.push(element.actor);
            })

            this.movieForm.value.content.forEach(element => {
                this.content.push(element.content);
            })

            this.movieForm.value.vice_name_image.forEach(element => {
                this.vice_name_image.push(element.vice_name_image);
            })

            this.movieForm.value.tags = this.tags;
            this.movieForm.value.actor = this.actor;
            this.movieForm.value.vice_name_image = this.vice_name_image;
            this.movieForm.value.content = this.content;
            this.movieForm.value.genre = this.selectedgenre;
            this.movieForm.value.country = this.selectedCountry;
            this.movieForm.value.id = 111111;
            this.movieForm.value.hrefLink = '';
            // console.log(this.movieForm.value);
            this.dataService.createmovie(this.movieForm.value).subscribe(
                (res) => {

                    console.log('Movie successfully created!');
                    this.ngZone.run(() => this.router.navigateByUrl('/admin'))
                }, (error) => {
                    console.log(error);
                });
        }
    }

    clickItem(event) {
        this.statusFormTag = event.srcElement.innerHTML;
        // console.log(this.status);
    }

}