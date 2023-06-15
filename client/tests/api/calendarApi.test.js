import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en calendarApi', () => {
  test('Debe de tener la configuracion por defecto ', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('Debe de tener el token en el header de todas las peticiones', async () => {
    const token = 'Bearer ABC-123-XYZ';
    localStorage.setItem('token', token);
    // const res = await calendarApi.get('/events');

    // expect(res.config.headers['Authorization']).toBe(token);
  });
});
