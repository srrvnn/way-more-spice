import { Injectable } from '@angular/core';
import { Corpus } from './corpus';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {
    const endpoint = 'http://localhost:3000/train';
    return this.httpClient.get(endpoint).pipe(map((r) => {
      return r["items"].map((i) => { return <Item>i; });
    }));
  }

  save(item: Item): Observable<Boolean> {
    const endpoint = 'http://localhost:3000/save';
    return this.httpClient.post(endpoint, item, {}).pipe(map(() => { return true; }));
  }

  upload(files: File[]): Observable<boolean> {
    // TODO what type should post be?
    let posts: any[] = [];
    for (let file of files) {
      posts.push(this.postFile(file));
    }
    return forkJoin(...posts);
  }

  corpus(): Observable<Corpus> {
    const endpoint = 'http://localhost:3000/corpus';
    return this.httpClient.get(endpoint).pipe(map((r) => {return <Corpus>r;}));
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://localhost:3000/upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: {} })
      .pipe(map(() => { return true; }));
  }
}
