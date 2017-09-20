import {Injectable} from "@angular/core";
import Cart from "../model/cart.class";
import UserProfile from "../model/user-profile.class";
import UserMetaData from "../model/usermetadata.class";
@Injectable()
export class SessionService {

  readonly CART_TOKEN: string = "cart";
  readonly LANG_TOKEN: string = "lang";
  readonly PROFILE_TOKEN: string = "arthUserProfile";
  readonly ID_TOKEN: string = "id_token";

  saveCart(cart: Cart): void {
    localStorage.setItem(this.CART_TOKEN, JSON.stringify(cart));
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(this.CART_TOKEN));
  }

  saveLang(lang: string): void {
    localStorage.setItem(this.LANG_TOKEN, JSON.stringify(lang));
  }

  getLang(): string {
    return JSON.parse(localStorage.getItem(this.LANG_TOKEN));
  }

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(this.PROFILE_TOKEN, JSON.stringify(profile));
  }

  getProfile(): UserProfile {
    return JSON.parse(localStorage.getItem(this.PROFILE_TOKEN));
  }

  saveIdToken(id: string): void {
    localStorage.setItem(this.ID_TOKEN, id);
  }

  deleteIdToken(): void {
    localStorage.removeItem(this.ID_TOKEN);
  }

}
