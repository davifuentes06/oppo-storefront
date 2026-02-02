# OPPO Storefront

Tienda oficial de productos OPPO. Este proyecto es una aplicación web moderna construida con tecnologías de vanguardia para ofrecer la mejor experiencia de usuario.

## Tecnologías Utilizadas

- **Vite**: Herramienta de construcción ultrarrápida.
- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **Tailwind CSS**: Framework de CSS para diseño rápido.
- **shadcn-ui**: Componentes de interfaz de usuario de alta calidad.

## Configuración Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio**:

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Instalar dependencias**:

   ```sh
   npm install
   ```

3. **Configurar variables de entorno**:

   Copia el archivo `.env.example` a `.env` y ajusta las variables según tu entorno:

   ```sh
   cp .env.example .env
   ```

   Para desarrollo local, el archivo `.env` debe contener:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Ejecutar el servidor de desarrollo**:

   ```sh
   npm run dev
   ```

5. **Abrir en el navegador**:
   Visita `http://localhost:8080` (o el puerto indicado en la terminal).

## Variables de Entorno

La aplicación utiliza las siguientes variables de entorno:

- `VITE_API_BASE_URL`: URL base de la API del backend
  - **Desarrollo**: `http://localhost:3000`
  - **Producción**: `https://programacion-iii-seccion-3.onrender.com`

## Backend

La aplicación se conecta a un backend que puede ejecutarse en:
- **Desarrollo**: `http://localhost:3000`
- **Producción**: `https://programacion-iii-seccion-3.onrender.com`
