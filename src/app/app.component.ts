import {Component, ChangeDetectionStrategy} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'arth-app',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet]
})
export class AppComponent {
}
