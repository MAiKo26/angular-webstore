import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Product} from "../../../../models/product.model";

@Component({
  selector: "app-product-box",
  template: `
    <mat-card *ngIf="product" [ngClass]="{'text-center': !fullWidthMode}">
      <div [ngClass]="{flex: fullWidthMode}">
        <img
          class="mb-1 mx-auto"
          class="h-[200px] w-[360px]"
          [src]="product.image"
        />
        <div
          class="w-full"
          [ngClass]="{'px-8 flex flex-col justify-between': fullWidthMode}"
        >
          <div>
            <h5>{{ product.category }}</h5>
            <p
              class="truncate hover:whitespace-normal"
              [ngClass]="{truncate: !fullWidthMode}"
            >
              {{ product.title }}
            </p>
            <p *ngIf="fullWidthMode">
              {{ product.description }}
            </p>
          </div>
          <div class="flex justify-between">
            <span class="text-red-400">{{ product.price | currency }}</span>
            <button (click)="onAddToCart()">
              <mat-icon class="text-gray-500">shopping_cart</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </mat-card>
  `,
  styles: ``,
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
