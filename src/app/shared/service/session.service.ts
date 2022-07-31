import {Injectable} from '@angular/core';
import Cart from '../../website/model/cart.class';
import UserProfile from '../../website/model/user-profile.class';

@Injectable()
export class SessionService {

  readonly CART_TOKEN: string = 'cart';
  readonly LANG_TOKEN: string = 'lang';
  readonly PROFILE_TOKEN: string = 'arthUserProfile';
  readonly ID_TOKEN: string = 'id_token';
  readonly ACCESS_TOKEN: string = 'access_token';
  readonly EXPIRES_AT: string = 'expires_at';

  saveCart(cart: Cart): void {
    localStorage.setItem(this.CART_TOKEN, JSON.stringify(cart));
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(this.CART_TOKEN)!);
  }

  saveLang(lang: string): void {
    localStorage.setItem(this.LANG_TOKEN, JSON.stringify(lang));
  }

  getLang(): string {
    return JSON.parse(localStorage.getItem(this.LANG_TOKEN)!);
  }

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(this.PROFILE_TOKEN, JSON.stringify(profile));
  }

  saveAuth(authResult: any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem(this.ACCESS_TOKEN, authResult.accessToken);
    localStorage.setItem(this.ID_TOKEN, authResult.idToken);
    localStorage.setItem(this.EXPIRES_AT, expiresAt);
  }

  getProfile(): UserProfile {
    return JSON.parse(localStorage.getItem(this.PROFILE_TOKEN)!);
  }

  deleteProfile(): void {
    localStorage.removeItem(this.PROFILE_TOKEN);
  }

  deleteAuth(): void {
    localStorage.removeItem(this.ID_TOKEN);
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.EXPIRES_AT);
  }

}
