import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Product} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {StoreService} from "../../services/store.service";

const ROWS_HEIGHT: {[id: number]: number} = {1: 400, 3: 335, 4: 350};

@Component({
  selector: "Home",
  template: `
    <mat-drawer-container
      [autosize]="true"
      class="min-h-screen max-w-7xl mx-auto border-x"
    >
      <mat-drawer mode="side" opened class="p-6">
        <app-filters (showCategory)="onShowCategory($event)"></app-filters>
      </mat-drawer>
      <mat-drawer-content class="p-6">
        <app-products-header
          (columnsCountChange)="onColumnsCountChange($event)"
          (itemsCountChange)="onItemsCountChange($event)"
          (sortChange)="onSortChange($event)"
        ></app-products-header>
        <mat-grid-list
          *ngIf="products && products.length"
          gutterSize="16"
          [cols]="cols"
          [rowHeight]="rowHeight"
        >
          <mat-grid-tile *ngFor="let product of products">
            <div
              (addToCart)="onAddToCart($event)"
              app-product-box
              [product]="product"
              [fullWidthMode]="cols === 1"
              class="w-full"
            ></div>
          </mat-grid-tile>
        </mat-grid-list>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = "12";
  sort = "desc";
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
