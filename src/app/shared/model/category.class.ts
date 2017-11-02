export default class Category {
  id?: string;
  name: string;
  titleFr: string;
  titleNl: string;
  subCategories?: Category[];
  parent?: string;
  sortby?: number;

  constructor() {
  }

  static fromObject(object: any): Category {
    const category = new Category();
    category.id = object.id;
    category.name = object.type;
    category.titleFr = object.title;
    category.titleNl = object.titlenl;
    category.parent = object.parent;
    category.sortby = object.sortby;
    return category;
  }

  static toDbObject(category: Category): any {
    return {
      id: category.id, type: category.name, title: category.titleFr,
      titlenl: category.titleNl, parent: category.parent, sortby: category.sortby
    };
  }
}
