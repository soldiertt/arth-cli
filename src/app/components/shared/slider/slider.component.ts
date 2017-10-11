import {Component, OnInit} from "@angular/core";
import Slide from "../../../model/slider.class";
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';
import Article from '../../../model/article.class';

@Component({
  selector: 'arth-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {

  slides: Slide[];
  sliderArticles: Article[];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      this.slides = appData.slides;
      this.sliderArticles = appData.sliderArticles;
    })
  }

  goToProductFromSlide(slide: Slide): void {
    if (slide.link) {
      this.router.navigate(['/detail', slide.link]);
    }
  }

}
