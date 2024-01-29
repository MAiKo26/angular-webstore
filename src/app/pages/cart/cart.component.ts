import {HttpClient} from "@angular/common/http";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {loadStripe} from "@stripe/stripe-js";
import {Subscription} from "rxjs";

@Component({
  selector: "app-cart",
  template: ` <mat-card *ngIf="cart.items.length" class="max-w-7xl mx-auto">
      <table
        mat-table
        [dataSource]="dataSource"
        class="mat-elevation-z8 w-full"
      >
        <ng-container matColumnDef="product">
          <th mat-header-cell *matHeaderCellDef>Product</th>
          <td mat-cell *matCellDef="let element">
            <img
              src="{{ element.product }}"
              alt="product"
              class="w-[100px] my-5"
            />
          </td>
          <td mat-footer-cell *matFooterCellDef>
            <button mat-raised-button routerLink="/home">
              Continue Shopping
            </button>
          </td>
        </ng-container>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">
            <p class="truncate max-w-xs">{{ element.name }}</p>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let element">
            {{ element.price | currency }}
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef>Quantity</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button (click)="onRemoveQuantity(element)">
              <mat-icon>remove</mat-icon>
            </button>
            <span>{{ element.quantity }}</span>
            <button mat-icon-button (click)="onAddQuantity(element)">
              <mat-icon>add</mat-icon>
            </button>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let element">
            {{ element.quantity * element.price | currency }}
          </td>
          <td mat-footer-cell *matFooterCellDef>
            <span class="font-bold py-5 block">{{
              getTotal(cart.items) | currency
            }}</span>
          </td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>
            <button
              (click)="onClearCart()"
              mat-raised-button
              color="warn"
              class="float-right"
            >
              Clear All
            </button>
          </th>
          <td mat-cell *matCellDef="let element">
            <button
              (click)="onRemoveFromCart(element)"
              mat-mini-fab
              color="warn"
              class="float-right"
            >
              <mat-icon>close</mat-icon>
            </button>
          </td>
          <td mat-footer-cell *matFooterCellDef>
            <button
              (click)="onCheckout()"
              mat-raised-button
              color="primary"
              class="float-right"
            >
              Proceed To Checkout
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
      </table>
    </mat-card>
    <mat-card *ngIf="!cart.items.length" class="mx-auto my-3 max-w-7xl">
      <p>
        Your cart is empty.
        <button mat-raised-button routerLink="/home">Start Shopping</button>
      </p>
    </mat-card>`,
  styles: ``,
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = {items: []};
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
    // return 0;
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onCheckout(): void {
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe("your token");
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
