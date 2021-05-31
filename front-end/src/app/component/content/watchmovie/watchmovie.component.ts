import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Directive, ViewChild, HostListener } from '@angular/core';
import { DataService } from "../../../service/data.service";
import { ReduxService } from "../../../service/redux.service";
import * as $ from 'jquery';

@Component({
    selector: 'app-watchmovie',
    templateUrl: './watchmovie.component.html',
    styleUrls: ['./watchmovie.component.scss']
})
export class WatchmovieComponent implements OnInit, AfterViewInit {
    movie: any;
    movies: any;
    video: any;
    statusVolume = "volume-down";
    statusVideo = "play";
    statusScreen = "default";
    currentSpeed = "1.0x";

    light_off = false;
    loggedIn;
    user;
    ad = true;
    timeMouseMove = 0;
    timerId;
    statusSubtitle = 'English';


    listSpeed: boolean = false;
    listSubtitle: boolean = false;
    listResolution: boolean = false;
    statusSameMovie = false;
    statusMovie = false;

    vietsub: any = [];
    thuyetminh: any = [];
    episode: any = 'Tập 1';
    showControl = true;
    statusEpisode = {
        episode: "Tập 1",
        subtitle: "VIETSUB"
    };
    statusBtCenter = 'play';
    forward_10 = false;
    backward_10 = false;
    list_star: any = [];


    // ================================dom==============================
    currentDuration: any;
    endDuration: any;
    seekBarPercentage: any;
    interval: any;
    timeInterval: any;
    completeDuration: any;
    mouseIsDown = false;
    defaultVolume = 50;
    background: any;
    samemovie: any = [];
    statusLinkVideo = true;
    movieLoading = false;

    editSubtitle;

    @ViewChild("videoPlayer", { static: false }) videoPlayer: ElementRef;
    @ViewChild("myvideo", { static: false }) myvideo: ElementRef;
    @ViewChild("videoFrame", { static: false }) videoFrame: ElementRef;
    @ViewChild("startTime", { static: false }) startTime: ElementRef;
    @ViewChild("playerSeekBar", { static: false }) playerSeekBar: ElementRef;
    @ViewChild("playerProgressBar", { static: false }) playerProgressBar: ElementRef;
    @ViewChild("endTime", { static: false }) endTime: ElementRef;
    @ViewChild("volumeContainer", { static: false }) volumeContainer: ElementRef;
    @ViewChild("loadedProgressBar", { static: false }) loadedProgressBar: ElementRef;
    @ViewChild("volumeSeekBar", { static: false }) volumeSeekBar: ElementRef;
    @ViewChild("volumeProgreeBar", { static: false }) volumeProgreeBar: ElementRef;
    @ViewChild("fastBackward", { static: false }) fastBackward: ElementRef;
    @ViewChild("playPauseBtn", { static: false }) playPauseBtn: ElementRef;
    @ViewChild("fastForward", { static: false }) fastForward: ElementRef;
    @ViewChild("speedVideo", { static: false }) speedVideo: ElementRef;
    @ViewChild("fullscreen", { static: false }) fullscreen: ElementRef;
    @ViewChild("track", { static: false }) track: ElementRef;

    // ===============================end dom===========================
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private reduxService: ReduxService,
        private router: Router,
        private dataService: DataService,
    ) {
        window.scrollTo({ left: 0, top: 0 });
        // this.movieDetail();

        this.dataService.getUser().subscribe(loggedIn => {
            this.loggedIn = loggedIn['loggedIn'];
            if (loggedIn['loggedIn']) {
                this.user = loggedIn['user'];
            } else {

            }
        });

        this.list_star = this.reduxService.list_star;
        // console.log(this.list_star)
    }

    numberWithCommas(x: string) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    ngAfterViewInit() {

        this.timeInterval = setInterval(() => {
            // console.log("waiting");
            if (this.myvideo) {
                // console.log("done");
                this.getDuration();
                this.setVolumne();
                // this.editTrack();
                clearInterval(this.timeInterval);
                // setTimeout(() => {
                //     this.movie[0].movie[0].video = 'link error';
                //     this.statusLinkVideo = false;
                // }, 5000);
            }
        }, 500);

        // console.log("statusVideo");
        // this.statusVideo = "play";
    }

    ngOnInit() {
        this.movieDetail();
    }

    updateBuffered_amount() {

        if (this.editSubtitle.activeCues[0]) {
            // console.log(this.editSubtitle.activeCues)
            this.editSubtitle.activeCues[0].line = 15;
            this.editSubtitle.activeCues[0].position = 50;
            // this.editSubtitle.activeCues[0].text.style.color = "#444335e5";
            // this.editSubtitle.activeCues[0].align = "start";
        }


        if (this.myvideo.nativeElement.duration > 0) {
            for (let i = 0; i < this.myvideo.nativeElement.buffered.length; i++) {
                if (this.myvideo.nativeElement.buffered.start(this.myvideo.nativeElement.buffered.length - 1 - i) < this.myvideo.nativeElement.currentTime) {
                    if (this.loadedProgressBar == undefined) {
                        continue;
                    } else {
                        this.loadedProgressBar.nativeElement.style.width = (this.myvideo.nativeElement.buffered.end(this.myvideo.nativeElement.buffered.length - 1 - i) / this.myvideo.nativeElement.duration) * 100 + "%";
                        break;
                    }
                }
            }
        }
    }

    movieDetail(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.movieService.getMovieFromId(id).subscribe((movie) => {
            this.movie = movie;//console.log(this.movie[0].genre)
            this.movie[0].views = this.numberWithCommas(this.movie[0].views);
            this.background = this.movie[0]['vice_name_image'][0];
            this.statusSameMovie = true;
            this.statusMovie = true;
            for (let i = 0; i < this.movie[0].movie.length - 1; i++) {
                if (this.movie[0].movie[i]['subtitle'] == 'VIETSUB') {
                    this.vietsub.push(this.movie[0].movie[i]);
                }
                if (this.movie[0].movie[i]['subtitle'] == 'Thuyết Minh') {
                    this.thuyetminh.push(this.movie[0].movie[i]);
                }
            }

            this.movieService.get4samemovie(this.movie[0].genre[0]).subscribe((samemovie) => {
                this.samemovie = samemovie;
            })
            // console.log(this.vietsub);

            if (this.movie[0].movie[0].video == '') {

            } else {
                this.timeInterval = setInterval(() => {
                    // console.log("waiting");
                    if (this.myvideo.nativeElement) {
                        // console.log("done");
                        // this.playVideo();
                        this.getDuration();
                        this.setVolumne();
                        // this.editTrack();
                        clearInterval(this.timeInterval);
                        setTimeout(() => {
                            this.movie[0].movie[0].video == ''
                        }, 1000);
                    }
                }, 500);
            }
        });
    }

    editTrack() {
        if (this.myvideo.nativeElement) {
            this.editSubtitle = this.track.nativeElement.track;
            // this.editSubtitle.cues[0].text = "This is a completely different caption text!!!!1";
            // console.log(this.editSubtitle.activeCues);
            if (this.editSubtitle.activeCues[0]) {
                // console.log(this.editSubtitle.activeCues)
                this.editSubtitle.activeCues[0].line = 15;
                this.editSubtitle.activeCues[0].position = 50;
                // this.editSubtitle.activeCues[0].text.style.color = "#444335e5";
                // this.editSubtitle.activeCues[0].align = "start";
            }
        }
    }

    changeVideo(video, episode, subtitle) {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        // console.log(episode)
        if (this.movie[0].movie[0].video == video) {
            this.pauseVideo();
            this.statusEpisode = {
                episode: episode,
                subtitle: subtitle
            }
            this.episode = episode;
            this.movie[0].movie[0].video = video;
        } else {
            this.statusEpisode = {
                episode: episode,
                subtitle: subtitle
            }
            // console.log(this.statusEpisode);
            this.episode = episode;
            this.movie[0].movie[0].video = video;
            this.seekBarPercentage = 0;
            this.pauseVideo();
            this.currentDuration.minutes = '00';
            this.currentDuration.seconds = '00';

        }
    }

    changeStatusVideo() {
        if (this.statusBtCenter == 'pause') {
            this.pauseVideo();
        } else {
            this.playVideo();
        }
    }

    playVideo() {
        // console.log("play video")
        this.editTrack();
        this.showControl = true;
        this.statusVideo = "pause";
        this.statusBtCenter = "pause";
        this.myvideo.nativeElement.play();
        this.interval = setInterval(() => {
            if (this.statusVideo = "pause") {
                this.updateSeekbar();
            }
            if (this.myvideo.nativeElement.ended) {
                clearInterval(this.interval);
                this.statusVideo = "play";
            }
        }, 500);
    }

    pauseVideo() {
        // console.log("pause video")
        this.showControl = true;
        this.statusBtCenter = "play";
        clearInterval(this.interval);
        this.statusVideo = "play";
        this.myvideo.nativeElement.pause();
    }

    getPercentage(presentTime, totallength) {
        var calPercentage = (presentTime / totallength) * 100;
        return parseFloat(calPercentage.toString());
    };

    calculateDuration(duration) {
        // let newduration = Math.ceil(duration);    // 1
        // console.log(duration)
        var seconds = (duration % 60); //giây sẽ bằng toàn bộ thời gian chia lấy dư cho 60
        var minutes = ((duration % 3600) / 60); // phút sẽ bằng toàn bộ thời gian chia lấy dư cho 3600 và chia lấy phần nguyên cho 60
        var hours = Math.floor(duration / 3600); //giờ sẽ bằng thời gian chia cho 3600 lấy phần nguyên
        return {
            hours: this.pad(hours),
            minutes: this.pad(minutes.toFixed()),
            seconds: this.pad(seconds.toFixed())
        };
    };

    pad(number) {
        if (number > 0 && number < 10) {
            return "0" + number;
        }
        if (number == 0) {
            return "0" + number;
        } else {
            return number;
        }
    };

    getDuration() {
        this.completeDuration = this.myvideo.nativeElement.duration; //gán biến completeDuration bằng toàn bộ thời gian của video
        // console.log(this.myvideo.nativeElement.duration);
        this.endDuration = this.calculateDuration(this.completeDuration); //gán biến endDuration bằng
        // console.log(this.endDuration);
    }

    updateSeekbar() {
        // console.log(this.myvideo.nativeElement.buffered.start(this.myvideo.nativeElement.buffered.length - 1 - i));
        this.seekBarPercentage = this.getPercentage(this.myvideo.nativeElement.currentTime, this.myvideo.nativeElement.duration);
        this.currentDuration = this.calculateDuration(this.myvideo.nativeElement.currentTime);
        // console.log(this.seekBarPercentage);
        // this.playerProgressBar.nativeElement.css("width", this.seekBarPercentage + "%");
    };

    setVolumne() {
        this.myvideo.nativeElement.volume = this.defaultVolume / 100;
        if (this.myvideo.nativeElement.volume > 0.4) {
            this.statusVolume = "volume-up";
        }
        // console.log(this.myvideo.nativeElement.volume)
    }

    mouseUp() {
        this.mouseIsDown = false;
    }

    mouseDown() {
        this.mouseIsDown = true;
    }

    showFormControl() {
        this.timeMouseMove = 0;
        this.showControl = true;
        // this.timerId = setInterval(() => {
        //     console.log(this.timeMouseMove)
        //     this.timeMouseMove = this.timeMouseMove + 1;
        // }, 1000);
        // if(this.timeMouseMove == 4){
        //     this.showControl = false;
        //     clearInterval(this.timerId);
        // }
    }

    hideFormControl() {
        if (this.statusBtCenter == "play") {

        }
        else {
            setTimeout(() => {
                this.showControl = false;
            }, 4000)
        }
    }

    mouseMove(event) {
        if (this.mouseIsDown == true) {
            // console.log(this.volumeSeekBar.nativeElement);
            let volumePosition = event.pageX - $(this.volumeSeekBar.nativeElement).offset().left;
            var videoVolume = volumePosition / $(this.volumeSeekBar.nativeElement).outerWidth();
            // console.log(videoVolume);
            if (videoVolume >= 0 && videoVolume <= 1) {
                this.myvideo.nativeElement.volume = videoVolume;
                this.defaultVolume = videoVolume * 100;
                //   console.log(videoVolume);
                //   this.volumeProgreeBar.css("width", videoVolume * 100 + "%");
                // volumePercentage.text(Math.floor(videoVolume * 100) + "%");
            }
        }
    }

    fullScreen() {
        if (this.statusScreen == "default") {
            this.statusScreen = "full";
            this.videoPlayer.nativeElement.requestFullscreen();
        } else {
            // console.log("exit");
            this.statusScreen = "default";
            window.document.exitFullscreen();
        }
        this.listResolution = false;
        this.listSubtitle = false;
        this.listSpeed = false;
    }

    backWard() {
        this.myvideo.nativeElement.currentTime > 0 && this.myvideo.nativeElement.currentTime < this.myvideo.nativeElement.duration ? (this.myvideo.nativeElement.currentTime -= 10) : 0;
    }

    change(event) {
        // console.log(this.movieLoading);
        this.movieLoading = true;
        // console.log(event.pageX);
        // console.log($(this.playerSeekBar.nativeElement).offset().left);
        if (!this.myvideo.nativeElement.ended && this.completeDuration != undefined) {
            // console.log(this.playerSeekBar.nativeElement);
            var seekPosition = event.pageX - $(this.playerSeekBar.nativeElement).offset().left;
            if (seekPosition >= 0 && seekPosition < $(this.playerSeekBar.nativeElement).outerWidth()) {
                this.myvideo.nativeElement.currentTime = (seekPosition * this.completeDuration) / $(this.playerSeekBar.nativeElement).outerWidth();
                this.updateSeekbar();
            }
        }
        // this.movieLoading = false;
    }

    changeVolume(event) {
        let volumePosition = event.pageX - $(this.volumeSeekBar.nativeElement).offset().left;
        var videoVolume = volumePosition / $(this.volumeSeekBar.nativeElement).outerWidth();
        if (videoVolume >= 0 && videoVolume <= 1) {
            this.myvideo.nativeElement.volume = videoVolume;
            this.defaultVolume = videoVolume * 100;
        }
        if (videoVolume <= 0.4) {
            this.statusVolume = "volume-down";
        }
        if (videoVolume > 0.4) {
            this.statusVolume = "volume-up";
        }
        if (videoVolume = 0) {
            this.statusVolume = "volume-mute";
        }
    }

    volumeMute() {
        this.myvideo.nativeElement.volume = 0;
        this.defaultVolume = 0;
        this.statusVolume = "volume-mute";
    }

    volumeDown() {
        this.myvideo.nativeElement.volume = 0.2;
        this.defaultVolume = 20;
        this.statusVolume = "volume-down";
    }

    changeSpeed(event) {
        let speedVideo = event.srcElement.innerHTML;
        // console.log(event.srcElement.innerHTML);
        // console.log(event.srcElement.textContent);
        // console.log(event.srcElement.innerText);
        // console.log(this.speedVideo.nativeElement.textContent);
        this.currentSpeed = speedVideo;
        this.listSpeed = !this.listSpeed;
        this.speedVideo.nativeElement.textContent = speedVideo;
        switch (speedVideo.toString()) {
            case "2.0x":
                this.myvideo.nativeElement.playbackRate = 2;
                break;
            case "1.5x":
                this.myvideo.nativeElement.playbackRate = 1.5;
                break;
            case "1.0x":
                this.myvideo.nativeElement.playbackRate = 1;
                break;
            case "0.5x":
                this.myvideo.nativeElement.playbackRate = 0.5;
                break;
            case "0.25x":
                this.myvideo.nativeElement.playbackRate = 0.25;
                break;
        }

    }

    showSpeed() {
        this.listSpeed = !this.listSpeed;
        this.listResolution = false;
        this.listSubtitle = false;
    }

    checkStatusList() {
        if(this.listResolution){
            this.listResolution = false;
        }
        if(this.listSubtitle){
            this.listSubtitle = false;
        }
        if(this.listSpeed){
            this.listSpeed = false;
        }
    }

    closeSpeed() {
        this.listSpeed = !this.listSpeed;
    }

    lightOffOn(event) {
        // console.log(event)
        if (this.light_off == false) {
            event.srcElement.innerHTML = 'Bật Đèn'
        } else {
            event.srcElement.innerHTML = 'Tắt Đèn'
        }
        this.light_off = !this.light_off;

    }

    adOffOn(event) {
        if (event.srcElement.innerHTML == 'Tắt Quảng Cáo') {
            event.srcElement.innerHTML = 'Bật Quảng Cáo'
        } else {
            event.srcElement.innerHTML = 'Tắt Quảng Cáo'
        }
        this.ad = !this.ad;
    }

    showSetting() {
        this.listResolution = !this.listResolution;
        this.listSubtitle = false;
        this.listSpeed = false;
    }

    showSubtitle() {
        this.listSubtitle = !this.listSubtitle;
        this.listResolution = false;
        this.listSpeed = false;
    }

    changeSubtitle(event) {
        this.statusSubtitle = event.srcElement.innerHTML;
        this.listSubtitle = !this.listSubtitle;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.keyCode == 37) {
            this.myvideo.nativeElement.currentTime > 0 && this.myvideo.nativeElement.currentTime < this.myvideo.nativeElement.duration ? (this.myvideo.nativeElement.currentTime -= 10) : 0;
            this.backward_10 = true;
            setTimeout(() => {
                this.backward_10 = false;
            }, 200)
        }
        if (event.keyCode == 39) {
            this.myvideo.nativeElement.currentTime > 0 && this.myvideo.nativeElement.currentTime < this.myvideo.nativeElement.duration ? (this.myvideo.nativeElement.currentTime += 10) : 0;
            this.forward_10 = true;
            setTimeout(() => {
                this.forward_10 = false;
            }, 200)
        }
        if (event.keyCode == 38) {
            this.myvideo.nativeElement.volume = this.myvideo.nativeElement.volume + 0.1;
            this.defaultVolume = this.myvideo.nativeElement.volume * 100;
        }
        if (event.keyCode == 40) {
            this.myvideo.nativeElement.volume = this.myvideo.nativeElement.volume - 0.1;
            this.defaultVolume = this.myvideo.nativeElement.volume * 100;
        }
        // if (event.keyCode == 123) {
        //     this.router.navigate([`/movie`]);
        // }
    }
}
