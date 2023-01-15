const handlerElephants = require('../src/handlerElephants');

const names = ['Ilana', 'Orval', 'Bea', 'Jefferson'];
const availability = ['Friday', 'Saturday', 'Sunday', 'Tuesday'];
const expected = 'Parâmetro inválido, é necessário uma string';

describe('Testes da função HandlerElephants', () => {
  it('testa se undefined retorna quantidade undefined', () => {
    expect(handlerElephants(undefined)).toEqual(undefined);
  });
  it('testa se o count retorna a quantidade de elefantes', () => {
    expect(handlerElephants('count')).toEqual(4);
  });
  it('testa se o names retorna os nomes', () => {
    expect(handlerElephants('names')).toEqual(names);
  });
  it('testa se o averageAge retorna a media de idade', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('testa se o location retorna a localizacao', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
  it('testa se popularity retorna a popularidade', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });
  it('testa se availability retorna availability', () => {
    expect(handlerElephants('availability')).toEqual(availability);
  });
  it('testa se retorna null quando string for invalida', () => {
    expect(handlerElephants('aloalopessoal')).toEqual(null);
  });
  it('testa se retorna null quando string for invalida', () => {
    expect(handlerElephants(123)).toEqual(expected);
  });
});
