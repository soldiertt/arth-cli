import {Component, OnInit} from '@angular/core';
import Article from "../../../shared/model/article.class";
import {DataService} from '../../service/data.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  promoArticles: Article[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      this.promoArticles = appData.promoArticles;
    });
  }

}
