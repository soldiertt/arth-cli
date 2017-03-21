import {Component, OnInit} from "@angular/core";
import {SliderRestService} from "../../../service/slider.rest.service";
import Slide from "../../../model/slider.class";

@Component({
  selector: 'arth-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {

  slides: Slide[];

  constructor(private sliderRestService: SliderRestService) {}

  ngOnInit() {
    this.sliderRestService.listAll().subscribe(slides => {
      this.slides = slides;
    })
  }
}
