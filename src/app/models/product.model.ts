export interface Categoria {
  id: '',
  name: ''
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Categoria;
  impuesto?: number;
}

export interface Producto_nuevo_tipado extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface Product_Update_tipado extends Partial<Producto_nuevo_tipado>{
}


