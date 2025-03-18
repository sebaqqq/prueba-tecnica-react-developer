# Proyecto: Biblioteca Digital

## Descripción

Este proyecto consiste en una aplicación web para gestionar una biblioteca digital. Los usuarios pueden buscar libros, filtrarlos por diferentes criterios (como editorial, país, tipo de medio, etc.) y ordenar los resultados. Además, pueden agregar libros a sus favoritos.

## Tecnologías

- **React**: Librería para construir la interfaz de usuario.
- **pnpm**: Gestor de paquetes para manejar dependencias de manera eficiente.
- **Tailwindcss**: Para la construcción de la interfaz de usuario con un enfoque utilitario y personalizado. Tailwind facilita la creación de interfaces atractivas, responsivas y de bajo costo en términos de código.
- **React Router**: Para la navegación entre páginas.
- **Jest**: Framework de pruebas utilizado para garantizar la calidad del código.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/sebaqqq/prueba-tecnica-react-developer.git
   cd prueba-tecnica-react-developer
   ```

2. **Instalar las dependencias utilizando pnpm:**

   Si no tienes **pnpm** instalado, puedes hacerlo ejecutando:

   ```bash
   npm install -g pnpm@latest-10
   ```

   Luego, instala las dependencias:

   ```bash
   pnpm install
   ```

## Ejecución de la aplicación

Para ejecutar la aplicación en modo desarrollo, usa el siguiente comando:

```bash
pnpm run dev
```

Esto iniciará el servidor en `http://localhost:3000`.

## Ejecución del Storybook

Para ejecutar la aplicación en modo desarrollo, usa el siguiente comando:

```bash
pnpm run storybook
```

## Ejecución de las pruebas

1. **Ejecutar todas las pruebas:**

   Para ejecutar todas las pruebas, usa el siguiente comando:

   ```bash
   pnpm test
   ```

   Este comando ejecutará Jest, buscando los archivos con las extensiones `.test.js`, `.test.ts`, `.test.tsx` en el directorio del proyecto.

2. **Ejecutar pruebas de un archivo específico:**

   Si deseas ejecutar solo las pruebas de un archivo específico, usa el siguiente comando:

   Ejemplo:

   ```bash
   pnpm test src/test/Home.test.tsx
   ```

## Decisiones Técnicas y Arquitectónicas

A continuación, se detallan algunas de las decisiones técnicas y arquitectónicas que tomé durante el desarrollo de la aplicación:

1. **React y TSX**: Elegí usar **React** para construir la interfaz de usuario debido a su flexibilidad y eficiencia. React es ideal para crear aplicaciones dinámicas y fáciles de mantener, lo que es fundamental en este proyecto.

2. **pnpm como gestor de dependencias**: Opté por **pnpm** debido a su alta eficiencia en la gestión de dependencias, especialmente en proyectos grandes. A diferencia de **npm** y **yarn**, **pnpm** utiliza un enfoque de almacenamiento único, lo que reduce el tamaño de la instalación de dependencias y mejora la velocidad de las instalaciones.

3. **React Router**: Se eligió **React Router** para la navegación entre las distintas vistas, como la página principal, la página de detalles de un libro y la página de favoritos. Es una librería robusta y ampliamente utilizada para manejar la navegación en aplicaciones **Single Page Application (SPA)**.

4. **Tailwindcss**: Para el diseño de la interfaz, opté por **Tailwindcss**, ya que proporciona un enfoque utilitario que facilita la creación de interfaces atractivas y personalizadas sin tener que escribir una gran cantidad de CSS adicional. Tailwind CSS permite una mayor flexibilidad en la personalización del diseño mientras mantiene el código limpio y organizado.

5. **Jest y pruebas unitarias**: **Jest** fue elegido para las pruebas debido a su facilidad de configuración y su integración con **React Testing Library**. Las pruebas unitarias aseguran que cada componente funcione como se espera, lo que es crucial para aplicaciones dinámicas y complejas.

## Mejoras Pendientes

Aunque la aplicación está funcional, algunas mejoras y características que no fueron implementadas son:

1. **Paginación de libros**: La aplicación podría beneficiarse de la paginación para manejar una mayor cantidad de libros de manera eficiente. Esto permitiría cargar los libros de forma más rápida y evitaría que la aplicación se vuelva lenta a medida que crece la lista de libros.

2. **Autenticación de usuarios**: Actualmente, no existe una funcionalidad de inicio de sesión para usuarios. Sería útil permitir que los usuarios se registren e inicien sesión para gestionar sus favoritos y personalizar la experiencia.

3. **Interfaz de administración**: No se implementó una interfaz para agregar o eliminar libros de manera administrativa. Esto permitiría a los administradores gestionar la base de datos de libros más fácilmente.

4. **Mejoras en el StoryBook**: Se puede implimentar mejoras con el diseño del story, ademas poder solucionar los errores presente que tiene el home.

## Qué Haría de Manera Diferente si Tuviera Más Tiempo

Si tuviera más tiempo para trabajar en este proyecto, implementaría las siguientes mejoras:

1. **Integración de API de backend**: La aplicación actualmente usa datos estáticos (o simulados) de libros. Implementaría una integración con una API backend para permitir la carga dinámica de libros y la gestión de usuarios. Podría ser un sistema de gestión de libros con autenticación.

2. **Optimización del rendimiento**: Implementaría técnicas como el **lazy loading** para cargar componentes y libros solo cuando sea necesario, mejorando el rendimiento general de la aplicación.

3. **Mejoras en el testing**: Aunque los tests básicos están implementados, haría una cobertura más amplia, cubriendo escenarios más complejos y condiciones de borde, como la búsqueda con términos no válidos o la aplicación de filtros con datos vacíos.

4. **Desarrollo de características adicionales**: Implementaría características como la capacidad de agregar comentarios a los libros o permitir a los usuarios puntuar los libros, lo que agregaría una capa adicional de interacción en la aplicación.
