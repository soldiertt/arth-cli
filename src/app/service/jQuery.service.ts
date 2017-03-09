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

  enableFancybox($) {
    let $fancyboxVideo = $(".fancyboxVideo");
    $fancyboxVideo.fancybox({
      'padding'      	: 10,
      'autoScale'   	: true,
      'transitionIn'    : 'none',
      'transitionOut'   : 'none',
      'href' : $fancyboxVideo.attr('href') + '?rel=0&autoplay=1'
    });

    let $fancyBoxImg = $(".fancyboxImg");
    $fancyBoxImg.fancybox({
      'padding'      	: 10,
      'autoScale'   	: true,
      'transitionIn'    : 'none',
      'transitionOut'   : 'none'
    });

  }

}
