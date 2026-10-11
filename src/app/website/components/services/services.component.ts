import {Component, ChangeDetectionStrategy} from '@angular/core';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-services',
    templateUrl: 'services.component.html',
    styleUrls: ['./services.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [I18nPipe]
})
export class ServicesComponent {
}
