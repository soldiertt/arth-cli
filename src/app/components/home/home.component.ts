import {Component, OnInit} from '@angular/core';
import Article from "../../model/article.class";
import {ArticleRestService} from "../../service/article.rest.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  promoArticles: Article[];

  constructor(private articleRestService: ArticleRestService) {}

  ngOnInit() {
    this.articleRestService.listAllPromo().subscribe(articles => {
      this.promoArticles = articles;
    });
  }

}
