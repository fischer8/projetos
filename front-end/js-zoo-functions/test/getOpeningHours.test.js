const getOpeningHours = require('../src/getOpeningHours');

const expected = {
  Tuesday: { open: 8, close: 6 },
  Wednesday: { open: 8, close: 6 },
  Thursday: { open: 10, close: 8 },
  Friday: { open: 10, close: 8 },
  Saturday: { open: 8, close: 10 },
  Sunday: { open: 8, close: 8 },
  Monday: { open: 0, close: 0 },
};

describe('Testes da função getOpeningHours', () => {
  it('testa se o zologico esta aberto', () => {
    expect(getOpeningHours('Thursday', '10:00-AM')).toEqual('The zoo is open');
  });
  it('testa se o zologico esta fechado', () => {
    expect(getOpeningHours('Thursday', '10:00-PM')).toEqual('The zoo is closed');
  });
  it('testa se a função retorna as horas quando não é passado parametro', () => {
    expect(getOpeningHours()).toEqual(expected);
  });
  it('testa se passar Monday e 09:00-AM retorna the zoo is closed', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toEqual('The zoo is closed');
  });
  it('testa se passar Monday e uma não hora retorna The hour should represent a number', () => {
    expect(() => getOpeningHours('Monday', 'aa:00-AM')).toThrow('The hour should represent a number');
  });
  it('testa se passar Monday e um horario não definido entre am pm retorna The abbreviation must be AM or PM', () => {
    expect(() => getOpeningHours('Monday', '09:00')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
    expect(() => getOpeningHours('Monday', '09:00-jk')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  it('testa se passar Monday e um horario acima de 12h ou menor que 0h retorna The hour must be between 0 and 12', () => {
    expect(() => getOpeningHours('Monday', '13:00-AM')).toThrow('The hour must be between 0 and 12');
    expect(() => getOpeningHours('Monday', '27:00-AM')).toThrow('The hour must be between 0 and 12');
  });
  it('testa se passar Monday e um minuto maior que 59 ou menor que 0 retorna The minutes must be between 0 and 59', () => {
    expect(() => getOpeningHours('Monday', '09:60-AM')).toThrow('The minutes must be between 0 and 59');
    expect(() => getOpeningHours('Monday', '09:89-AM')).toThrow('The minutes must be between 0 and 59');
  });
  it('testa se passar um dia invalido retorna The day must be valid. Example: Monday', () => {
    expect(() => getOpeningHours('BigMac', '09:60-AM')).toThrow('The day must be valid. Example: Monday');
    expect(() => getOpeningHours('chess.com', '09:89-AM')).toThrow('The day must be valid. Example: Monday');
  });
});
