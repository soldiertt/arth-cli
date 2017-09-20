import {Component, OnInit} from "@angular/core";
import {SliderRestService} from "../../../service/slider.rest.service";
import Slide from "../../../model/slider.class";
import {Router} from '@angular/router';

@Component({
  selector: 'arth-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {

  slides: Slide[];

  constructor(private sliderRestService: SliderRestService, private router: Router) {}

  ngOnInit() {
    this.sliderRestService.listAll().subscribe(slides => {
      this.slides = slides;
    })
  }

  goToProduct(slide: Slide): void {
    if (slide.link) {
      this.router.navigate(['/detail', slide.link]);
    }
  }
}
