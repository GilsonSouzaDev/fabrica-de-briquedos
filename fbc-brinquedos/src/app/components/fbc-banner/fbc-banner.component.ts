import { NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@Component({
  selector: 'app-fbc-banner',
  imports: [CarouselModule],
  templateUrl: './fbc-banner.component.html',
  styleUrls: [
    './fbc-banner.component.scss',
    '../../../../node_modules/swiper/swiper-bundle.min.css',
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FbcBannerComponent {
  slides = [
    '/assets/img/banner-home.jpg',
    '/assets/img/banner-home.jpg',
    '/assets/img/banner-home.jpg',
  ];
}
