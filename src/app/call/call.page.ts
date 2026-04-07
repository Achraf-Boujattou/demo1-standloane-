import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonCardContent, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { callOutline, personOutline, keypadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonCardContent, IonText, CommonModule, FormsModule]
})
export class CallPage implements OnInit {

  phoneNumber: string = '';

  constructor() {
    addIcons({ callOutline, personOutline, keypadOutline });
  }

  ngOnInit() {
  }

  makeCall() {
    if (this.phoneNumber.trim() === '') {
      alert('Veuillez entrer un numéro de téléphone');
      return;
    }

    // Le schéma 'tel:' ouvre le numéroteur natif
    window.location.href = `tel:${this.phoneNumber}`;
  }

}
