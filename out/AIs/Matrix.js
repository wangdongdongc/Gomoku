function makeMatrix(r, c, value) {
    var matrix = new Array(r);
    for (var i = 0; i < r; i++)
        matrix[i] = new Array(c);
    for (var i = 0; i < r; i++)
        for (var j = 0; j < c; j++)
            matrix[i][j] = value;
    return matrix;
}
//# sourceMappingURL=Matrix.js.map