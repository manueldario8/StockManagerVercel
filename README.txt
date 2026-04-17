Aplicación web SPA desarrollada con React y TypeScript orientada a la gestión de productos y órdenes.
Consume una API REST desarrollada en ASP.NET Core y desplegada en AWS, permitiendo la interacción completa con el backend mediante operaciones CRUD y autenticación de usuarios.

La aplicación permite:

Gestión de productos (alta, baja, modificación y consulta)
Creación y seguimiento de órdenes
Consumo de endpoints protegidos mediante autenticación

Tecnologías utilizadas:

React
TypeScript
HTML / CSS
React Router (navegación entre vistas)
Consumo de API REST mediante fetch / cliente HTTP

Características técnicas:

Arquitectura SPA (Single Page Application)
Manejo de estado en cliente mediante hooks
Uso de componentes reutilizables y desacoplados
Organización por capas en frontend (components, pages, services)
Manejo de autenticación (tokens y persistencia en cliente)
Abstracción de llamadas HTTP para desacoplar lógica de negocio

Integración:

Backend desplegado en AWS (EC2)
Base de datos en Amazon RDS (SQL Server)
Comunicación vía endpoints REST

Testing y validación:

Pruebas manuales de flujos completos (login, CRUD, órdenes)
Validación de integración frontend-backend

Estado del proyecto: en desarrollo. Próximamente se agregarán mejoras en manejo global de estado, control de errores, optimización de rendimiento y mejoras en la experiencia de usuario.

Proyecto enfocado en la práctica de desarrollo frontend moderno, consumo de APIs, manejo de autenticación y construcción de interfaces para sistemas de gestión conectados a infraestructura en la nube.