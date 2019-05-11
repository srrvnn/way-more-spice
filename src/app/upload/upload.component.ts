import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ImageService } from "../image.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  files: File[];
  preview: (string | ArrayBuffer)[];
  uploadStatus: boolean;
  loading: boolean = false;

  @Output()
  uploaded = new EventEmitter<string>();

  constructor(private ImageService: ImageService) {}

  ngOnInit() {}

  openFiles(files: FileList): void {
    this.loading = true;
    // TODO: is it possible to use ml5.js to eliminate non food images?
    for (var i = 0; i < files.length; i++) {
      this.preview = this.preview || [];
      this.files = this.files || [];

      this.files.push(files.item(i));
      const reader = new FileReader();
      reader.onload = e => this.preview.push(reader.result);
      reader.readAsDataURL(files.item(i));
    }
    this.loading = false;
  }

  uploadFiles(): void {
    this.loading = true;
    if (!this.files.length) {
      this.clearFiles();
    }
    this.ImageService.upload(this.files).subscribe(status => {
      this.clearFiles();
      this.uploadStatus = status;
      this.loading = false;
      this.uploaded.emit("complete");
    });
  }

  clearFiles(): void {
    this.files = null;
    this.preview = null;
  }
}
