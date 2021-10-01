import { AuthService } from './../Services/auth.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { scaleDownFromTop, scaleDownFromBottom } from 'ngx-router-animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css'],
  animations: [
    trigger('scaleDownFromTop', [
      transition('trailer => register', useAnimation(scaleDownFromTop), {
        params: {enterTiming: '0.6', leaveTiming: '0.7', enterDelay: '0', leaveDelay: ''}
        }),
      transition('trailer => login', useAnimation(scaleDownFromBottom), {
        params: {enterTiming: '0.6', leaveTiming: '0.7', enterDelay: '0', leaveDelay: ''}
      }),
    ]),
  ],
})
export class TrailerComponent implements OnInit {

  public getState(outlet: any) {
    return outlet.activatedRouteData.state.activated;
  }

  icon: string = 'fas fa-play';

  pause = true;

  // @ViewChild('video',{static:false}) video: ElementRef | undefined;

  play(audio: any){
    if( this.pause == true)
    {
      audio.muted = false;
      audio.play();
      this.pause = false;
    }else{
      audio.muted = true;
      audio.pause();
      this.pause = true;
    }
  }

  constructor(private activated: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    if( this.authService.isUSerAutheniticated() === true){
      this.router.navigate(['main'])
    }
  }

}
