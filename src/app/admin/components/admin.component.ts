import {Component} from '@angular/core';
import {AdminMenuComponent} from './menu/menu.component';
import {RouterOutlet} from '@angular/router';


@Component({
    templateUrl: './admin.component.html',
    imports: [AdminMenuComponent, RouterOutlet]
})
export class AdminComponent {

}
