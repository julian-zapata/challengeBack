# Challenge Back End

Microservicio de gestión de cupones y tiendas desarrollado en TypeScript y TypeORM

El programa se ejecuta con el comando "npm start" por defecto de typeORM

Los parámetros requeridos son solicitados mediante "body" salvo que la consigna especifique que sean requeridos mediante query string u otro método.

## conflictos y consultas
***
Tuve un problema que me demoró el desarrollo del proyecto y es la conexción con la base de datos.

Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client at Handshake.Sequence._packetToError.

Se encuentra la solucion en:
https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server

***
Apoyo para la arquitectura del proyecto
https://www.youtube.com/watch?v=pCxL1sdjeCc&t

***
Forma de extraer fecha de un tipo DATETIME en sql
https://es.stackoverflow.com/questions/41391/obtener-fechas-solo-de-dia-mes-a%C3%B1o-sin-horas

***

Todas las consultas SQL fueron extraídas de la página oficial de TypeORM



