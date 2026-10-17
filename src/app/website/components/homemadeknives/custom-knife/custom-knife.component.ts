import {Component, computed, inject, input, OnInit, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAlbum, Lightbox, LightboxConfig} from '@pierresh/ngx-lightbox';
import {OrderArticle} from '../../../../shared/model/order-article';
import {JQueryService} from '../../../service/jQuery.service';
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {CartDataActions} from '../../../actions/cart-data.actions';

declare const $: any;

@Component({
    selector: 'arth-custom-knife',
    templateUrl: 'custom-knife.component.html',
    styleUrls: ['custom-knife.component.css']
})
export class CustomKnifeComponent implements OnInit {
  private store = inject<Store<CartData>>(Store);
  private jQueryService = inject(JQueryService);
  private _lightbox = inject(Lightbox);

  readonly isOdd = input(false);
  _album: IAlbum[] = [];
  customKnifeForm: FormGroup;
  readonly price: Signal<number | undefined>;

  constructor() {
    const fb = inject(FormBuilder);
    const _lightboxConfig = inject(LightboxConfig);
    _lightboxConfig.alwaysShowNavOnTouchDevices = true;
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.showImageNumberLabel = true;
    const modelCtrl = fb.control('', Validators.required);
    this.customKnifeForm = fb.group({
      model: modelCtrl,
      wood: fb.control('', Validators.required),
      engraving: fb.control('', Validators.maxLength(20))
    });
    const model = toSignal(modelCtrl.valueChanges, {initialValue: modelCtrl.value});
    this.price = computed(() => {
      switch (model()) {
        case 'office':
          return 82;
        case 'chef':
          return 179;
        default:
          return undefined;
      }
    });
  }

  ngOnInit() {
    // this._album.push({src: 'assets/images/custom_summary.jpg', thumb: 'assets/images/custom_summary_m.jpg', downloadUrl: 'assets/images/custom_summary.jpg'});
    // this._album.push({src: 'assets/images/custom_office.jpg', thumb: 'assets/images/custom_office_m.jpg', downloadUrl: 'assets/images/custom_office.jpg'});
    // this._album.push({src: 'assets/images/custom_chef.jpg', thumb: 'assets/images/custom_chef_m.jpg', downloadUrl: 'assets/images/custom_chef.jpg'});
    // this._album.push({src: 'assets/images/custom_wood.jpg', thumb: 'assets/images/custom_wood_m.jpg', downloadUrl: 'assets/images/custom_wood.jpg'});
  }

  addToCart() {
    const component = this;
    const callback = () => {
      const engraving = this.customKnifeForm.get('engraving').value ? ` engraving '${this.customKnifeForm.get('engraving').value}'` : '';
      const articleName = `Homemade '${this.customKnifeForm.get('model').value}' handle '${this.customKnifeForm.get('wood').value}'${engraving}`;
      const orderArticle: OrderArticle = {id: this.homemadeCustomId(), name: articleName, type: 'homemadeknives', pictures: ['custom_summary.jpg'], price: this.price(), promo: false, noLink: true};
      component.store.dispatch(CartDataActions.AddArticle({article: orderArticle}));
    };
    this.jQueryService.addToCart($, callback);
  }

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

  private homemadeCustomId(): string {
    return `homemade_${this.customKnifeForm.get('model').value}_${this.customKnifeForm.get('wood').value}_${this.customKnifeForm.get('engraving').value}`;
  }
}
