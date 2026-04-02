import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonInput,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-calculs',
  templateUrl: './calculs.page.html',
  styleUrls: ['./calculs.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonInput,
    IonIcon,
    FormsModule
  ]
})
export class CalculsPage {

  num1: number | null = null;
  num2: number | null = null;
  result: number | string = 0;
  activeOp: string = '';

  constructor(private router: Router) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'refresh-outline': refreshOutline
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  add(): void {
    this.activeOp = '+';
    this.result = Number(this.num1) + Number(this.num2);
  }

  subtract(): void {
    this.activeOp = '−';
    this.result = Number(this.num1) - Number(this.num2);
  }

  multiply(): void {
    this.activeOp = '×';
    this.result = Number(this.num1) * Number(this.num2);
  }

  divide(): void {
    this.activeOp = '÷';
    if (Number(this.num2) === 0) {
      this.result = 'Erreur ÷ 0';
      return;
    }
    this.result = Number(this.num1) / Number(this.num2);
  }

  reset(): void {
    this.num1 = null;
    this.num2 = null;
    this.result = 0;
    this.activeOp = '';
  }
}