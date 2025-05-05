# Nombre del Proyecto: Aplicación MERN ECOMMERCE  

## Descripción  

Esta es una aplicación CRUD construida con el stack **MERN** (MongoDB, Express.js, React.js, Node.js) y **Cloudinary** para la gestión de imágenes. La aplicación permite realizar operaciones de Crear, Leer, Actualizar y Eliminar datos, asegurando la calidad de las imágenes y otros datos ingresados mediante validaciones.  

## Tecnologías Utilizadas  

- **MongoDB**: Base de datos NoSQL.  
- **Express.js**: Framework web para Node.js.  
- **React.js**: Biblioteca para construir interfaces de usuario.  
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.  
- **Cloudinary**: Servicio de gestión y optimización de imágenes.  

## Configuración  

Para ejecutar la aplicación en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/).  


## Backup de mongodb
en la carpeta Backend/backup se encuentran los productos y categorias

### Variables de Entorno para el backend  

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:  

```env  
PORT=4000  
MONGODB=mongodb+srv://USER:PASSWORD@cluster.okadd9c.mongodb.net/ecommerce  

APIKEY=api-key-cloudinary  
APISECRET=api-secret-cloudinary 
CLOUDNAME=cloud-name-cloudinary

ORIGIN=http://localhost:5173 

TOKEN=J72AFS2RFVVDWR3FEGWQ3RWFGW3QRETW4YHRGFSRGWT3RQEGSRHY4W5EJTNHRGEWRHET5YW4T3EWGR  
SESSION=MJW64YQ35T4WHATESJUHFQWF9HQW9PE8FHQPW9E8HF9WH9PQ8WEHF9P8QWEHFEW9Q8FHEFHEFJSDABFASKJL  

CRYPTOKEY=60c7f1d2d0f12d1373f4208c4fc5c6ad7762304c1e35fce85f8c53ddb4facf3b  

```

### Variables de Entorno para el frontend 
El backend utiliza HTTPS con SSL y llaves cifradas, asegurando la comunicación. Sin embargo, las variables de entorno del frontend también impactan en la seguridad y, si no están correctamente configuradas, podrían hacer que la página parezca insegura. Por ello, es recomendable ingresar la URL "VITE_ROUTE_SERVER" en tu navegador y presionar el botón 'Continúa de todos modos' para que el frontend pueda comunicarse con el backend correctamente

```.env
VITE_ROUTE_SERVER=https://localhost:4000/backend/api/rest/server/ecommerce/route/fetch/axios 
``` 
