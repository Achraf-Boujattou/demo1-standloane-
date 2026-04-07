import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSearchbar
} from '@ionic/angular/standalone';

// Déclaration de Leaflet (chargé via index.html)
declare var L: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSearchbar,
    CommonModule
  ]
})
export class PlansPage implements OnInit {

  map: any;
  marker: any;

  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;

  ngOnInit() {}

  ionViewDidEnter() {
    this.initLeafletMap();
  }

  initLeafletMap() {
    // Coordonnées par défaut (Casablanca)
    const center = [33.5731, -7.5898];

    // Initialisation de la carte Leaflet
    this.map = L.map('map', {
      center: center,
      zoom: 13,
      zoomControl: false // On le décale ou on le cache pour le design
    });

    // Ajout de la couche de tuiles (OpenStreetMap) - GRATUIT ET SANS CLÉ
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajout du marqueur
    this.marker = L.marker(center).addTo(this.map);

    // Repositionner le contrôle du zoom en bas à droite pour le design
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  // Effectuer une recherche manuelle via Nominatim (Gratuit)
  async handleSearch(event: any) {
    const query = this.searchbar.value;
    if (!query || query.trim() === '') return;

    console.log("Recherche Leaflet pour :", query);
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        this.navigateToLocation(lat, lng);
      } else {
        alert("Ville introuvable. Veuillez vérifier l'orthographe.");
      }
    } catch (error) {
      console.error("Erreur de recherche :", error);
      alert("Erreur de connexion au service de recherche.");
    }
  }

  navigateToLocation(lat: number, lng: number) {
    if (this.map && this.marker) {
      const pos = [lat, lng];
      
      // Animation fluide vers la position
      this.map.flyTo(pos, 14, {
        animate: true,
        duration: 1.5
      });

      // Déplacer le marqueur
      this.marker.setLatLng(pos);
    }
  }
}