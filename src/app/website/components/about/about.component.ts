import {Component, ChangeDetectionStrategy} from '@angular/core';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [I18nPipe]
})
export class AboutComponent {
}
