import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleFileInput() : void {
    // TODO: preview the files, and show terms checkbox before submitting
    // TODO: use ml5.js to classify food or not images.  
  }

}
