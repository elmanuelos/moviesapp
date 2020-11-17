import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper, { Autoplay, Scrollbar } from 'swiper';
Swiper.use([Autoplay]);
Swiper.use([Scrollbar]);

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];

  constructor() { }

  ngAfterViewInit(): void {
   const swiper = new Swiper('.swiper-container', {
       slidesPerView: 5.3,
       freeMode: true,
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
       spaceBetween: 15
   });
  }

  ngOnInit(): void {
    //console.log(this.cast);
  }

}
