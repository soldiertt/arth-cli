import {Injectable, Inject} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Article from "../model/article.class";
import Brand from "../model/brand.class";

@Injectable()
export class ArticleRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAllPromo(): Observable<Array<Article>> {
    return this.http.get(this.BASE_URL + "/product/promo").map(res => res.json());
  }

  findById(articleId): Observable<Article> {
    return this.http.get(this.BASE_URL + "/product/" + articleId).map(res => res.json());
  }

  findByCategory(categoryType): Observable<Array<Article>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('category', categoryType);
    return this.http.get(this.BASE_URL + "/product", {search: params}).map(res => res.json());
  }

  findByBrand(brandName): Observable<Array<Article>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('brand', brandName);
    return this.http.get(this.BASE_URL + "/product", {search: params}).map(res => res.json());
  }

  findTopSalesByLeafCategory(categoryType): Observable<Array<Article>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('leafCategory', categoryType);
    return this.http.get(this.BASE_URL + "/product/top", {search: params}).map(res => res.json());
  }

  findTopSalesByRootCategory(categoryType): Observable<Array<Article>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('rootCategory', categoryType);
    return this.http.get(this.BASE_URL + "/product/top", {search: params}).map(res => res.json());
  }

  findAllBrands(): Observable<Array<Brand>> {
    return this.http.get(this.BASE_URL + "/product/brands").map(res => res.json());
  }

  search(term: string): Observable<Array<Article>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('term', term);
    return this.http.get(this.BASE_URL + "/product/search", {search: params}).map(res => res.json());
  }

}
