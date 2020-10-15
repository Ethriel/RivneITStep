import { ProductsService } from './../../../services/products-service/products.service';
import { ProductModel } from './../../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: ProductModel[];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  listOfColumn = [
    {
      title: 'Id',
    },
    {
      title: 'Image',
    },
    {
      title: 'Title',
    },
    {
      title: 'Price',
    },
    {
      title: 'Description',
    }
  ];

  listOfData: ProductModel[] = [
    new ProductModel(1, "Nuts", 50, "https://images-na.ssl-images-amazon.com/images/I/71oR9w5AjbL._SX569_.jpg", "..."),
    new ProductModel(2, "Milk", 50, "https://chriskresser.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg", "..."),
    new ProductModel(3, "Apple", 50, "https://vegtm.com/wp-content/uploads/2020/05/apple.png", "...")
  ];
}
