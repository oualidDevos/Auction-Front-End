import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ActivitiesViewModel } from '../viewModels/ActivitiesViewModel';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getActivities():Observable<any> {
    return this.http.get<ActivitiesViewModel>(this.baseUrl + "activities")
  }
}
