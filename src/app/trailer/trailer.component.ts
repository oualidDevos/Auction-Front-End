import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { scaleDownFromTop, scaleDownFromBottom } from 'ngx-router-animations';
import { ActivatedRoute } from '@angular/router';

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

  change(event: any) {
    // console.log(event);
  }

  // @Input() outlet: any;
  public getState(outlet: any) {
    // console.log("qsdqsd");

    // console.log(outlet);

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

  constructor(private activated: ActivatedRoute) { }

  ngOnInit(): void {


  //   video?.play().then(
  //     m=> {
  //       console.log(video)
  //     }
  //   );
  //   console.log(video)
  }

}
