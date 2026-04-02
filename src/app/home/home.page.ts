import { Component } from '@angular/core';
import { Router,RouterLink  } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonIcon,
     RouterLink
  ]
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({ 'chevron-forward-outline': chevronForwardOutline });
  }

  goToCalculs(): void {
    this.router.navigate(['/calculs']);
  }

  goToJeu(): void {
    this.router.navigate(['/jeu']);
  }

  goToUi(): void {
    this.router.navigate(['/ui']);
  }

  goToWeather() {
  this.router.navigate(['/weather']);
  }

  goToCamera(): void {
  this.router.navigate(['/camera']);
  }

  goToVideo(): void {
    this.router.navigate(['/video']);
  }

  goToToast(): void {
    this.router.navigate(['/toast']);
  }
}