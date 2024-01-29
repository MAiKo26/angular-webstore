import {Component, Input} from "@angular/core";
import {Cart, CartItem} from "../../models/cart.model";
// import {CartService} from "src/app/services/cart.service";

@Component({
  selector: "Header",
  template: `
    <mat-toolbar class="justify-between max-w-7xl mx-auto border-x">
      <a routerLink="home">Code with Sloba store</a>
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon
          [matBadge]="itemsQuantity"
          [matBadgeHidden]="!itemsQuantity"
          matBadgeColor="warn"
          >shopping_cart</mat-icon
        >
      </button>
      <mat-menu #menu="matMenu">
        <div class="p-3 divide-y divide-solid">
          <div class="pb-3 flex justify-between">
            <span class="mr-16">{{ cart.items.length }} items</span>
            <a routerLink="cart">View Cart</a>
          </div>
          <div *ngIf="cart.items.length" class="py-3">
            <div
              *ngFor="let item of cart.items"
              class="flex justify-between font-light mb-2"
            >
              {{ item.name }} x {{ item.quantity }}
              <span class="font-bold not-italic">{{
                item.price | currency
              }}</span>
            </div>
          </div>
          <div class="flex justify-between py-3 font-light">
            Total:
            <span class="font-bold not-italic">{{ 120 | currency }}</span>
          </div>
          <div class="pt-3 flex justify-between">
            <button class="bg-rose-600 text-white rounded-full w-9 h-9">
              <mat-icon>remove_shopping_cart</mat-icon>
            </button>
            <button
              routerLink="cart"
              class="bg-green-600 text-white rounded-full w-9 h-9"
            >
              <mat-icon>shopping_cart_checkout</mat-icon>
            </button>
          </div>
        </div>
      </mat-menu>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  private _cart: Cart = {items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  // constructor(private cartService: CartService) {}

  // getTotal(items: CartItem[]): number {
  //   return this.cartService.getTotal(items);
  // }

  // onClearCart(): void {
  //   this.cartService.clearCart();
  // }
}
