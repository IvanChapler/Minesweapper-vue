
[1, 2, 5,
 3, 4, 8,
 0, 1, 1]

const Bomb = -1;

function inc (x, y, size, field) { //Вопрос 3
    if (x >= 0 && x < size && y >= 0 && y < size) {
        if (field[y * size + x] === Bomb) return
        field[y * size + x] += 1
    }
}

export default function createField(size) { //Вопрос 1
    const field = new Array(Math.pow(size, 2)).fill(0)

    for (let i = 0; i < size;) {
        const x = Math.floor(Math.random() * size)
        const y = Math.floor(Math.random() * size)
        const cell = y * size + x

        if (field[cell] === Bomb) continue

        field[cell] = Bomb

        inc(x + 1, y, size, field)
        inc(x - 1, y, size, field)
        inc(x, y + 1, size, field)
        inc(x, y - 1, size, field)
        inc(x + 1, y + 1, size, field)
        inc(x - 1, y - 1, size, field)
        inc(x - 1, y + 1, size, field)
        inc(x + 1, y - 1, size, field)

        i++
    }

    return field
}