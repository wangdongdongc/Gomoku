function makeMatrix<T>(r: number, c: number, value: T): T[][] {
    let matrix = new Array<T[]>(r)
    for (let i = 0; i < r; i++)
        matrix[i] = new Array<T>(c)
    for (let i = 0; i < r; i++)
        for (let j = 0; j < c; j++)
            matrix[i][j] = value
    return matrix
}