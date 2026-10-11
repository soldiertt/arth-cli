import {Component} from '@angular/core';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css'],
    imports: [I18nPipe]
})
export class AboutComponent {
}
