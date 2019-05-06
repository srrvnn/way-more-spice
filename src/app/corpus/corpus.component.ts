import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Corpus } from '../corpus';

@Component({
  selector: 'app-corpus',
  templateUrl: './corpus.component.html',
  styleUrls: ['./corpus.component.css']
})
export class CorpusComponent implements OnInit {

  corpus: Corpus;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.corpus().subscribe((corpus) => this.corpus = corpus);
  }

}
