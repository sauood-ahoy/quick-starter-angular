import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SUBSCRIPTION_KEY } from '../constants';
declare var AhoyMapView: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: any;
  ui: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private async initializeMap() {
    let platform = await AhoyMapView.service().Platform(SUBSCRIPTION_KEY);
    const defaultLayers = platform.createDefaultLayers();

    this.map = AhoyMapView.Map(
      this.mapContainer.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 4,
        center: {
          lat: 34,
          lng: 41,
        },
      }
    );

    // default interactions for pan/zoom
    const mapEvents = AhoyMapView.mapevents().MapEvents(this.map);
    const behavior = AhoyMapView.mapevents().Behavior(mapEvents);

    // Create the default UI components
    this.ui = AhoyMapView.ui().UI.createDefault(this.map, defaultLayers);
  }
}
