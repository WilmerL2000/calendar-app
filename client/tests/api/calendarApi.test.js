import calendarApi from '../../src/api/calendarApi';

describe('Tests in calendarApi', () => {
  test('It should have the default settings ', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });
});
