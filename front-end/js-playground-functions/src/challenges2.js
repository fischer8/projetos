// Desafio 11
function contador(ns) {
  let qtds = {};
  for (let n of ns) {
    if (qtds[n]) {
      qtds[n] += 1;
    } else {
      qtds[n] = 1;
    }
  }
  return qtds;
}

function generatePhoneNumber(ns) {
  if (ns.length === 11) {
    for (let n of ns) {
      if (n >= 0 && n <= 9) {
        let qtds = contador(ns);
        let qtd = Object.values(qtds);
        for (let i = 0; i < qtd.length; i++) {
          if (qtd[i] > 2) {
            return 'não é possível gerar um número de telefone com esses valores';
          }
        }
      } else {
        return 'não é possível gerar um número de telefone com esses valores';
      }
    }
    ns = ns.join('');
    return `(${ns.slice(0, 2)}) ${ns.slice(2, 7)}-${ns.slice(7, 11)}`;
  }
  return 'Array com tamanho incorreto.';
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < (lineB + lineC) && lineA > (Math.abs(lineB - lineC))) {
    return true;
  }
  return false;
}

// Desafio 13
function hydrate(phrase) {
  let grab = /\d+/g;
  let numbers = phrase.match(grab);
  let numbers2 = [];
  for (let i = 0; i < numbers.length; i++) {
    numbers2.push(parseInt(numbers[i]));
  }
  let sum = 0;
  for (let number of numbers2) {
    sum += number;
  }
  if (sum === 1) {
    return `${sum} copo de água`;
  }
  return `${sum} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
