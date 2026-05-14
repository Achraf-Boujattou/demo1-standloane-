import { Component } from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';

import {
  addIcons
} from 'ionicons';

import {
  calculator,
  gameController,
  colorPalette,
  partlySunny,
  map,
  camera,
  videocam,
  flashlight,
  qrCode,
  call,
  chatbubbles,
  mic,
  notifications,
  personCircleOutline
} from 'ionicons/icons';

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
    IonIcon,
    RouterLink
  ]
})
export class HomePage {

  constructor(
    private router: Router
  ) {
    addIcons({
      calculator,
      'game-controller': gameController,
      'color-palette': colorPalette,
      'partly-sunny': partlySunny,
      map,
      camera,
      videocam,
      flashlight,
      'qr-code': qrCode,
      call,
      chatbubbles,
      mic,
      notifications,
      'person-circle-outline': personCircleOutline
    });
  }

  // CALCULS
  goToCalculs(): void {
    this.router.navigate(['/calculs']);
  }

  // JEU
  goToJeu(): void {
    this.router.navigate(['/jeu']);
  }

  // UI
  goToUi(): void {
    this.router.navigate(['/ui']);
  }

  // WEATHER
  goToWeather(): void {
    this.router.navigate(['/weather']);
  }

  // CAMERA
  goToCamera(): void {
    this.router.navigate(['/camera']);
  }

  // VIDEO
  goToVideo(): void {
    this.router.navigate(['/video']);
  }

  // TORCH
  goToTorch(): void {
    this.router.navigate(['/torch']);
  }

  // QR SCANNER
  goToQrScanner(): void {
    this.router.navigate(['/qr-scanner']);
  }

  // TOAST
  goToToast(): void {
    this.router.navigate(['/toast']);
  }

  // SMS
  goToSms(): void {
    this.router.navigate(['/sms']);
  }

  // CALL
  goToCall(): void {
    this.router.navigate(['/call']);
  }

  // PLANS
  goToPlans(): void {
    this.router.navigate(['/plans']);
  }

  // AUDIO
  goToAudio(): void {
    this.router.navigate(['/audio-recorder']);
  }
}