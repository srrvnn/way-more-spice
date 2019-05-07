import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Corpus } from '../corpus';

@Component({
  selector: 'app-corpus',
  templateUrl: './corpus.component.html',
  styleUrls: ['./corpus.component.scss']
})
export class CorpusComponent implements OnInit {

  status: string;
  corpus: Corpus;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.status = 'loading';
    this.getCorpus();
  }

  getCorpus(): void {
    this.itemService.corpus().subscribe((corpus) => {
      this.status = 'done';
      this.corpus = corpus;
    });
  }

}
