const path = require('path');
const { encrypt, decrypt, normalizeKey } = require('../../helpers/caesar');

// [GET] /
module.exports.index = async (req, res) => {
    res.render('client/pages/home/index', {
        title: 'Caesar Cipher',
        formData: { text: '', key: '', mode: 'encrypt' },
        result: null
    });
};

// [POST] /process
module.exports.process = async (req, res) => {
    try {
        const bodyText = req.body.text || '';
        const uploadText = req.file ? req.file.buffer.toString('utf8') : '';
        const text = uploadText || bodyText;

        const mode = req.body.mode === 'decrypt' ? 'decrypt' : 'encrypt';
        const key = normalizeKey(req.body.key);

        let result = mode === 'encrypt' ? encrypt(text, key) : decrypt(text, key);

        // Tải file kết quả nếu người dùng chọn "download"
        if (req.body.download === '1') {
            const filename = `caesar-${mode}-k${key}.txt`;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            return res.send(result);
        }

        req.flash('success', 'Xử lý thành công');
        return res.render('client/pages/home/index', {
            title: 'Caesar Cipher',
            formData: { text, key, mode },
            result
        });
    } catch (e) {
        req.flash('error', 'Có lỗi xảy ra');
        return res.render('client/pages/home/index', {
            title: 'Caesar Cipher',
            formData: { text: req.body.text || '', key: req.body.key || '', mode: req.body.mode || 'encrypt' },
            result: null
        });
    }
};