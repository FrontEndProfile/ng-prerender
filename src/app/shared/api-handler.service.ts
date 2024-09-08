import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
    private apiUrl = 'https://firestore.googleapis.com/v1/projects/ng-asmco/databases/(default)/documents/products';
    constructor(private http: HttpClient) {}
  
    getAllCards(): Observable<any[]> {
      return this.http.get<any>(this.apiUrl).pipe(
        map((data) => {
          return data.documents.map((doc) => {
            const id = doc.name.split('/').pop();
            const fields = {};
            for (const key in doc.fields) {
              if (doc.fields[key].stringValue) {
                fields[key] = doc.fields[key].stringValue;
              } else if (doc.fields[key].mapValue) {
                // Skip objects
              }
            }
            return { id, ...fields };
          });
        })
      );
    }
  
    getCardById(cardId: string): Observable<any> {
      const url = `${this.apiUrl}/${cardId}`;
      return this.http.get<any>(url).pipe(
        map((data) => {
          const id = data.name.split('/').pop();
          const fields = {};
          for (const key in data.fields) {
            if (data.fields[key].stringValue) {
              fields[key] = data.fields[key].stringValue;
            } else if (data.fields[key].mapValue) {
              // Skip objects
            }
          }
          return { id, ...fields };
        })
      );
    }
}
