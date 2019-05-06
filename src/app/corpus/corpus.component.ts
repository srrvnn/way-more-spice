import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Corpus } from '../corpus';

@Component({
  selector: 'app-corpus',
  templateUrl: './corpus.component.html',
  styleUrls: ['./corpus.component.css']
})
export class CorpusComponent implements OnInit {

  corpus: Corpus = {
    total: 2452,
    trained: 43,
    trained_ratio: 43/2452,
    untrained: 2409,
    untrained_ratio: 2409/2452,
  }

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.corpus().subscribe((corpus) => this.corpus = corpus);
  }

}
