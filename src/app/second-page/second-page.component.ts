import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css'],
})
export class SecondPageComponent {
  tomorrow: boolean = false;
  data: any;
  dayData: any;
  temperature: any;
  apparentTemperature: any;
  windSpeed: any;
  humidity: any;
  visibility: any;
  uvIndex: any;
  time:any;
  constructor(private location: Location) {}
  ngOnInit() {
    // console.log(this.location.getState());
    this.data = this.location.getState()
    this.information()
  }
  information() {
    // console.log(this.data);
    this.dayData = this.data.timelines.daily
    this.temperature = this.data.timelines.daily[0].values.temperatureMax;
    this.apparentTemperature =
      this.data.timelines.daily[0].values.temperatureMin;
    this.windSpeed = this.data.timelines.daily[0].values.windSpeedAvg;
    this.humidity = this.data.timelines.daily[0].values.humidityAvg;
    this.visibility = this.data.timelines.daily[0].values.visibilityAvg;
    this.uvIndex = this.data.timelines.daily[0].values.uvIndexAvg;
    this.time=this.data.timelines.daily[0].time
  }
  DateName(date:string){
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
  }
  DateName2(date:string){
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
  }
}
