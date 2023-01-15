// Desafio 1

function compareTrue(a, b) {
  if (a && b === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, altura) {
  let x = (base * altura) / 2;
  return x;
}

// Desafio 3
function splitSentence(a) {
  let b = a.split(' ');
  return b;
}

// Desafio 4
function concatName(a) {
  let b = `${a[a.length - 1]}, ${a[0]}`;
  return b;
}

// Desafio 5
function footballPoints(wins, ties) {
  wins = (3 * wins) + ties;
  return wins;
}

// Desafio 6
function highestCount(high) {
  let a = Math.max.apply(Math, high);
  let b = 0;
  for (let i = 0; i <= high.length; i++) {
    if (a == high[i]) {
      b++;
    }
  }
  return b;
}

// Desafio 7
function catAndMouse(m, c1, c2) {
  if (Math.abs(c1 - m) > Math.abs(c2 - m)) {
    return ('cat2');
  } if (Math.abs(c1 - m) < Math.abs(c2 - m)) {
    return ('cat1');
  } if (Math.abs(c1 - m) === Math.abs(c2 - m)) {
    return ('os gatos trombam e o rato foge');
  }
}

// Desafio 8
function fizzBuzz(a) {
  let phrase = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] % 3 === 0 && a[i] % 5 === 0) {
      phrase.push('fizzBuzz');
    } else if (a[i] % 3 === 0 && a[i] % 5 !== 0) {
      phrase.push('fizz');
    } else if (a[i] % 5 === 0 && a[i] % 3 !== 0) {
      phrase.push('buzz');
    } else if (a[i] % 5 !== 0 && a[i] % 3 !== 0) {
      phrase.push('bug!');
    }
  }
  return (phrase);
}

// Desafio 9
function encode(secret) {
  let vogais = ['a', 'e', 'i', 'o', 'u'];
  let numeros = [1, 2, 3, 4, 5];
  for (let i = 0; i < vogais.length; i++) {
    secret = secret.replaceAll(vogais[i], numeros[i]);
  }
  return secret;
}

function decode(desecret) {
  let vogais = ['a', 'e', 'i', 'o', 'u'];
  let numeros = [1, 2, 3, 4, 5];
  for (let i = 0; i < vogais.length; i++) {
    desecret = desecret.replaceAll(numeros[i], vogais[i]);
  }
  return desecret;
}

// Desafio 10
function techList(technos, namee) {
  technos.sort();
  let lista = [];
  if (technos.length !== 0) {
    for (let i = 0; i < technos.length; i++) {
      let technologia = {
        tech: technos[i],
        name: namee,
      };
      lista.push(technologia);
    }
  } else {
    return 'Vazio!';
  }
  return lista;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
