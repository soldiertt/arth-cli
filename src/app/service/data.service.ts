import {Injectable} from '@angular/core';
import AppData from '../model/app-data';
import {Actions} from '../model/actions.class';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private _appData: AppData;
  appData: BehaviorSubject<AppData>;

  constructor() {
    this._appData = new AppData();
    this.appData = new BehaviorSubject(this._appData);
  }

  doAction(action: Actions, value?: any): void {
    console.log(action, value);
    this._appData = this.reducer(action, value);
    console.log("new state", this._appData);
    this.appData.next(this._appData);
  }

  private reducer(action: Actions, value?: any): AppData {
    /*
    const b = Object.assign({}, a, {
      user: {
        ...a.user,
        groups: 'some changed value'
      }
    });
     */
    const newState = Object.assign({}, this._appData );

    switch (action) {
      case Actions.ADDRESS_COMPLETED: {
        newState.cartData.addressCompleted = true;
        return newState;
      }
      case Actions.ADDRESS_INCOMPLETE: {
        newState.cartData.addressCompleted = false;
        return newState;
      }
      case Actions.CART_MOVE_TO_STEP: {
        newState.cartData.currentStep = value;
        return newState;
      }
    }
    return this._appData;
  }
}
