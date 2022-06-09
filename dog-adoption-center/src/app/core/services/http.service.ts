import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Breed } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBreedsList(): Observable<Array<Breed>> {
    return this.http.get<Array<Breed>>(`${environment.BASE_URL}/breeds`);
  }

  getBreedDetails(id: string): Observable<Breed> {
    return this.http.get<Breed>(`${environment.BASE_URL}/breeds/${id}`);
  }
}
