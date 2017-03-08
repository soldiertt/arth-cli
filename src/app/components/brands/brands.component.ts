import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import Brand from "../../model/brand.class";
import {ArticleRestService} from "../../service/article.rest.service";

@Component({
  selector: 'arth-brands',
  templateUrl: 'brands.component.html',
  styleUrls: ['brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[];

  constructor(private articleRestService: ArticleRestService,
    private router: Router) {}

  ngOnInit() {
    this.articleRestService.findAllBrands().subscribe(allBrands => {
      this.brands = allBrands;
      this.brands.sort((a, b) => {
        if (a.marque.toLocaleLowerCase() > b.marque.toLocaleLowerCase()) {
          return 1;
        } else if (a.marque.toLocaleLowerCase() < b.marque.toLocaleLowerCase()) {
          return -1
        }
        return 0;
      });
    })
  }

  goToBrand(brand: Brand) {
    this.router.navigate(['/brand', brand.marque]);
  }
}
