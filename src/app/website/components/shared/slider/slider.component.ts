import {Component, OnInit} from "@angular/core";
import Slide from "../../../../shared/model/slider.class";
import {Router} from '@angular/router';
import Article from '../../../../shared/model/article.class';
import {Store} from '@ngrx/store';
import * as fromSlide from '../../../reducers/slide.reducer';
import * as fromSlideProduct from '../../../reducers/slide-product.reducer';
import {Observable} from 'rxjs/Observable';
import * as slideActions from '../../../actions/slide.actions';
import * as slideProductActions from '../../../actions/slide-product.actions';

@Component({
  selector: 'arth-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {

  slides$: Observable<Slide[]>;
  sliderArticles$: Observable<Article[]>;

  constructor(private slideStore: Store<fromSlide.State>,
              private slideProductStore: Store<fromSlideProduct.State>,
              private router: Router) {}

  ngOnInit() {
    this.slides$ = this.slideStore.select(fromSlide.selectAll);
    this.sliderArticles$ = this.slideProductStore.select(fromSlideProduct.selectAll);
    this.slideStore.dispatch(new slideActions.GetAll());
    this.slideProductStore.dispatch(new slideProductActions.GetAll());
  }

  goToProductFromSlide(slide: Slide): void {
    if (slide.link) {
      this.router.navigate(['/detail', slide.link]);
    }
  }

}
