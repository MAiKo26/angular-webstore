import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {Subscription} from "rxjs";
import {StoreService} from "../../../../services/store.service";

@Component({
  selector: "app-filters",
  template: `
    <mat-expansion-panel *ngIf="categories">
      <mat-expansion-panel-header>
        <mat-panel-title> CATEGORIES </mat-panel-title>
      </mat-expansion-panel-header>
      <mat-selection-list [multiple]="false">
        <mat-list-option *ngFor="let category of categories" [value]="category">
          <button (click)="onShowCategory(category)">{{ category }}</button>
        </mat-list-option>
      </mat-selection-list>
    </mat-expansion-panel>
  `,
  styles: ``,
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.next(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
