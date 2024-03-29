
import {map} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';

import Category from '../../model/category.class';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  private static _mapJsonToCategory(category: any): Category {
    return Category.fromObject(category);
  }

  private static _mapJsonArrayToCategoryArray(categories: any[]): Category[] {
    return categories.map(category => Category.fromObject(category));
  }

  findCategory(categoryName: string): Observable<Category> {
    return this.http.get<Category>(this.BASE_URL + '/category/name/' + categoryName).pipe(map(CategoryRestService._mapJsonToCategory));
  }

  listAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL + '/category/all').pipe(map(CategoryRestService._mapJsonArrayToCategoryArray));
  }

  listAllRoots(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL + '/category').pipe(map(CategoryRestService._mapJsonArrayToCategoryArray));
  }

  listSubCategories(categoryName: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL + '/category/' + categoryName).pipe(map(CategoryRestService._mapJsonArrayToCategoryArray));
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.BASE_URL + '/category', Category.toDbObject(category)).pipe(map(CategoryRestService._mapJsonToCategory));
  }

  update(id: string, category: Category): Observable<any> {
    return this.http.put(this.BASE_URL + '/category/' + id, Category.toDbObject(category));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/category/' + id);
  }

}
