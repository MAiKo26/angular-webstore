import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: "app-products-header",
  template: `
    <mat-card class="mb-4">
      <div class="flex justify-between">
        <div>
          <button mat-button [matMenuTriggerFor]="sortByMenu">
            Sort by {{ sort }}
            <mat-icon>expand_more</mat-icon>
          </button>
          <mat-menu #sortByMenu="matMenu">
            <button (click)="onSortUpdated('desc')" mat-menu-item>desc</button>
            <button (click)="onSortUpdated('asc')" mat-menu-item>asc</button>
          </mat-menu>
        </div>
        <div class="flex items-center">
          <div>
            <button mat-button [matMenuTriggerFor]="menu">
              Show {{ itemsShowCount }}
              <mat-icon>expand_more</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button (click)="onItemsUpdated(12)" mat-menu-item>12</button>
              <button (click)="onItemsUpdated(24)" mat-menu-item>24</button>
              <button (click)="onItemsUpdated(36)" mat-menu-item>36</button>
            </mat-menu>
          </div>
          <button (click)="onColumnsUpdated(1)">
            <mat-icon>view_list</mat-icon>
          </button>
          <button (click)="onColumnsUpdated(3)">
            <mat-icon>view_module</mat-icon>
          </button>
          <button (click)="onColumnsUpdated(4)">
            <mat-icon>view_comfy</mat-icon>
          </button>
        </div>
      </div>
    </mat-card>
  `,
  styles: ``,
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  itemsShowCount = 12;
  sort = "desc";

  constructor() {}

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onItemsUpdated(count: number): void {
    this.itemsCountChange.emit(count);
    this.itemsShowCount = count;
  }

  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }
}
