import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// icône retour
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    CommonModule
  ],
  providers: [MediaCapture]
})
export class VideoPage {

  videoPath: string | null = null;

  constructor(
    private mediaCapture: MediaCapture,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline
    });
  }

  // 🎥 Enregistrer vidéo
  async recordVideo() {
    try {
      const data: any = await this.mediaCapture.captureVideo();

      if (data.length > 0) {
        this.videoPath = (window as any).Ionic.WebView.convertFileSrc(
          data[0].fullPath
        );

        this.showToast('Vidéo enregistrée 🎥');
      }

    } catch (err) {
      console.error('Erreur vidéo:', err);
      this.showToast('Erreur lors de la capture ❌', 'danger');
    }
  }

  // 🗑️ Supprimer vidéo
  deleteVideo() {
    this.videoPath = null;
    this.showToast('Vidéo supprimée 🗑️', 'warning');
  }

  // 🔙 Retour Home
  goHome(): void {
    this.router.navigate(['/home']);
  }

  // 🍞 Toast
  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });

    await toast.present();
  }
}