import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Feature, Map, View } from 'ol';
import Bar from 'ol-ext/control/Bar';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Toggle from 'ol-ext/control/Toggle';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { GeoJSON } from 'ol/format';
import { Geometry } from 'ol/geom';
import { Draw, Modify } from 'ol/interaction';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM, XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { CommonModule } from '@angular/common';

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


  constructor(private unidadEspacialService: UnidadEspacialService) {}

  ngOnInit(): void {
      
    this.initMap();
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
          visible:true
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
          visible:false
        }),
      ]
    })
    this.mapa = new Map({
      controls: defaults({zoom:true, zoomOptions:{zoomInTipLabel:'Acercar', zoomOutTipLabel:'Alejar'}}),
      target:'mapa',
      layers: [lg_capa_base],
      view: new View({
        center: [-74.1, 4.6],
        zoom: 12,
        projection: 'EPSG:4326'
      })
    });
    this.mapa.addControl(new FullScreen({className:'proy-ol-full-screen',tipLabel:'Pantalla Completa'}));
    this.mapa.addControl(new MousePosition({className:'mouse-position', coordinateFormat:createStringXY(4)}));
    this.mapa.addControl(new ScaleLine())
    this.mapa.addControl(new LayerSwitcher())

    const unidadesSource = new VectorSource();

    const unidadesLayer = new VectorLayer({
      source: unidadesSource,
      style: new Style({
        stroke: new Stroke({ color: '#0080ff', width: 2 }),
        fill: new Fill({ color: 'rgba(0,128,255,0.2)' })
      }),
      properties: { title: 'Unidades Espaciales', displayInLayerSwitcher: true }
    });

    this.mapa.addLayer(unidadesLayer);

    this.unidadEspacialService.loadUnidadEspacial().subscribe({
      next: (data: any) => {
        const features = new GeoJSON().readFeatures(data, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:4326'
        });
        unidadesSource.addFeatures(features);
      },
      error: (err) => {
        console.error('Error al cargar unidades espaciales:', err);
      }
    });
    

    let vectorLayer = new VectorLayer({
      source: new VectorSource(),
      properties: { displayInLayerSwitcher: true }
    });
    this.mapa.addLayer(vectorLayer);

    let mainBar = new Bar({});
    this.mapa.addControl(mainBar);

    let dibujoBar = new Bar({
      group:true,
      toggleOne: true
    });

    mainBar.addControl(dibujoBar);

    var drawTerreno = new Draw({
      type: 'MultiPolygon',
      source: vectorLayer.getSource() as VectorSource
    });
    let tgTerreno = new Toggle({
      title: 'Terreno',
      html:'<i class="fa-solid fa-layer-group"></i>',
      interaction: drawTerreno
    });

    dibujoBar.addControl(tgTerreno);

    var drawConstruccion = new Draw({
      type: 'MultiPolygon',
      source: vectorLayer.getSource() as VectorSource
    });

    let tgConstruccion = new Toggle({
      title: 'Construcción',
      html:'<i class="fa-solid fa-building"></i>',
      interaction: drawConstruccion
    });
    dibujoBar.addControl(tgConstruccion);

    var drawUnidadConstruccion = new Draw({
      type: 'MultiPolygon',
      source: vectorLayer.getSource() as VectorSource
    });

    let tgUnidadConstruccion = new Toggle({
      title: 'Unidad de construcción',
      html:'<i class="fa-solid fa-house"></i>',
      interaction: drawUnidadConstruccion
    });
    dibujoBar.addControl(tgUnidadConstruccion);
  }

  closePopup(event: MouseEvent) {}

}
