import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  status: string; 

  items: Item[];
  currentIndex: number;
  currentItem: Item;
  
  hotkeys: Hotkey[] = [];

  constructor(private itemService: ItemService, private hotkeysService: HotkeysService) {
    this.hotkeys.concat(this.hotkeysService.add(new Hotkey('1', (event: KeyboardEvent): boolean => {
      if (this.currentItem) {
        this.currentItem.food = !this.currentItem.food;
      }
      return false;
    })));
    this.hotkeys.concat(this.hotkeysService.add(new Hotkey('2', (event: KeyboardEvent): boolean => {
      if (this.currentItem) {
        this.currentItem.spicy = !this.currentItem.spicy;
      }
      return false; // Prevent bubbling
    })));
    this.hotkeys.concat(this.hotkeysService.add(new Hotkey('return', (event: KeyboardEvent): boolean => {
      this.submit(this.currentItem);
      return false; // Prevent bubbling
    })));
  }

  ngOnInit() {
    this.status = 'loading';
    this.getItems();
  }

  ngOnDestroy() {
    for (let hotkey of this.hotkeys) {
      this.hotkeysService.remove(hotkey);
    }
  }

  // retreive a list of items from the items service
  getItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items; 
      this.currentIndex = 0;
      this.currentItem = this.items[0];

      if (this.items.length < 1) {
        this.status = 'done';
      } else {
        this.status = 'training';
      }
    });
  }

  // called on click on submit button for an item 
  submit(item: Item): void {
    this.itemService.save(this.currentItem).subscribe(status => {
      if (this.currentIndex + 1 == this.items.length) {
        this.currentItem = null;
        this.status = 'done';
      } else {
        this.currentIndex++;
        this.currentItem = this.items[this.currentIndex];
      }
    });
  }

  refresh(): void {
    this.getItems();
  }
}
