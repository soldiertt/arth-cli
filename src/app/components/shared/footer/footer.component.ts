import {Component} from "@angular/core";
import {Auth0Service} from "../../../service/auth.service";
@Component({
  selector: 'arth-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent {

  constructor(private authService: Auth0Service) {}

}
