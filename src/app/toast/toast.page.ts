import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonLabel // ✅ important
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';

// 🔥 icône retour
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastController, AlertController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonInput,
    IonLabel,      // ✅ corrigé
    CommonModule,
    FormsModule
  ]
})
export class ToastPage {

  val1: string = '';
  val2: string = '';

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline
    });
  }

  // 🍞 Toast
  async showSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Succès ✅',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async showError() {
    const toast = await this.toastCtrl.create({
      message: 'Erreur ❌',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  async showWarning() {
    const toast = await this.toastCtrl.create({
      message: 'Attention ⚠️',
      duration: 2000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
  }

  // 📢 Alert
  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Ceci est une alerte !',
      buttons: ['OK']
    });
    await alert.present();
  }

  // ❓ Confirm
  async showConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Voulez-vous continuer ?',
      buttons: ['Annuler', 'OK']
    });
    await alert.present();
  }

  // ✍️ Prompt
  async showPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Prompt',
      inputs: [
        {
          name: 'text',
          placeholder: 'Entrer un texte'
        }
      ],
      buttons: ['Annuler', 'OK']
    });
    await alert.present();
  }

  // 📋 Copier
  async writeToClipboard() {
    await Clipboard.write({
      string: this.val1
    });

    this.showSuccess();
  }

  // 📥 Coller
  async checkClipboard() {
    const result = await Clipboard.read();
    this.val2 = result.value;
  }

  // 🔙 Retour Home
  goHome(): void {
    this.router.navigate(['/home']);
  }
}