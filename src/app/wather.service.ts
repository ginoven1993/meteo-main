import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env, environment } from 'src/environments/environment.development';
import { AlerteService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class WatherService {

  constructor(private http: HttpClient,private alertService: AlerteService) { }

  getMetheoDta(log:number,lat:number):Observable<any> {
    return this.http.get<any>(
      `${environment.weatherUrl}forecast?location=${lat},${log}&apikey=${environment.weatherApiKey}`).pipe(tap((shops)=>this.log(shops)),catchError((error)=>this.handleError(error,[])));
  }
  getSunriseDta(log:number,lat:number):Observable<any> {
    return this.http.get<any>(
      `${env.weatherUrl}json?lat=${lat}&lng=${log}&date=today`).pipe(tap((shops)=>this.log(shops)),catchError((error)=>this.handleError(error,[])));
  }
  private log(
    object: any,
    message?: string
  ) {
    // console.table(object);
    if (message) {
      this.alertService.creatAlert('success', message, 3000);
    }
  }
  private handleError(error: Error, errorValue: any, message?: string) {
    console.error(error);
    if (message) {
      this.alertService.creatAlert('error', message, 5000);
    }
    return of(errorValue);
  }
}
