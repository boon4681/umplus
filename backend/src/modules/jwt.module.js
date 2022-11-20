const crypto = require('crypto');

const Tokenizer = function (day, salt) {
    function string(len) {
        return crypto.randomBytes(len * 10).toString('base64').replace(/=/g, "").replace(/\+/g, "").replace(/\//g, "").slice(0, len);
    }
    const hash = (x, a, b) => crypto.createHash('sha256').update(x).update(a + "." + b).update(salt)
    function reverse(x) {
        return [...x].reverse().join("")
    }
    function split(x) {
        let d1 = -1, d2 = -1
        if (x.includes('.') && (d2 = x.lastIndexOf('.')) > (d1 = x.indexOf('.'))) {
            return [x.slice(0, d1), x.slice(d1 + 1, d2), x.slice(d2 + 1)]
        }
        return false
    }
    this.encode = function (x) {
        x = JSON.stringify(x) + "." + (Date.now() + 86400000 * day)
        const a = reverse(Buffer.from(reverse(x)).toString("base64url"))
        const b = string(20)
        const h = hash(x, a, b, salt)
        const c = h.digest().toString("base64url"); h.destroy()
        return [Buffer.from(a).toString("base64url"), b, c].join(".")
    }
    this.decode = function (x) {
        x = split(x)
        if (!x) return false
        x[0] = Buffer.from(x[0], "base64url").toString("utf-8")
        const _x = reverse(Buffer.from(reverse(x[0]), "base64url").toString("utf-8"))
        const h = hash(_x, x[0], x[1], salt)
        const c = h.digest().toString("base64url"); h.destroy()
        const k = _x.lastIndexOf(".")
        const expire_date = Number(_x.slice(k + 1))
        if (c == x[2] && expire_date > Date.now()) return { isValid: true, data: JSON.parse(_x.slice(0, k)), expire_date: expire_date, payload: x[1] }
        return false
    }
    this.validate = function (x) {
        x = split(x)
        if (!x) return false
        x[0] = Buffer.from(x[0], "base64url").toString("utf-8")
        const _x = reverse(Buffer.from(reverse(x[0]), "base64url").toString("utf-8"))
        const h = hash(_x, x[0], x[1], salt)
        const c = h.digest().toString("base64url"); h.destroy()
        return c == [2]
    }
}

module.exports = {
    bwt: new Tokenizer(30, 'HEllo Fello')
}