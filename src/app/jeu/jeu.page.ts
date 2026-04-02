import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonInput,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, refreshOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.page.html',
  styleUrls: ['./jeu.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonInput,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class JeuPage {

  nombreSecret: number = Math.floor(Math.random() * 100) + 1;
  nombreSaisi: number | null = null;
  message: string = '';
  essais: number = 0;
  maxEssais: number = 5;
  jeuTermine: boolean = false;
  jeuGagne: boolean = false;
  hint: 'up' | 'down' | '' = '';

  // Pour ngFor sur les cœurs
  get livesArray(): number[] {
    return Array.from({ length: this.maxEssais }, (_, i) => i + 1);
  }

  constructor(private router: Router) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'refresh-outline': refreshOutline,
      'checkmark-circle-outline': checkmarkCircleOutline
    });
  }

  verifier(): void {
    if (this.jeuTermine || this.nombreSaisi === null) return;

    this.essais++;

    if (this.nombreSaisi > this.nombreSecret) {
      this.message = 'Trop grand ! Essayez un nombre plus petit.';
      this.hint = 'down';
    } else if (this.nombreSaisi < this.nombreSecret) {
      this.message = 'Trop petit ! Essayez un nombre plus grand.';
      this.hint = 'up';
    } else {
      this.message = `Bravo ! Vous avez trouvé en ${this.essais} essai(s) !`;
      this.jeuGagne = true;
      this.jeuTermine = true;
      return;
    }

    if (this.essais >= this.maxEssais) {
      this.message = `Plus d'essais ! Le nombre secret était ${this.nombreSecret}.`;
      this.jeuTermine = true;
    }
  }

  rejouer(): void {
    this.nombreSecret = Math.floor(Math.random() * 100) + 1;
    this.nombreSaisi = null;
    this.message = '';
    this.essais = 0;
    this.jeuTermine = false;
    this.jeuGagne = false;
    this.hint = '';
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}