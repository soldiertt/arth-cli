import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AdminMenuComponent} from './menu/menu.component';
import {RouterOutlet} from '@angular/router';


@Component({
    templateUrl: './admin.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AdminMenuComponent, RouterOutlet]
})
export class AdminComponent {

}
