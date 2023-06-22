const app = require('../../index');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", () => {
  describe('GET /recipes', () => {
    it('Debería responder con status 200 y retornar todas las recetas', async () => {
      const response = await agent.get('/recipes').expect(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Debería responder con status 200 y retornar la receta correspondiente al nombre dado', async () => {
      const response = await agent.get('/recipes?nombre=NombreReceta').expect(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Debería responder con status 404 si no se encuentra ninguna receta con el nombre dado', async () => {
      await agent.get('/recipes?nombre=RecetaInexistente').expect(404);
    });
  });

  describe('GET /recipes/:id', () => {
    it('Debería responder con status 200 y retornar la receta correspondiente al ID dado', async () => {
      const response = await agent.get('/recipes/1').expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(1);
    });

    it('Debería responder con status 400 si se proporciona un ID inválido', async () => {
      await agent.get('/recipes/abc').expect(400);
    });

    it('Debería responder con status 500 si no se proporciona un ID', async () => {
      await agent.get('/recipes/').expect(500);
    });
  });

  describe('POST /recipes', () => {
    const recipeData = {
      nombre: 'Nueva Receta',
      imagen: 'imagen.jpg',
      resumen: 'Descripción de la receta',
      healthscore: 5,
      pasos: ['Paso 1', 'Paso 2'],
      dietas: ['Dieta 1', 'Dieta 2']
    };

    it('Debería responder con status 200 y retornar la nueva receta creada', async () => {
      const response = await agent.post('/recipes').send(recipeData).expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.nombre).toBe(recipeData.nombre);
      expect(response.body.imagen).toBe(recipeData.imagen);

    });

    it('Debería responder con status 404 si faltan datos en la solicitud', async () => {
      const incompleteData = { nombre: 'Receta Incompleta' };
      await agent.post('/recipes').send(incompleteData).expect(404);
    });
  });
});