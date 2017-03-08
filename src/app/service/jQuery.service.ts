import {Injectable} from "@angular/core";
@Injectable()
export class JQueryService {

  addToCart($, callback) {
    function openBasket() {
      $('#minicart-dropdown').dropdown('toggle');
      callback();
    }
    setTimeout(openBasket, 1000);
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  }

}
