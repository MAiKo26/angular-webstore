import {Component, OnInit} from "@angular/core";
import {Cart, CartItem} from "./models/cart.model";
import {CartService} from "./services/cart.service";

@Component({
  selector: "app-root",
  template: `
    <main class="max-w-7xl min-h-full mx-auto border-x">
      <app-header class="max-w-7xl mx-auto" [cart]="cart"></app-header>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  cart: Cart = {items: []};

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
