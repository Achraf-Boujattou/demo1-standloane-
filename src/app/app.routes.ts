import { Routes } from '@angular/router';

export const routes: Routes = [

  // HOME
  {
    path: 'home',

    loadComponent: () =>
      import('./home/home.page')
      .then((m) => m.HomePage),
  },

  // DEFAULT
  {
    path: '',

    redirectTo: 'home',

    pathMatch: 'full',
  },

  // CALCULS
  {
    path: 'calculs',

    loadComponent: () =>
      import('./calculs/calculs.page')
      .then((m) => m.CalculsPage)
  },

  // JEU
  {
    path: 'jeu',

    loadComponent: () =>
      import('./jeu/jeu.page')
      .then((m) => m.JeuPage)
  },

  // UI
  {
    path: 'ui',

    loadComponent: () =>
      import('./ui/ui.page')
      .then((m) => m.UiPage)
  },

  // WEATHER
  {
    path: 'weather',

    loadComponent: () =>
      import('./weather/weather.page')
      .then((m) => m.WeatherPage)
  },

  // CAMERA
  {
    path: 'camera',

    loadComponent: () =>
      import('./camera/camera.page')
      .then((m) => m.CameraPage)
  },

  // VIDEO
  {
    path: 'video',

    loadComponent: () =>
      import('./video/video.page')
      .then((m) => m.VideoPage)
  },

  // TORCH
  {
    path: 'torch',

    loadComponent: () =>
      import('./torch/torch.page')
      .then((m) => m.TorchPage)
  },

  // QR SCANNER
  {
    path: 'qr-scanner',

    loadComponent: () =>
      import('./qr-scanner/qr-scanner.page')
      .then((m) => m.QrScannerPage)
  },

  // TOAST
  {
    path: 'toast',

    loadComponent: () =>
      import('./toast/toast.page')
      .then((m) => m.ToastPage)
  },

  // PLANS
  {
    path: 'plans',

    loadComponent: () =>
      import('./plans/plans.page')
      .then((m) => m.PlansPage)
  },

  // SMS
  {
    path: 'sms',

    loadComponent: () =>
      import('./sms/sms.page')
      .then((m) => m.SmsPage)
  },

  // CALL
  {
    path: 'call',

    loadComponent: () =>
      import('./call/call.page')
      .then((m) => m.CallPage)
  },

  // AUDIO RECORDER
  {
    path: 'audio-recorder',

    loadComponent: () =>
      import('./audio-recorder/audio-recorder.page')
      .then((m) => m.AudioRecorderPage)
  },
  {
    path: 'qr-scanner',
    loadComponent: () => import('./qr-scanner/qr-scanner.page').then( m => m.QrScannerPage)
  },

];