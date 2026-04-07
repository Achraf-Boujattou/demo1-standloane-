import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline, chatbubbleEllipsesOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonCard, IonCardContent, CommonModule, FormsModule]
})
export class SmsPage implements OnInit {

  phoneNumber: string = '';
  message: string = '';

  constructor() {
    addIcons({ sendOutline, chatbubbleEllipsesOutline, personOutline });
  }

  ngOnInit() {
  }

  sendSMS() {
    if (this.phoneNumber.trim() === '' || this.message.trim() === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Protection contre les caractères spéciaux dans le message
    const encodedMessage = encodeURIComponent(this.message);
    
    // Le schéma 'sms:' ouvre l'application de messagerie par défaut
    // format: sms:[number]?body=[message] (marche sur iOS et Android)
    const smsUrl = `sms:${this.phoneNumber}?body=${encodedMessage}`;
    
    window.location.href = smsUrl;
  }

}
