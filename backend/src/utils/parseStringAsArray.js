module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); // O Trim ele remove espaçamento antes e depois. o Split(,) remove a virgula.
}