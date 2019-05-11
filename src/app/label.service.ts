import { Injectable } from "@angular/core";
import { Item } from "./item";
import { Observable, of, forkJoin } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LabelService {
  constructor(private httpClient: HttpClient) {}

  save(item: Item): Observable<Item> {
    const endpoint = environment.serverUrl + "/labels";
    return this.httpClient.post(endpoint, item, {}).pipe(
      map(response => {
        return response["label"];
      })
    );
  }
}
