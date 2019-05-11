import { Injectable } from "@angular/core";
import { Corpus } from "./corpus";
import { Item } from "./item";
import { Observable, of, forkJoin } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  getUntrainedImages(): Observable<Item[]> {
    const endpoint = environment.serverUrl + "/images/untrained";
    return this.httpClient.get(endpoint).pipe(
      map(response => {
        return response["images"].map(image => {
          return <Item>image;
        });
      })
    );
  }

  upload(files: File[]): Observable<boolean> {
    // TODO what type should post be?
    let posts: any[] = [];
    for (let file of files) {
      posts.push(this.postFile(file));
    }
    return forkJoin(...posts);
  }

  getImages(): Observable<Corpus> {
    const endpoint = environment.serverUrl + "/images";
    return this.httpClient.get(endpoint).pipe(
      map(response => {
        return <Corpus>response;
      })
    );
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = environment.serverUrl + "/images";
    var signed_url = "";

    return this.httpClient
      .post(
        endpoint,
        {
          content_type: fileToUpload.type,
          extension: fileToUpload.name.split(".").pop()
        },
        {}
      )
      .pipe(
        mergeMap(response => this.httpClient.put(response["url"], fileToUpload))
      )
      .pipe(
        map(res => {
          // TODO: handle errors from uploading to AWS
          return true;
        })
      );
  }
}
