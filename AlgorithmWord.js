function _minWord(w1, w2) {
    return w1.length < w2.length ? w1 : w2
}

function _maxWord(w1, w2) {
    return w1.length > w2.length ? w1 : w2
}

// TODO rewrite algorithm
/**
 * перевіряє скільки потрібно операцій замміни, видалення переставлення аби з одного слова отримати інше
 * ЦЕ скоріше для слів-помилок або слів-суржиків (привіт - привет)
 * @param w1
 * @param w2
 * @returns {any|number}
 * @private
 */
function _levenshteinWord (w1, w2) {
    if (w1 == w2) {
        return 0;
    }

    var w1_len = w1.length;
    var w2_len = w2.length;
    if (w1_len === 0) {
        return w2_len;
    }
    if (w2_len === 0) {
        return w1_len;
    }

    // BEGIN STATIC
    var split = false;
    try {
        split = !('0')[0];
    } catch (e) {
        // Earlier IE may not support access by string index
        split = true;
    }
    // END STATIC
    if (split) {
        w1 = w1.split('');
        w2 = w2.split('');
    }

    var v0 = new Array(w1_len + 1);
    var v1 = new Array(w1_len + 1);

    var w1_idx = 0,
        w2_idx = 0,
        cost = 0;
    for (w1_idx = 0; w1_idx < w1_len + 1; w1_idx++) {
        v0[w1_idx] = w1_idx;
    }
    var char_w1 = '',
        char_w2 = '';
    for (w2_idx = 1; w2_idx <= w2_len; w2_idx++) {
        v1[0] = w2_idx;
        char_w2 = w2[w2_idx - 1];

        for (w1_idx = 0; w1_idx < w1_len; w1_idx++) {
            char_w1 = w1[w1_idx];
            cost = (char_w1 == char_w2) ? 0 : 1;
            var m_min = v0[w1_idx + 1] + 1;
            var b = v1[w1_idx] + 1;
            var c = v0[w1_idx] + cost;
            if (b < m_min) {
                m_min = b;
            }
            if (c < m_min) {
                m_min = c;
            }
            v1[w1_idx + 1] = m_min;
        }
        var v_tmp = v0;
        v0 = v1;
        v1 = v_tmp;
    }
    return v0[w1_len];
}

function cmpWords(w1, w2) {
    if (w1 === w2)
        return true
    //cmp like яблуками та яблук
    if (_maxWord(w1, w2).match(new RegExp(`^${_minWord(w1, w2)}[a-z]*$`)) !== null)
        return true
    // не дуже впевнений стосовно цього бо повертає не завжди те що потрібно
    if (_minWord(w1,w2) >= 3 && _levenshteinWord(w1,w2) <= 2)
        return true
    return false
}

console.log(cmpWords("Hello", "Hello"))
