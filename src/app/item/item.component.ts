import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  currentIndex: number; 
  currentItem: Item;
  items: Item[];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.getItems();
  }

  // retreive a list of items from the items service
  getItems(): void {
    this.itemService.getItems().subscribe(items => {this.items = items; this.currentIndex = 0;
    this.currentItem = this.items[0];});
  }

  // called on click on submit button for an item 
  submit(item: Item): void {
    this.itemService.save(this.currentItem).subscribe(status => {
      if (this.currentIndex + 1 == this.items.length) {
        this.currentItem = null;
      } else {
        this.currentIndex++;
        this.currentItem = this.items[this.currentIndex];
      }
    });
  }
}
