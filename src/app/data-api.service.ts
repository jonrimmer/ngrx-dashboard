import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ApiData {
  timestamp: number;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  connectionProblem = false;

  constructor() { }

  fetchData(): Observable<ApiData> {
    if (this.connectionProblem) {
      return throwError({
        code: 'FAIL'
      }).pipe(
        delay(1000)
      )
    }
    
    return of({
      timestamp: Date.now(),
      value: Math.floor((Math.random() * 100))
    })
    .pipe(
      // Delay between 0.5s and 1.5s
      delay(Math.floor((Math.random() * 1000) + 500))
    );
  }

  toggleConnectionProblem() {
    this.connectionProblem = !this.connectionProblem;
  }
}
