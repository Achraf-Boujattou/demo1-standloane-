import { Component, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

// 🔥 import icône
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons, // 👈 important
    IonIcon,    // 👈 important
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class CameraPage implements OnInit {

  capturedImage: string | null = null;

  constructor(private router: Router) {
    // 🔥 enregistrer l’icône
    addIcons({
      'arrow-back-outline': arrowBackOutline
    });
  }

  ngOnInit() {}

  // 📸 prendre photo
  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if (image.webPath) {
        this.capturedImage = image.webPath;
      }

    } catch (error: any) {
      // ignorer si utilisateur annule
      if (error?.message !== 'User cancelled photos app') {
        console.error('Camera error:', error);
      }
    }
  }

  // 🗑️ supprimer image
  deleteImage() {
    this.capturedImage = null;
  }

  // 🔙 retour vers home
  goHome(): void {
    this.router.navigate(['/home']);
  }
}