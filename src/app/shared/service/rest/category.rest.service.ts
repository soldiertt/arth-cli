import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Category from "../../model/category.class";

@Injectable()
export class CategoryRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  findCategory(categoryName: string): Observable<Category> {
    return this.http.get(this.BASE_URL + "/category/name/" + categoryName).map(res => res.json()).map(this._mapJsonToCategory);
  }

  listAll(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/category/all").map(res => res.json()).map(this._mapJsonArrayToCategoryArray);
  }

  listAllRoots(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/category").map(res => res.json()).map(this._mapJsonArrayToCategoryArray);
  }

  listSubCategories(categoryName: string): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/category/" + categoryName).map(res => res.json()).map(this._mapJsonArrayToCategoryArray);
  }

  create(category: Category): Observable<any> {
    return this.http.post(this.BASE_URL + "/category", Category.toDbObject(category)).map(res => res.json());
  }

  update(id: string, category: Category): Observable<any> {
    return this.http.put(this.BASE_URL + "/category/" + id, Category.toDbObject(category)).map(res => res.json());
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + "/category/" + id).map(res => res.json());
  }

  private _mapJsonToCategory(category: any): Category {
    return Category.fromObject(category);
  }

  private _mapJsonArrayToCategoryArray(categories: any[]): Category[] {
    return categories.map(category => Category.fromObject(category));
  }
}
