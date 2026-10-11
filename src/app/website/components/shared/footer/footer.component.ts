import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {Auth0Service} from '../../../../shared/service/auth.service';
import {RouterLink} from '@angular/router';
import {I18nPipe} from '../../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, I18nPipe]
})
export class FooterComponent {  authService = inject(Auth0Service);


}
