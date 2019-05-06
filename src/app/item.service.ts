import { Injectable } from '@angular/core';
import { Corpus } from './corpus';
import { Item } from './item';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {
    const endpoint = environment.serverUrl + '/train';
    return this.httpClient.get(endpoint).pipe(map((r) => {
      return r["items"].map((i) => { return <Item>i; });
    }));
  }

  save(item: Item): Observable<Boolean> {
    const endpoint = environment.serverUrl + '/save';
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
    const endpoint = environment.serverUrl + '/corpus';
    return this.httpClient.get(endpoint).pipe(map((r) => {return <Corpus>r;}));
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = environment.serverUrl + '/upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: {} })
      .pipe(map(() => { return true; }));
  }
}
