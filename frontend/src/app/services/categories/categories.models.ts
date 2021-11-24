interface Subcategory {
  title: string;
  url: string;
}

interface Category {
  title: string;
  url: string;
  subcategories: Array<Subcategory>;
}

export {Subcategory, Category};