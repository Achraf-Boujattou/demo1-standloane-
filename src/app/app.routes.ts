import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'calculs',
    loadComponent: () => import('./calculs/calculs.page').then( m => m.CalculsPage)
  },
   {
    path: 'jeu',
    loadComponent: () => import('./jeu/jeu.page').then(m => m.JeuPage)
  },
  {
    path: 'ui',
    loadComponent: () => import('./ui/ui.page').then( m => m.UiPage)
  },

  {
  path: 'weather',
  loadComponent: () => import('./weather/weather.page').then(m => m.WeatherPage)
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera.page').then( m => m.CameraPage)
  },
   {
    path: 'video',
    loadComponent: () => import('./video/video.page').then( m => m.VideoPage)
  },
  {
    path: 'toast',
    loadComponent: () => import('./toast/toast.page').then( m => m.ToastPage)
  },
 

];
