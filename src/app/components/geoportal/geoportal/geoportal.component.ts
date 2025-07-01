import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol';
import Bar from 'ol-ext/control/Bar';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Toggle from 'ol-ext/control/Toggle';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { GeoJSON } from 'ol/format';
import { Geometry, MultiPolygon, Polygon } from 'ol/geom';
import { Draw, Modify, Select } from 'ol/interaction';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM, TileWMS, XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { click } from 'ol/events/condition';
import { CommonModule } from '@angular/common';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj'

proj4.defs('EPSG:9377', '+proj=tmerc +lat_0=4.596200416666666 +lon_0=-73.0 +k=0.9992 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs');


@Component({
  selector: 'app-geoportal',
  imports: [CommonModule],
  templateUrl: './geoportal.component.html',
  styleUrl: './geoportal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class GeoportalComponent implements OnInit{

  mapa!: Map;
  modifyInteraction: Modify | undefined;
  editandoFeature: Feature<Geometry> | null = null;
  selectedFeatureInfo: any = null;
  objectKeys = Object.keys; 
  popupOverlay!: Overlay;


  constructor(private unidadEspacialService: UnidadEspacialService) {}

  ngOnInit(): void {
      
    this.initMap();
    this.initPopup();
  }

  initPopup(): void {
    const container = document.getElementById('popup')!;
    this.popupOverlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250
        }
      }
    });
    this.mapa.addOverlay(this.popupOverlay);
  }
 

  initMap():void{
    let lg_capa_base = new LayerGroup({
      properties:{title:'Capas Base', openInLayerSwitcher:true},
      layers:[
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            attributions: 'ESRI Topo'
          }),
          properties:{title:'ESRI Topo', baseLayer:true},
          visible:false
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            attributions: 'ESRI Streets'
          }),
          properties:{title:'ESRI Streets', baseLayer:true},
          visible:false
        }),
        new TileLayer({
          source: new XYZ({
            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            attributions:'Google Satellite'
          }),
          properties:{title:'Google Satellite', baseLayer:true},
          visible:false
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
            attributions:'Google Maps',
          }),
          properties:{title:'Google Maps', baseLayer:true},
          visible:false,
          
        }),
        new TileLayer({
          source: new OSM({
            attributions: 'OpenStreetMap'
          }),
          properties:{title:'OSM', baseLayer:true},
          visible:true
        }),
      ]
    })
    this.mapa = new Map({
      controls: defaults({zoom:true, zoomOptions:{zoomInTipLabel:'Acercar', zoomOutTipLabel:'Alejar'}}),
      target:'mapa',
      layers: [lg_capa_base],
      view: new View({
        center: [880318.0673, 1005247.3794],
        zoom: 12,
        projection: 'EPSG:9377'
      })
    });
    this.mapa.addControl(new FullScreen({className:'proy-ol-full-screen',tipLabel:'Pantalla Completa'}));
    this.mapa.addControl(new MousePosition({className:'mouse-position', coordinateFormat:createStringXY(4)}));
    this.mapa.addControl(new ScaleLine())
    this.mapa.addControl(new LayerSwitcher())


    function createPattern(type: 'diagonal' | 'dots' | 'cross', color: string): CanvasPattern {
      const canvas = document.createElement('canvas');
      canvas.width = 8;
      canvas.height = 8;
      const context = canvas.getContext('2d')!;
      context.strokeStyle = color;
      context.lineWidth = 1;
    
      switch (type) {
        case 'diagonal':
          context.beginPath();
          context.moveTo(0, 8);
          context.lineTo(8, 0);
          context.stroke();
          break;
    
        case 'dots':
          context.fillStyle = color;
          context.beginPath();
          context.arc(4, 4, 1.5, 0, 2 * Math.PI);
          context.fill();
          break;
    
        case 'cross':
          context.beginPath();
          context.moveTo(0, 4);
          context.lineTo(8, 4);
          context.moveTo(4, 0);
          context.lineTo(4, 8);
          context.stroke();
          break;
      }
    
      return context.createPattern(canvas, 'repeat')!;
    }
    
    const terrenoStyle = new Style({
      fill: new Fill({
        color: 'rgba(20, 90, 50, 0.001)'
      }),
      stroke: new Stroke({
        color: '#145A32', 
        width: 2,
        lineDash:[8, 5, 1, 5]
      })
    });
    
    const construccionStyle = new Style({
      fill: new Fill({
        color: createPattern('cross', '#B22222')  
      }),
      stroke: new Stroke({
        color: '#8B0000', 
        width: 2,
        lineDash:[8, 5, 1, 5]
      })
    });
    
    const unidadConstruccionStyle = new Style({
      fill: new Fill({
        color: 'rgba(93, 173, 226, 0.8'  
      }),
      stroke: new Stroke({
        color: '#1E90FF', 
        width: 2,
        lineDash:[8, 5, 1, 5]
      })
    });
    
    const terrenosSource = new VectorSource();

    const terrenosLayer = new VectorLayer({
      source: terrenosSource,
      style: terrenoStyle,
      properties: { title: 'Terrenos', displayInLayerSwitcher: true }
    });

    this.mapa.addLayer(terrenosLayer);

    this.unidadEspacialService.loadTerrenoGeom().subscribe({
      next: (data: any) => {
        const features = new GeoJSON().readFeatures(data, {
          dataProjection: 'EPSG:9377',
          featureProjection: 'EPSG:9377'
        });
        terrenosSource.addFeatures(features);
      },
      error: (err) => {
        console.error('Error al cargar terrenos:', err);
      }
    });

  const construccionSource = new VectorSource();

  const construccionLayer = new VectorLayer({
    source: construccionSource,
    style: construccionStyle,
    properties: { title: 'Construcciones', displayInLayerSwitcher: true }
  });

  this.mapa.addLayer(construccionLayer);

  this.unidadEspacialService.loadConstruccionGeom().subscribe({
    next: (data: any) => {
      const features = new GeoJSON().readFeatures(data, {
        dataProjection: 'EPSG:9377',
        featureProjection: 'EPSG:9377'
      });
      construccionSource.addFeatures(features);
    },
      error: (err) => {
        console.error('Error al cargar construcciones:', err);
      }
    });
  
  const unidadConstruccionSource = new VectorSource();

  const unidadconstruccionLayer = new VectorLayer({
    source: unidadConstruccionSource,
    style: unidadConstruccionStyle,
    properties: { title: 'Unidades de Construcción', displayInLayerSwitcher: true }
  });

  this.mapa.addLayer(unidadconstruccionLayer);

  this.unidadEspacialService.loadUnidadConstruccionGeom().subscribe({
    next: (data: any) => {
      const features = new GeoJSON().readFeatures(data, {
        dataProjection: 'EPSG:9377',
        featureProjection: 'EPSG:9377'
      });
      unidadConstruccionSource.addFeatures(features);
    },
      error: (err) => {
        console.error('Error al cargar construcciones:', err);
      }
    });

    const highlightStyle = new Style({
      stroke: new Stroke({
        color: '#FFD700', 
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(255, 215, 0, 0.3)'
      })
    });
    
    const selectClick = new Select({
      condition: click,
      style: highlightStyle
    });
    this.mapa.addInteraction(selectClick);

    selectClick.on('select', (e) => {
      const feature = e.selected[0];
    
      e.deselected.forEach(f => f.setStyle(undefined));
    
      if (feature) {
        const props = { ...feature.getProperties() };
        delete props['geometry'];
        this.selectedFeatureInfo = props;
    
        const geometry = feature.getGeometry();
    
        let coord: number[] | undefined;
    
        if (geometry instanceof Polygon) {
          coord = geometry.getInteriorPoint().getCoordinates();
        } else if (geometry instanceof MultiPolygon) {
          const polygons = geometry.getPolygons();
          if (polygons.length > 0) {
            coord = polygons[0].getInteriorPoint().getCoordinates();
          }
        }
    
        if (coord) {
          this.popupOverlay.setPosition(coord);
        }
  
      } else {
        this.popupOverlay.setPosition(undefined);
        this.selectedFeatureInfo = null;
      }
    });
  }
  closePopup(event: MouseEvent) {
    event.preventDefault();
    this.popupOverlay.setPosition(undefined);
    this.selectedFeatureInfo = null;
  }
}
