import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products-service/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ProductModel;
  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.product = new ProductModel();
  }

  submitAdd() {
    this.productService.addProduct(this.product).subscribe(data => {
      this.router.navigate(['/admin']);
    });
  }
}
