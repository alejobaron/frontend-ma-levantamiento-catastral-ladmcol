Plataforma Digital para la Gestión Catastral en Colombia. : Implementación del modelo de aplicación de levantamiento catastral LADM COL. El backend de la plataforma se construye con Django REST Framework y extensiones geoespaciales mediante GeoDjango y PostGIS.

Este proyecto corresponde al **frontend** de la plataforma digital para la gestión catastral en Colombia, implementada bajo el **modelo de aplicación de levantamiento catastral LADM-COL**. El desarrollo se realizó utilizando **Angular v19**, permitiendo una interfaz amigable y funcional para la interacción de usuarios con los datos catastrales geográficos, administrativos y los demas componentes que hacen parte del modelo de aplicación.

---

## Arquitectura del Proyecto

El frontend está organizado a partir de un proyecto base Angular llamado `ladmcol`. Su estructura contempla componentes, servicios, modelos e interfaces conectados directamente con la API desarrollada en **Django REST Framework**.

ladmcol/
│
├── src/
│ ├── app/
│ │ ├── components/ # Componentes de cada entidad LADM-COL agrupados por paquete
│ │ ├── services/ # Servicios para consumir los endpoints del backend
│ │ ├── models/ # Interfaces y clases de los modelos de datos
│ │ ├── app-routing.module.ts # Módulo de rutas
│ │ ├── app.component.ts # Componente raíz
│ │ ├── app.module.ts # Módulo principal
│ ├── assets/ # Recursos estáticos
│ └── environments/ # Configuraciones de entorno (API URL, etc.)
│
├── angular.json # Configuración del proyecto Angular
├── package.json # Dependencias del proyecto
├── tsconfig.json # Configuración de TypeScript



---

## 📦 Estructura de un Componente

Cada componente Angular se encuentra dentro del paquete correspondiente al modelo LADM-COL (por ejemplo: `unidad_espacial`, `interesados`, etc.) y está compuesto por:

- `nombre.component.ts` – Lógica del componente
- `nombre.component.html` – Plantilla HTML
- `nombre.component.css` – Estilos CSS
- `nombre.component.spec.ts` – Pruebas unitarias

---

## 🔌 Conexión con Backend

El proyecto consume la API REST desarrollada en Django a través de servicios Angular (`HttpClient`). Los endpoints están organizados por entidad y accesibles desde los servicios creados dentro de la carpeta `services/`.

La URL base de la API se configura en los archivos de entorno:

```ts
export class environment = {
  apiUrl: 'http://localhost:8000/api/'
};


Instalación y Ejecución
- Clonar el repositorio
git clone https://github.com/usuario/repositorio-frontend.git
cd ladmcol

- Instalar dependencias
npm install

- Ejecutar el servidor de desarrollo
ng serve

El proyecto estará disponible en http://localhost:4200.


Requisitos Previos
Node.js (versión recomendada: 20+)

Angular CLI (npm install -g @angular/cli)

Conexión activa al backend de Django REST Framework

Proyecto desarrollado por Alejandro Barón candidato a Master en Ingeniería Geomática y Geoinformación