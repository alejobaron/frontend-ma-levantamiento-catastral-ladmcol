import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';
import { defaults, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import { createStringXY, format } from 'ol/coordinate';
import LayerGroup from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Draw } from 'ol/interaction';
import WKT from 'ol/format/WKT.js';
import { Geometry } from 'ol/geom';
import { Modify } from 'ol/interaction';
import Feature from 'ol/Feature';

import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { GeoJSON } from 'ol/format';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';



proj4.defs('EPSG:9377', '+proj=tmerc +lat_0=4.596200416666666 +lon_0=-73.0 +k=0.9992 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs');
register(proj4);

@Component({
  selector: 'app-geometria',
  imports: [],
  templateUrl: './geometria.component.html',
  styleUrl: './geometria.component.css',
  encapsulation: ViewEncapsulation.None
})

export class GeometriaComponent implements OnInit {

  map!: Map;
  modifyInteraction: Modify | undefined;
  
  editandoFeature: Feature<Geometry> | null = null;

  @Input()
  geometriaExistente: string | null = null;

  @Input() modo: 'visualizar' | 'editar' = 'editar';
  
  @Output()
  enviar: EventEmitter<string> = new EventEmitter<string>();

  constructor(private unidadEspacialService: UnidadEspacialService) {}

  enviarCoordenadas(wkt: string) {
    this.enviar.emit(wkt);
  }

  ngOnInit():void {
    let self = this;
    let lg_capa_base = new LayerGroup({
      properties:{title:'Capas Base', openInLayerSwitcher:true},
      layers:[
        new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}',
          }),
          properties:{title:'Google Traffic', baseLayer:true},
          visible:false
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          }),
          properties:{title:'ESRI Topo', baseLayer:true},
          visible:false
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          }),
          properties:{title:'ESRI Streets', baseLayer:true},
          visible:false
        }),
        new TileLayer({
          source: new XYZ({
            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
          }),
          properties:{title:'Google Satellite', baseLayer:true},
          visible:false
        }),
        
        new TileLayer({
          source: new OSM(),
          properties:{title:'OSM', baseLayer:true},
          visible:true
        })
      ]
    })

    this.map = new Map({
      controls: defaults({zoom:true, zoomOptions:{zoomInTipLabel:'Zoom In', zoomOutTipLabel:'Zoom out'}}),
      target:'map',
      layers: [
        lg_capa_base
      ],
      view: new View({
        center: [880318.0673, 1005247.3794],
        zoom: 15,
        projection: 'EPSG:9377',
      })
    });

    this.map.addControl(new FullScreen({className:'proy-ol-full-screen',tipLabel:'Pantalla Completa'}));
    this.map.addControl(new ScaleLine())
    this.map.addControl(new LayerSwitcher())

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

        const creacionEdicionStyle = new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.8'
          }),
          stroke: new Stroke({
            color: 'rgba(255, 140, 0, 1)',
            width: 2,
            lineDash:[8, 5, 1, 5]
          })
        });

    //Capa Terrenos
    const terrenosSource = new VectorSource();

    const terrenosLayer = new VectorLayer({
      source: terrenosSource,
      style: terrenoStyle,
      properties: { title: 'Terrenos', displayInLayerSwitcher: true }
    });

    this.map.addLayer(terrenosLayer);

    //Cargar datos de terreno desde el servicio
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

    //Capa Constucciones
    const construccionSource = new VectorSource();
  
    const construccionLayer = new VectorLayer({
      source: construccionSource,
      style: construccionStyle,
      properties: { title: 'Construcciones', displayInLayerSwitcher: true }
    });
  
    this.map.addLayer(construccionLayer);
  
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


      //Capa Unidades de Construcción
      const unidadConstruccionSource = new VectorSource();
    
      const unidadconstruccionLayer = new VectorLayer({
        source: unidadConstruccionSource,
        style: unidadConstruccionStyle,
        properties: { title: 'Unidades de Construcción', displayInLayerSwitcher: true }
      });
    
      this.map.addLayer(unidadconstruccionLayer);
    
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
    
    let vectorLayer = new VectorLayer({
      source: new VectorSource(),
      properties: { displayInLayerSwitcher: false },
      style: creacionEdicionStyle
    });
    this.map.addLayer(vectorLayer);

    let mainBar = new Bar({});
    this.map.addControl(mainBar);

    let dibujoBar = new Bar({
      group:true,
      toggleOne: true
    });

    mainBar.addControl(dibujoBar);

    var drawGeometria = new Draw({
      type: 'MultiPolygon',
      source: vectorLayer.getSource() as VectorSource
    });
    let tgTerreno = new Toggle({
      title: 'Terreno',
      html: '<i class="fa-solid fa-wrench" style="white: red"></i>',
      interaction: drawGeometria
    });    
    
    drawGeometria.on('drawend', function(e){
      self.editandoFeature = e.feature; 
    });
    dibujoBar.addControl(tgTerreno);
    

    // Cargar geometría existente
    if (this.geometriaExistente) {
      try {
        const wktFormat = new WKT();
        let geometria = this.geometriaExistente;

        if (geometria.startsWith('SRID=9377;')) {
          geometria = geometria.replace('SRID=9377;', '');
        }

        const feature = wktFormat.readFeature(geometria, {
          dataProjection: 'EPSG:9377',
          featureProjection: 'EPSG:9377'
        });

        this.editandoFeature = feature;

        vectorLayer.getSource()?.clear();
        vectorLayer.getSource()?.addFeature(feature);

        const extent = feature.getGeometry()?.getExtent();
        if (extent) {
          this.map.getView().fit(extent, { padding: [50, 50, 50, 50] });
        }
      } catch (err) {
        console.error('Error al cargar la geometría existente:', err);
      }
    }

    this.modifyInteraction = new Modify({
      source: vectorLayer.getSource() as VectorSource,
    });
    this.map.addInteraction(this.modifyInteraction);

    this.modifyInteraction.on('modifyend', (event) => {
      event.features.forEach((feature) => {
        self.editandoFeature = feature;
      });
    });

    if (this.modo === 'visualizar') {
      if (this.modifyInteraction) {
        this.map.removeInteraction(this.modifyInteraction);
      }
    
      dibujoBar.getControls().forEach(control => {
        if (control instanceof Toggle) {
          control.setActive(false);
        }
      });
    }
  }
}
