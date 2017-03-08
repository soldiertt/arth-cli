export default class Category {
  id: number;
  name: string;
  titleFr: string;
  titleNl: string;
  hasChildren: boolean;
  subCategories: Array<Category>;
  parent: string;

  constructor(id: number, name: string, titleFr: string, titleNl: string, parent: string) {
    this.id = id;
    this.name = name;
    this.titleFr = titleFr;
    this.titleNl = titleNl;
    this.hasChildren = false;
    this.subCategories = [];
    this.parent = parent;
  }
}
