import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Category from "../model/category.class";

@Injectable()
export class CategoryRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  findCategory(categoryName: string): Observable<Category> {
    return this.http.get(this.BASE_URL + "/category/name/" + categoryName).map(res => res.json()).map(this._mapJsonToCategory);
  }

  listAllRoots(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/category").map(res => res.json()).map(this._mapJsonArrayToCategoryArray);
  }

  listSubCategories(categoryName: string): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/category/" + categoryName).map(res => res.json()).map(this._mapJsonArrayToCategoryArray);
  }

  private _mapJsonToCategory(category: any): Category {
    return new Category(category.id, category.type, category.title, category.titlenl, category.parent);
  }

  private _mapJsonArrayToCategoryArray(categories: any[]): Category[] {
    return categories.map(category => new Category(category.id, category.type, category.title, category.titlenl, category.parent));
  }
}
