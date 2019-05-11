import { Component, OnInit } from "@angular/core";
import { ImageService } from "../image.service";
import { LabelService } from "../label.service";
import { HotkeysService, Hotkey } from "angular2-hotkeys";
import { Item } from "../item";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  status: string;

  items: Item[];
  currentIndex: number;
  currentItem: Item;

  hotkeys: Hotkey[] = [];

  constructor(
    private ImageService: ImageService,
    private LabelService: LabelService,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeys.concat(
      this.hotkeysService.add(
        new Hotkey(
          "1",
          (event: KeyboardEvent): boolean => {
            if (this.currentItem) {
              this.updateFood();
            }
            return false;
          }
        )
      )
    );
    this.hotkeys.concat(
      this.hotkeysService.add(
        new Hotkey(
          "2",
          (event: KeyboardEvent): boolean => {
            if (this.currentItem) {
              this.updateSpicy();
            }
            return false; // Prevent bubbling
          }
        )
      )
    );
    this.hotkeys.concat(
      this.hotkeysService.add(
        new Hotkey(
          "return",
          (event: KeyboardEvent): boolean => {
            this.submit(this.currentItem);
            return false; // Prevent bubbling
          }
        )
      )
    );
  }

  ngOnInit() {
    this.status = "loading";
    this.getImages();
  }

  ngOnDestroy() {
    for (let hotkey of this.hotkeys) {
      this.hotkeysService.remove(hotkey);
    }
  }

  // retreive a list of items from the items service
  getImages(): void {
    this.ImageService.getUntrainedImages().subscribe(images => {
      this.items = images;
      this.currentIndex = 0;
      this.currentItem = this.items[0];

      if (this.items.length < 1) {
        this.status = "done";
      } else {
        this.status = "training";
      }
    });
  }

  // called on click on submit button for an item
  submit(item: Item): void {
    this.LabelService.save(this.currentItem).subscribe(status => {
      if (this.currentIndex + 1 == this.items.length) {
        this.currentItem = null;
        this.status = "done";
      } else {
        this.currentIndex++;
        this.currentItem = this.items[this.currentIndex];
      }
    });
  }

  refresh(): void {
    this.getImages();
  }

  updateFood(): void {
    // marking it as not food
    if (this.currentItem.food_label) {
      this.currentItem.food_label = false;
      this.currentItem.spicy_label = false;
    } else {
      this.currentItem.food_label = true;
    }
  }

  updateSpicy(): void {
    // marking it as not spicy
    if (this.currentItem.spicy_label) {
      this.currentItem.spicy_label = false;
    } else {
      this.currentItem.food_label = true;
      this.currentItem.spicy_label = true;
    }
  }
}
