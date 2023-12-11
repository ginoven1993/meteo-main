import { Component } from '@angular/core';
import { WatherService } from '../wather.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

// import { GeolocationService } from '@ng-web-apis/geolocation';
@Component({
  selector: 'app-frist-page',
  templateUrl: './frist-page.component.html',
  styleUrls: ['./frist-page.component.css'],
})
export class FristPageComponent {
  constructor(private watherService: WatherService, private http: HttpClient) {}

  tomorrow: boolean = false;
  data: any;
  dayData: any;
  temperature: any;
  apparentTemperature: any;
  windSpeed: any;
  humidity: any;
  visibility: any;
  uvIndex: any;
  sunData: any; // Latitude: number = 0;
  // Longitude: number = 0;
  // getPosition() {
  //   this.geolocation$.subscribe((position) =>
  //     console.log(doSomethingWithPosition(position))
  //   );
  // }
  private _jsonURL = 'assets/file.json';
  ngOnInit() {
    // this.getPosition();
    navigator.geolocation.getCurrentPosition(async (success) => {
      let { latitude, longitude } = await success.coords;
      // this.Latitude = latitude;
      // this.Longitude = longitude;
      this.watherService.getMetheoDta(longitude, latitude).subscribe((res) => {
        this.data = res;
        console.log(this.data);
        this.information();
        this.updateMeteo(false);
      });

      this.watherService.getSunriseDta(longitude, latitude).subscribe((res) => {
        this.data = res;
        console.log(this.data);
       this.checkTimeOfDay();
      });
      // await this.getJSON().subscribe((res) => {
      //   this.data = res;
      //   // console.log(this.data);
      //   this.information();
      //   this.updateMeteo(false);
      // });
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  checkTimeOfDay() {
    const currentTime = new Date();
    const sunriseTime = this.parseTimeString(this.data.results.sunrise);
    const sunsetTime = this.parseTimeString(this.data.results.sunset);

    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
      this.displaySunriseData();
    } else {
      this.displaySunsetData();
    }
  }
  parseTimeString(timeString: string): Date {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date;
  }
  displaySunriseData() {
    this.sunData = "Sunrise " + this.data.results.sunrise;
  }

  displaySunsetData() {
    this.sunData = "Sunset " + this.data.results.sunset;
  }
 
  information() {
    // console.log(this.data);
    this.temperature = this.data.timelines.daily[0].values.temperatureMax;
    this.apparentTemperature =
      this.data.timelines.daily[0].values.temperatureMin;
    this.windSpeed = this.data.timelines.daily[0].values.windSpeedAvg;
    this.humidity = this.data.timelines.daily[0].values.humidityAvg;
    this.visibility = this.data.timelines.daily[0].values.visibilityAvg;
    this.uvIndex = this.data.timelines.daily[0].values.uvIndexAvg;
  }
  updateMeteo(forTomorrow: boolean) {
    if (forTomorrow) {
      this.dayData = [];
      const nextDay = new Date(this.data.timelines.daily[2].time).getDate();
      // console.log(nextDay);
      let count = 0;
      for (let i = 0; i < this.data.timelines.hourly.length; i++) {
        if (
          nextDay === new Date(this.data.timelines.hourly[i].time).getDate() &&
          new Date(this.data.timelines.hourly[i].time).getHours() ===
            new Date(this.data.timelines.hourly[0].time).getHours()
        ) {
          // console.log(new Date(this.data.timelines.hourly[i].time));
          for (let j = i; j < this.data.timelines.hourly.length; j++) {
            // console.log(new Date(this.data.timelines.hourly[j].time));
            this.dayData.push(this.data.timelines.hourly[j]);
            count += 1;
            if (count === 5) break;
          }
          break;
        }
      }
      this.tomorrow = true;
    } else {
      this.dayData = [];
      for (let i = 0; i < this.data.timelines.hourly.length; i++) {
        this.dayData.push(this.data.timelines.hourly[i]);
        if (i === 4) break;
      }
      // console.log(this.dayData);

      this.tomorrow = false;
    }
  }
  Date(date: string | null | undefined): string {
    if (date) {
      return formatDate(date, 'shortDate', 'fr-FR');
    }
    return formatDate(Date.now().toString(), 'shortDate', 'fr-FR');
  }
  Hours(date: string) {
    const birthday = new Date(date);

    return birthday.getHours();
  }
}
function doSomethingWithPosition(position: GeolocationPosition): void {
  throw new Error('Function not implemented.');
}
