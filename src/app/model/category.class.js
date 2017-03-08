"use strict";
var Category = (function () {
    function Category(name, titleFr, titleNl) {
        this.name = name;
        this.titleFr = titleFr;
        this.titleNl = titleNl;
        this.hasChildren = false;
        this.subCategories = [[], [], []];
    }
    return Category;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Category;
//# sourceMappingURL=category.class.js.map