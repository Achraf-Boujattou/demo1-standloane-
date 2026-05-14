import {
  Component,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent
} from '@ionic/angular/standalone';

import {
  AlertController,
  ToastController,
  Platform
} from '@ionic/angular';

import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  BarcodesScannedEvent
} from '@capacitor-mlkit/barcode-scanning';

import {
  Clipboard
} from '@capacitor/clipboard';

import {
  PluginListenerHandle
} from '@capacitor/core';

import {
  addIcons
} from 'ionicons';

import {
  qrCodeOutline,
  flashOutline,
  flashOffOutline,
  closeOutline,
  refreshOutline,
  copyOutline,
  globeOutline,
  textOutline,
  checkmarkCircle,
  arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-qr-scanner',

  templateUrl: './qr-scanner.page.html',

  styleUrls: ['./qr-scanner.page.scss'],

  standalone: true,

  imports: [
    CommonModule,

    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent
  ]
})
export class QrScannerPage
implements OnInit, OnDestroy {

  isScanning = false;

  scannedResult:
    string | null = null;

  isTorchOn = false;

  isUrl = false;

  scanListener:
    PluginListenerHandle | null = null;

  constructor(

    private alertController:
      AlertController,

    private toastController:
      ToastController,

    private platform:
      Platform,

    private ngZone:
      NgZone,

    private router:
      Router

  ) {

    addIcons({

      qrCodeOutline,

      flashOutline,

      flashOffOutline,

      closeOutline,

      refreshOutline,

      copyOutline,

      globeOutline,

      textOutline,

      checkmarkCircle,

      arrowBackOutline
    });
  }

  // HOME
  goHome() {

    this.router.navigate(['/home']);
  }

  async ngOnInit() {

    if (this.platform.is('capacitor')) {

      await BarcodeScanner
        .installGoogleBarcodeScannerModule();
    }
  }

  ngOnDestroy() {

    this.stopScan();
  }

  // START SCAN
  async startScan() {

    try {

      const granted =
        await this.requestPermissions();

      if (!granted) {

        this.presentAlert(
          'Permission refusée',
          'Caméra nécessaire.'
        );

        return;
      }

      this.isScanning = true;

      this.scannedResult = null;

      // IMPORTANT
      document.body.classList.add(
        'barcode-scanner-active'
      );

      if (this.scanListener) {

        await this.scanListener.remove();
      }

      this.scanListener =
        await BarcodeScanner.addListener(

        'barcodesScanned',

        (event: BarcodesScannedEvent) => {

          this.ngZone.run(() => {

            if (
              event.barcodes.length > 0
            ) {

              const val =
                event.barcodes[0].displayValue;

              this.scannedResult = val;

              this.isUrl =
                this.checkIfUrl(val);

              this.stopScan();
            }
          });
        });

      await BarcodeScanner.startScan({

        formats: [
          BarcodeFormat.QrCode
        ],

        lensFacing:
          LensFacing.Back
      });

    } catch (err) {

      console.error(err);

      this.stopScan();
    }
  }

  // STOP
  async stopScan() {

    this.isScanning = false;

    document.body.classList.remove(
      'barcode-scanner-active'
    );

    if (this.scanListener) {

      await this.scanListener.remove();

      this.scanListener = null;
    }

    await BarcodeScanner.stopScan();
  }

  // FLASH
  async toggleTorch() {

    this.isTorchOn =
      !this.isTorchOn;

    await BarcodeScanner.toggleTorch();
  }

  // COPY
  async copyToClipboard() {

    if (!this.scannedResult) return;

    await Clipboard.write({

      string:
        this.scannedResult
    });

    const toast =
      await this.toastController.create({

      message: 'Copié !',

      duration: 2000,

      color: 'dark'
    });

    toast.present();
  }

  // URL
  openUrl() {

    if (
      this.isUrl &&
      this.scannedResult
    ) {

      window.open(
        this.scannedResult,
        '_system'
      );
    }
  }

  // CHECK URL
  checkIfUrl(
    str: string
  ): boolean {

    return str.startsWith('http');
  }

  // PERMISSIONS
  async requestPermissions():
  Promise<boolean> {

    const { camera } =
      await BarcodeScanner.requestPermissions();

    return (
      camera === 'granted' ||
      camera === 'limited'
    );
  }

  // ALERT
  async presentAlert(
    header: string,
    message: string
  ) {

    const alert =
      await this.alertController.create({

      header,

      message,

      buttons: ['OK'],
    });

    await alert.present();
  }

  // RESET
  reset() {

    this.scannedResult = null;

    this.isUrl = false;
  }
}