import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'whatever',
      version: '1.0.0',
      description: 'Descripción de tu whatever',
    },
  },
  apis: ['./routes/*.ts'], // Rutas de tu API
};

const specs = swaggerJsdoc(options);

export default specs;
