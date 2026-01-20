# Frontend Test ITX

_[Read this in English](README.en.md)_

🚀 **Demo:** [https://itx-frontend-test.vercel.app/](https://itx-frontend-test.vercel.app/)

Aplicación web para la compra de dispositivos móviles, desarrollada con React y TypeScript. El proyecto implementa una arquitectura SPA moderna con gestión de estado, sistema de caché y validación de datos.

## Requisitos del sistema

- Node.js versión 18 o superior
- pnpm (recomendado) o npm como gestor de paquetes

## Instalación y configuración

Para comenzar a trabajar con el proyecto, instala las dependencias utilizando pnpm:

```bash
pnpm install
```

Se necesita personalizar la URL de la API, copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env
```

## Scripts disponibles

El proyecto incluye los siguientes comandos:

**Desarrollo**

```bash
pnpm dev
```

Inicia el servidor de desarrollo con recarga automática en http://localhost:5173

**Compilación**

```bash
pnpm build
```

Compila el proyecto para producción en la carpeta dist/

**Linting**

```bash
pnpm lint
```

Ejecuta ESLint para verificar la calidad del código

**Preview**

```bash
pnpm preview
```

Previsualiza la versión compilada localmente

**Tests**

```bash
pnpm test
```

Ejecuta los tests del proyecto

## Estructura del proyecto

La aplicación está organizada siguiendo una arquitectura modular:

```
src/
├── components/       Componentes reutilizables de la interfaz
├── pages/           Vistas principales (lista y detalle de producto)
├── context/         Estado global (carrito)
├── services/        Integración con la API
├── utils/           Utilidades y sistema de caché
└── schemas/         Validación de datos con Zod
```

### Componentes principales

Los componentes están diseñados para ser reutilizables y mantener una separación clara de responsabilidades:

- Header: Navegación con breadcrumbs y carrito de compra
- SearchBar: Búsqueda en tiempo real de productos
- ProductGrid y ProductItem: Visualización de la lista de productos
- ProductImage, ProductDescription y ProductActions: Detalle del producto
- CartDrawer: Panel lateral del carrito

## Stack tecnológico

El proyecto utiliza tecnologías modernas que garantizan rendimiento y mantenibilidad:

- React 19 con TypeScript para el desarrollo de la interfaz
- Vite como herramienta de compilación y desarrollo
- React Router v7 para la navegación entre páginas
- Tailwind CSS v4 para los estilos
- Zod para la validación de datos en tiempo de ejecución
- Axios para las peticiones HTTP
- ESLint para mantener la calidad del código

## Funcionalidades implementadas

- **Navegación SPA** con React Router sin recargas de página
- **Búsqueda en tiempo real** por marca y modelo
- **Sistema de caché** personalizado con localStorage (expiración 1h, limpieza automática)
- **Carrito de compra** con Context API y persistencia local
- **Validación de datos** con Zod para seguridad de tipos en runtime
- **Diseño responsive** adaptado a móvil y escritorio

> **Nota:** Para producción se recomienda TanStack Query en lugar del sistema de caché personalizado. El actual es una implementación educativa que demuestra los conceptos fundamentales, hecho especificamente para esta prueba.

## Integración con la API

La aplicación consume una API REST con los siguientes endpoints:

- GET /api/product - Obtiene la lista completa de productos
- GET /api/product/:id - Obtiene los detalles de un producto específico
- POST /api/cart - Añade un producto al carrito

La URL base debera estar configurada a https://itx-frontend-test.onrender.com

Todos los endpoints están centralizados en el archivo de servicios, evitando el uso de strings mágicos y facilitando el mantenimiento.

## Flujo de usuario

1. El usuario accede a la página principal y visualiza el catálogo de productos
2. Puede utilizar el buscador para filtrar por marca o modelo
3. Al hacer clic en un producto, accede a la página de detalle
4. Selecciona las opciones de color y almacenamiento disponibles
5. Añade el producto al carrito
6. El contador del carrito se actualiza automáticamente y se muestra el carrito

## Consideraciones técnicas

**Variables de entorno**

Las URLs y configuraciones sensibles se gestionan mediante variables de entorno. El archivo .env.example sirve como plantilla y documentación de las variables necesarias.

**Organización de tipos**

Los tipos de TypeScript son inferidos automáticamente desde los schemas de Zod, garantizando sincronización entre validación y tipado. Los schemas están centralizados en la carpeta schemas/, separados por dominio (producto, carrito, API).

## Mejoras futuras sugeridas

El proyecto cumple con todos los requisitos del test técnico y su alcance es apropiado para una prueba de este tipo. Para un proyecto en producción, se podrían considerar:

- Implementar Error Boundary para capturar errores de React con un fallback UI
- Añadir tests de componentes con React Testing Library
- Mejorar la accesibilidad con ARIA labels y soporte completo de navegación por teclado
- Optimizar el rendimiento con code splitting y lazy loading de componentes
- Implementar variables de Tailwind CSS para theming consistente (colores, espaciado, tipografía)
