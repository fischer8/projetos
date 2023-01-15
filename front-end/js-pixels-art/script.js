document.body.style.backgroundColor = 'rgba(139, 139, 139, 0.959)';
document.body.style.textAlign = 'center';

function divCreator() {
  const div = document.createElement('div');
  return div;
}

function titulo() {
  const h1 = document.createElement('h1');
  h1.id = 'title';
  h1.innerText = 'Paleta de Cores';
  document.body.appendChild(h1);
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function palette() {
  const div = divCreator();
  div.id = 'color-palette';

  const colors = [randomColor(), randomColor(), randomColor()];
  const firstColor = 'black';

  const firstDiv = divCreator();
  firstDiv.onmouseover = function () {
    firstDiv.style.border = '2px solid blue';
  };
  firstDiv.onmouseleave = function () {
    firstDiv.style.border = '1px solid black';
  };

  paletteCreator(firstDiv, firstColor);
  firstDiv.className += ' selected';
  div.appendChild(firstDiv);
  document.body.appendChild(div);

  for (const color of colors) {
    const div2 = divCreator();
    div2.onmouseover = function () {
      div2.style.border = '2px solid blue';
    };
    div2.onmouseleave = function () {
      div2.style.border = '1px solid black';
    };
    paletteCreator(div2, color);
    div.appendChild(div2);
    document.body.appendChild(div);
  }
}

function paletteCreator(div2, color) {
  div2.className = 'color';
  div2.style.display = 'inline-block';
  div2.style.backgroundColor = color;
  div2.style.border = '1px solid black';
  div2.style.width = '60px';
  div2.style.height = '60px';
}

function boxCreator() {
  const box = divCreator();
  box.className = 'pixel';
  box.style.width = '40px';
  box.style.height = '40px';
  box.style.float = 'left';
  box.style.backgroundColor = 'white';
  box.style.border = '1px solid black';
  box.addEventListener('click', pixelColor);
  return box;
}

function pixelColor() {
  const currentColor = document.querySelector('.selected').style.backgroundColor;
  event.target.style.backgroundColor = currentColor;
}

function bigBox(n) {
  const big = divCreator();
  big.id = 'pixel-board';
  big.style.margin = 'auto';
  big.style.width = 'fit-content';
  big.style.height = 'auto';

  for (let i = 0; i < n; i++) {
    const div = pixels();
    div.className = 'line';
    for (let i = 0; i < n; i++) {
      const box = boxCreator();
      div.appendChild(box);
      big.appendChild(div);
    }
    document.body.appendChild(big);
  }
}

function pixelCreator() {
  let boardSize = document.getElementById('board-size').value;
  if (boardSize == '') {
    alert('Board inválido!');
    return;
  }
  if (boardSize < 5) {
    boardSize = 5;
  } else if (boardSize > 50) {
    boa;
  }rdSize = 50
  const board = document.getElementById('pixel-board');
  board.remove();
  bigBox(boardSize);
}

function pixels() {
  const div = divCreator();
  div.style.height = '42px';
  return div;
}

function selects() {
  const select = document.querySelectorAll('.color');
  for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', () => {
      const selected = document.querySelector('.selected');
      selected.classList.remove('selected');
      event.target.className += ' selected';
    });
  }
}

function inputText() {
  const div = divCreator();
  div.style.width = 'fit-content';
  div.innerText = 'Escolha um numero:';

  const input = document.createElement('input');
  input.setAttribute('placeholder', ' 5 ~ 50');
  input.setAttribute('type', 'number');
  input.setAttribute('min', '1');
  input.style.width = '57px';
  input.style.float = 'right';
  input.id = 'board-size';
  div.appendChild(vqv());
  div.appendChild(input);
  document.body.children[3].appendChild(div);
}

function vqv() {
  const button = document.createElement('button');
  button.addEventListener('click', pixelCreator);
  button.id = 'generate-board';
  button.setAttribute('type', 'button');
  button.style.float = 'right';
  button.style.borderRadius = '5px'
  button.innerText = 'VQV';
  return button;
}

function createButton() {
  const button = divCreator();
  const div = divCreator();

  div.style.display = 'inline-block';
  div.style.width = '300px';
  div.style.margin = '10px 0 10px 0';

  buttonStyle(button);
  div.appendChild(button);

  const body = document.body.children[2];
  body.parentNode.insertBefore(div, body.nextSibling);
}

function buttonStyle(button) {
  button.addEventListener('click', reset);
  button.id = 'clear-board';
  button.style.backgroundColor = '#c6cacf';
  button.style.width = 'fit-content';
  button.style.padding = '4px 8px';
  button.style.borderRadius = '5px';
  button.style.border = '1px solid black';
  button.innerText = 'Limpar';
  button.style.fontSize = '10px';
  button.style.float = 'right';
}

function reset() {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].style.backgroundColor = 'white';
  }
}

titulo();
palette();
bigBox(5);
selects();
createButton();
inputText();
