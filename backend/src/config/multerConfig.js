const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Directorio de carga
const uploadDir = path.join(__dirname, 'uploads');

// Crear el directorio si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Solo se permite la carga de archivos .xlsx y .csv'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
