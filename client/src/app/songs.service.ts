import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Song } from './model/song';

const API_URL: string = "http://localhost:5000"
const SONGS_API_URL: string = API_URL + "/api/search";

@Injectable()
export class SongsService {

  constructor(private http: Http) { }

  public getSongs(query: string): Observable<Song[]> {
    return this.http.get(SONGS_API_URL + "?q=" + query)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
