import { Component, OnInit } from "@angular/core";
import { ImageService } from "../image.service";
import { Corpus } from "../corpus";

@Component({
  selector: "app-corpus",
  templateUrl: "./corpus.component.html",
  styleUrls: ["./corpus.component.scss"]
})
export class CorpusComponent implements OnInit {
  status: string;
  corpus: Corpus;

  constructor(private ImageService: ImageService) {}

  ngOnInit() {
    this.status = "loading";
    this.getCorpus();
  }

  getCorpus(): void {
    this.ImageService.getImages().subscribe(response => {
      this.status = "done";
      this.corpus = response;
    });
  }
}
