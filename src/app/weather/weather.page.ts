// weather.page.ts

import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonList,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonIcon,
  IonText,
  IonSearchbar,
  IonButton
} from '@ionic/angular/standalone';

import {
  HttpClient
} from '@angular/common/http';

import {
  addIcons
} from 'ionicons';

import {
  thermometer,
  compass,
  water,
  locationOutline,
  partlySunnyOutline,
  leafOutline,
  searchOutline,
  timeOutline,
  trashOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-weather',

  templateUrl: './weather.page.html',

  styleUrls: ['./weather.page.scss'],

  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonSearchbar,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class WeatherPage
implements OnInit {

  country: any;

  city: any;

  description: any;

  temp: any;

  pres: any;

  hum: any;

  weatherData: any;

  searchQuery: string = '';

  private searchTimeout: any;

  // HISTORY
  history: string[] = [];

  showHistory = false;

  private API_KEY =
    '01b415dbf0fb98db51997b09b3fb01eb';

  constructor(
    private http: HttpClient
  ) {

    addIcons({

      thermometer,
      compass,
      water,
      locationOutline,
      partlySunnyOutline,
      leafOutline,
      searchOutline,
      timeOutline,
      trashOutline
    });

    // LOAD HISTORY
    this.loadHistory();

    // DEFAULT CITY
    this.getWeatherData('London');
  }

  ngOnInit() {}

  // TOGGLE HISTORY
  toggleHistory() {

    this.showHistory =
      !this.showHistory;
  }

  // SEARCH AUTO
  onSearchChange() {

    clearTimeout(
      this.searchTimeout
    );

    const query =
      this.searchQuery.trim();

    if (query.length < 3)
      return;

    this.searchTimeout =
      setTimeout(() => {

      this.getWeatherData(
        query
      );

    }, 600);
  }

  // ENTER SEARCH
  searchCity() {

    clearTimeout(
      this.searchTimeout
    );

    const query =
      this.searchQuery.trim();

    if (query.length >= 3) {

      this.getWeatherData(
        query
      );
    }
  }

  // GET WEATHER
  getWeatherData(
    city: string
  ): void {

    this.weatherData = null;

    const normalizedName = city

      .toLowerCase()

      .normalize("NFD")

      .replace(
        /[\u0300-\u036f]/g,
        ""
      )

      .replace(
        /[^a-z0-9]/g,
        " "
      )

      .replace(
        /\s+/g,
        " "
      )

      .trim();

    let isQods = false;

    if (

      normalizedName.includes(
        'quds'
      )

      ||

      normalizedName.includes(
        'qods'
      )

    ) {

      isQods = true;
    }

    let queryCity = city;

    if (isQods) {

      queryCity = 'Jerusalem';
    }

    this.http.get(

      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${this.API_KEY}&units=metric`

    ).subscribe(

      (data: any) => {

        this.weatherData = data;

        if (isQods) {

          this.city = 'Al-Quds';

          this.country = 'PS';

        } else {

          this.city = data.name;

          this.country =
            data.sys.country;
        }

        this.description =
          data.weather[0].main;

        this.temp =
          Math.round(
            data.main.temp
          );

        this.pres =
          data.main.pressure;

        this.hum =
          data.main.humidity;

        // SAVE HISTORY
        this.saveToHistory(
          this.city
        );
      },

      (error) => {

        console.error(error);

        alert(
          'Ville non trouvée'
        );
      }
    );
  }

  // SAVE HISTORY
  saveToHistory(
    city: string
  ) {

    // REMOVE DUPLICATE
    this.history =
      this.history.filter(
        item => item !== city
      );

    // ADD FIRST
    this.history.unshift(city);

    // LIMIT
    this.history =
      this.history.slice(0, 10);

    localStorage.setItem(

      'weatherHistory',

      JSON.stringify(
        this.history
      )
    );
  }

  // LOAD HISTORY
  loadHistory() {

    const data =
      localStorage.getItem(
        'weatherHistory'
      );

    if (data) {

      this.history =
        JSON.parse(data);
    }
  }

  // CLICK HISTORY
  selectHistory(
    city: string
  ) {

    this.searchQuery = city;

    this.getWeatherData(city);
  }

  // CLEAR HISTORY
  clearHistory() {

    this.history = [];

    localStorage.removeItem(
      'weatherHistory'
    );
  }
}