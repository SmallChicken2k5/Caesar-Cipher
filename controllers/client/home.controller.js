const path = require('path');
const { encrypt, decrypt, normalizeKey } = require('../../helpers/caesar');

// [GET] /
module.exports.index = async (req, res) => {
    res.render('client/pages/home/index', {
        title: 'Lab Tool',
    });
};

