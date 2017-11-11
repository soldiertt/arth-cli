import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Article from "../../model/article.class";
import Brand from "../../model/brand.class";
import Order from '../../model/order.class';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ArticleRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.BASE_URL + "/product");
  }

  listAllPromo(): Observable<Article[]> {
    return this.http.get<Article[]>(this.BASE_URL + "/product/promo");
  }

  findById(articleId): Observable<Article> {
    return this.http.get<Article>(this.BASE_URL + "/product/" + articleId);
  }

  findByCategory(categoryType): Observable<Article[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('category', categoryType);
    return this.http.get<Article[]>(this.BASE_URL + "/product", {params});
  }

  findByBrand(brandName): Observable<Article[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('brand', brandName);
    return this.http.get<Article[]>(this.BASE_URL + "/product", {params});
  }

  findTopSalesByCategory(categoryType): Observable<Article[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('category', categoryType);
    return this.http.get<Article[]>(this.BASE_URL + "/product/top", {params});
  }

  findAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.BASE_URL + "/product/brands");
  }

  search(term: string): Observable<Article[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('term', term);
    return this.http.get<Article[]>(this.BASE_URL + "/product/search", {params});
  }

  create(product: Article): Observable<Article> {
    return this.http.post<Article>(this.BASE_URL + "/product", product);
  }

  update(id: string, product: Article): Observable<any> {
    return this.http.put(this.BASE_URL + "/product/" + id, product);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + "/product/" + id);
  }

  updateTopSales(orders: Order[]): Observable<any> {
    return this.http.post(this.BASE_URL + "/product/top", orders);
  }

  uploadPicture(data: FormData) {
    return this.http.post(this.BASE_URL + "/product/upload", data);
  }
}
