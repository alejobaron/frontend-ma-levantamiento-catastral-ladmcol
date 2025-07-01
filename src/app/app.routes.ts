import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guard/auth.guard';
import { ColInteresadoComponent } from './components/interesados/col-interesado/col-interesado.component';
import { CrInteresadoComponent } from './components/interesados/cr-interesado/cr-interesado.component';
import { LcInteresadoContactoComponent } from './components/interesados/lc-interesado-contacto/lc-interesado-contacto.component';
import { ExtInteresadoComponent } from './components/estructuras/ext-interesado/ext-interesado.component';
import { GeometriaComponent } from './components/estructuras/geometria/geometria.component';
import { UserComponent } from './components/user/user.component';
import { ColUnidadEspacialComponent } from './components/unidadEspacial/col-unidad-espacial/col-unidad-espacial.component';
import { ExtDireccionComponent } from './components/estructuras/ext-direccion/ext-direccion.component';
import { ExtNovedadNumeroPredialComponent } from './components/estructuras/ext-novedad-numero-predial/ext-novedad-numero-predial.component';
import { ExtNovedadFMIComponent } from './components/estructuras/ext-novedad-fmi/ext-novedad-fmi.component';
import { ExtArchivoComponent } from './components/estructuras/ext-archivo/ext-archivo.component';
import { AreaValorComponent } from './components/estructuras/area-valor/area-valor.component';
import { VolumenValorComponent } from './components/estructuras/volumen-valor/volumen-valor.component';
import { UnidadAdministrativaBasicaComponent } from './components/administrativo/unidad-administrativa-basica/unidad-administrativa-basica.component';
import { PredioComponent } from './components/administrativo/predio/predio.component';
import { PredioCopropiedadComponent } from './components/administrativo/predio-copropiedad/predio-copropiedad.component';
import { DatosPHCondominioComponent } from './components/administrativo/datos-phcondominio/datos-phcondominio.component';
import { DatosAdicionalesLevantamientoCatastralComponent } from './components/administrativo/datos-adicionales-levantamiento-catastral/datos-adicionales-levantamiento-catastral.component';
import { ContactoVisitaComponent } from './components/administrativo/contacto-visita/contacto-visita.component';
import { DRRComponent } from './components/administrativo/drr/drr.component';
import { DerechoComponent } from './components/administrativo/derecho/derecho.component';
import { FuenteComponent } from './components/soporteDocumental/fuente/fuente.component';
import { ColFuenteAdministrativaComponent } from './components/soporteDocumental/col-fuente-administrativa/col-fuente-administrativa.component';
import { LcFuenteAdministrativaComponent } from './components/soporteDocumental/lc-fuente-administrativa/lc-fuente-administrativa.component';
import { ColFuenteEspacialComponent } from './components/soporteDocumental/col-fuente-espacial/col-fuente-espacial.component';
import { CrFuenteEspacialComponent } from './components/soporteDocumental/cr-fuente-espacial/cr-fuente-espacial.component';
import { ColAgrupacionInteresadosComponent } from './components/interesados/col-agrupacion-interesados/col-agrupacion-interesados.component';
import { CrAgrupacionInteresadosComponent } from './components/interesados/cr-agrupacion-interesados/cr-agrupacion-interesados.component';
import { ColMiembrosComponent } from './components/interesados/col-miembros/col-miembros.component';
import { TerrenoComponent } from './components/unidadEspacial/terreno/terreno.component';
import { ConstruccionComponent } from './components/unidadEspacial/construccion/construccion.component';
import { CaracteristicasUnidadConstruccionComponent } from './components/unidadEspacial/caracteristicas-unidad-construccion/caracteristicas-unidad-construccion.component';
import { UnidadConstruccionComponent } from './components/unidadEspacial/unidad-construccion/unidad-construccion.component';
import { GeoportalComponent } from './components/geoportal/geoportal/geoportal.component';
import { GeoComponent } from './components/unidadEspacial/geo/geo.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate:[authGuard],
        children:[ 
            {
                path: 'col-interesado',
                component: ColInteresadoComponent
            },
            {
                path: 'cr-interesado',
                component: CrInteresadoComponent
            },
            {
                path: 'lc-interesado-contacto',
                component:LcInteresadoContactoComponent
            },
            {
                path: 'ext-interesado',
                component: ExtInteresadoComponent
            },
            {
                path: 'col-unidad-espacial',
                component: ColUnidadEspacialComponent
            },
            {
                path: 'geometria',
                component: GeometriaComponent
            },
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'ext-direccion',
                component: ExtDireccionComponent
            },
            {
                path: 'ext-novedad-numero-predial',
                component: ExtNovedadNumeroPredialComponent
            },
            {
                path: 'ext-novedad-fmi',
                component: ExtNovedadFMIComponent
            },
            {
                path: 'ext-archivo',
                component: ExtArchivoComponent
            },
            {
                path: 'area-valor',
                component: AreaValorComponent
            },
            {
                path: 'volumen-valor',
                component: VolumenValorComponent
            },
            {
                path: 'unidad-administrativa-basica',
                component: UnidadAdministrativaBasicaComponent
            },
            {
                path: 'predio',
                component: PredioComponent
            },
            {
                path: 'predio-copropiedad',
                component: PredioCopropiedadComponent
            },
            {
                path: 'datos-phcondominio',
                component: DatosPHCondominioComponent
            },
            {
                path: 'datos-adicionales-levantamiento-catastral',
                component: DatosAdicionalesLevantamientoCatastralComponent
            },
            {
                path: 'contacto-visita',
                component: ContactoVisitaComponent
            },
            {
                path: 'drr',
                component: DRRComponent
            },
            {
                path: 'derecho',
                component: DerechoComponent
            },
            {
                path: 'fuente',
                component: FuenteComponent
            },
            {
                path: 'col-fuente-administrativa',
                component: ColFuenteAdministrativaComponent
            },
            {
                path: 'lc-fuente-administrativa',
                component: LcFuenteAdministrativaComponent
            },
            {
                path: 'col-fuente-espacial',
                component: ColFuenteEspacialComponent
            },
            {
                path: 'cr-fuente-espacial',
                component: CrFuenteEspacialComponent
            },
            {
                path: 'col-agrupacion-interesados',
                component: ColAgrupacionInteresadosComponent
            },
            {
                path: 'cr-agrupacion-interesados',
                component: CrAgrupacionInteresadosComponent
            },
            {
                path: 'col-miembros',
                component: ColMiembrosComponent
            },
            {
                path: 'terreno',
                component: TerrenoComponent
            },
            {
                path: 'construccion',
                component: ConstruccionComponent
            },
            {
                path: 'caracteristicas-unidad-construccion',
                component: CaracteristicasUnidadConstruccionComponent
            },
            {
                path: 'unidad-construccion',
                component: UnidadConstruccionComponent
            },
            {
                path: 'geoportal',
                component: GeoportalComponent
            },
            {
                path: 'geo',
                component: GeoComponent
            }
        ]
    }
];
