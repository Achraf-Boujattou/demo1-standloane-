import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonListHeader,
  IonAccordion,
  IonAccordionGroup,
  IonFab,
  IonFabButton,
  IonFabList,
  IonToast,
  IonBadge,
  IonProgressBar,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonDatetime,
  IonToggle,
  IonCheckbox,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  logoFacebook, logoAmazon, logoYoutube,
  add, share, colorPalette, globe,
  arrowBackOutline, informationCircleOutline, codeSlashOutline,
  notificationsOutline, shieldCheckmarkOutline, personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.page.html',
  styleUrls: ['./ui.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonListHeader,
    IonAccordion,
    IonAccordionGroup,
    IonFab,
    IonFabButton,
    IonFabList,
    IonToast,
    IonBadge,
    IonProgressBar,
    IonSpinner,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonDatetime,
    IonToggle,
    IonCheckbox,
    IonRadio,
    IonRadioGroup,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class UiPage {

  constructor(private router: Router) {
    // ✅ Enregistrer les icônes
    addIcons({
      'logo-facebook': logoFacebook,
      'logo-amazon': logoAmazon,
      'logo-youtube': logoYoutube,
      'add': add,
      'share': share,
      'color-palette': colorPalette,
      'globe': globe,
      'arrow-back-outline': arrowBackOutline,
      'information-circle-outline': informationCircleOutline,
      'code-slash-outline': codeSlashOutline,
      'notifications-outline': notificationsOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'person-outline': personOutline
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}