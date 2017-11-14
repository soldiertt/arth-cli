import {Component, OnInit} from "@angular/core";
import Slide from "../../../../shared/model/slider.class";
import {Router} from '@angular/router';
import Article from '../../../../shared/model/article.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {SlideActions} from '../../../actions/slide.actions';
import {SlideProductActions} from '../../../actions/slide-product.actions';
import {FromSlide} from '../../../reducers/slide.reducer';
import {FromSlideProduct} from '../../../reducers/slide-product.reducer';

@Component({
  selector: 'arth-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {

  slides$: Observable<Slide[]>;
  sliderArticles$: Observable<Article[]>;

  constructor(private slideStore: Store<FromSlide.State>,
              private slideProductStore: Store<FromSlideProduct.State>,
              private router: Router) {}

  ngOnInit() {
    this.slides$ = this.slideStore.select(FromSlide.selectAll);
    this.sliderArticles$ = this.slideProductStore.select(FromSlideProduct.selectAll);
    this.slideStore.dispatch(new SlideActions.GetAll());
    this.slideProductStore.dispatch(new SlideProductActions.GetAll());
  }

  goToProductFromSlide(slide: Slide): void {
    if (slide.link) {
      this.router.navigate(['/detail', slide.link]);
    }
  }

}
