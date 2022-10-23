const bcrypt = require('bcrypt')
const crypto = require('crypto')
const lz = require('lz-string')

const bhash = function (salt, round) {
    round = Number(round)
    this.hash = (a) => {
        const x = crypto.createHash("sha256").update(a).update(salt)
        const hash = bcrypt.hashSync(x.digest(), round);
        x.destroy()
        return lz.compress(hash.split("$")[3])
    }

    this.validate = (a, b) => {
        const x = crypto.createHash("sha256").update(a).update(salt).digest()
        return bcrypt.compareSync(x, `$2b$${round}$${lz.decompress(b)}`);
    }
}


module.exports = {
    bhash: new bhash(process.env.BSALT, process.env.ROUND)
}