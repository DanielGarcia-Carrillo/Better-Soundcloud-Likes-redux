export function mirrorKeys(keys: Array<String>): {[key: String]: String} {
    const mappedKeys = Object.create(null);

    keys.forEach(function(k) {
        mappedKeys[k] = k;
    });

    return mappedKeys;
}
