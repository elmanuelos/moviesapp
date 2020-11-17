import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Autoplay, Swiper } from 'swiper';
import { Movies } from '../../interfaces/nowPlaying-response';
Swiper.use([Autoplay]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movies[];

  public mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
   this.mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});


  }

  ngOnInit(): void {

    console.log(this.movies);
  }

  onSlideNext(){

  this.mySwiper.slideNext();

  }
  onSlidePrev(){
    this.mySwiper.slidePrev();
  }

}
