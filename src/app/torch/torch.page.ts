import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  IonicModule
} from '@ionic/angular';

import {
  Router
} from '@angular/router';

import {
  Torch
} from '@capawesome/capacitor-torch';

import {
  addIcons
} from 'ionicons';

import {
  bulb,
  powerOutline,
  flashOutline,
  flashOffOutline,
  arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-torch',

  templateUrl: './torch.page.html',

  styleUrls: ['./torch.page.scss'],

  standalone: true,

  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class TorchPage {

  isTorchOn: boolean = false;

  constructor(
    private router: Router
  ) {

    addIcons({

      bulb,

      powerOutline,

      flashOutline,

      flashOffOutline,

      arrowBackOutline
    });
  }

  // GO HOME
  goHome() {

    this.router.navigate(['/home']);
  }

  // TURN ON TORCH
  async turnOn() {

    try {

      await Torch.enable();

      this.isTorchOn = true;

    } catch (e) {

      console.error(
        'Torch error:',
        e
      );
    }
  }

  // TURN OFF TORCH
  async turnOff() {

    try {

      await Torch.disable();

      this.isTorchOn = false;

    } catch (e) {

      console.error(
        'Torch error:',
        e
      );
    }
  }

  // TOGGLE TORCH
  async toggle() {

    try {

      await Torch.toggle();

      this.isTorchOn =
        !this.isTorchOn;

    } catch (e) {

      console.error(
        'Torch error:',
        e
      );
    }
  }
}