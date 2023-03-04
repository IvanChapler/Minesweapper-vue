[1, 2, 5, 3, 4, 8, 0, 1, 1];

const Bomb = "mdi-bomb";

const Mask = {
  Transparent: "",
  Fill: " ",
  Flag: "P",
  Question: "?",
};

function inc(x, y, sizeX, sizeY, field) {
  //Вопрос 3
  if (x >= 0 && x < sizeX && y >= 0 && y < sizeY) {
    if (field[y * sizeX + x] === Bomb) return;
    field[y * sizeX + x] += 1;
  }
}

function createField(size, sizeX, sizeY, firstOpened) {
  //Вопрос 1
  const field = new Array(sizeX * sizeY).fill(0);
  const mask = new Array(sizeX * sizeY).fill(Mask.Fill);

  //раскидываем бомбы
  for (let i = 0; i < size; ) {
    const x = Math.floor(Math.random() * sizeX);
    const y = Math.floor(Math.random() * sizeY);
    const cell = y * sizeX + x;

    if (field[cell] === Bomb || cell === firstOpened) continue;

    field[cell] = Bomb;

    inc(x + 1, y, sizeX, sizeY, field);
    inc(x - 1, y, sizeX, sizeY, field);
    inc(x, y + 1, sizeX, sizeY, field);
    inc(x, y - 1, sizeX, sizeY, field);
    inc(x + 1, y + 1, sizeX, sizeY, field);
    inc(x - 1, y - 1, sizeX, sizeY, field);
    inc(x - 1, y + 1, sizeX, sizeY, field);
    inc(x + 1, y - 1, sizeX, sizeY, field);

    i++;
  }

  return { field, mask };
}

export { createField, Bomb };
