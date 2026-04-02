import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonButtons, IonBackButton, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { thermometer, compass, water } from 'ionicons/icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonIcon, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {

  country: any ;
  temp: any;
  pres: any;
  hum: any;
  weatherData: any;

  constructor(private http: HttpClient) {
    addIcons({ thermometer, compass, water });
    this.getWeatherData();
  }

  ngOnInit() {
  }

  getWeatherData(): void {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=01b415dbf0fb98db51997b09b3fb01eb&units=metric').subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        if (this.weatherData['sys']['country'] === 'EH') {
          this.country = 'MA';
        } else {
          this.country = this.weatherData['sys']['country'];
        }
        this.temp = this.weatherData['main']['temp'];
        this.pres = this.weatherData['main']['pressure'];
        this.hum = this.weatherData['main']['humidity'];
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}
