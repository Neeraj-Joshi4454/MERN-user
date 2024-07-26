const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const authenticationController = require('../controllers/authenticationController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

//__________public Routes___________________

router.post('/register', authenticationController.register)
router.post('/login', authenticationController.login)




//__________Protected Routes___________________

router.post('/users', auth, upload.single('photo'), userController.createUser);
router.get('/users/:id', auth, userController.getUser);
router.put('/users/:id',auth, upload.single('photo'), userController.updateUser);
router.delete('/users/:id',auth, userController.deleteUser);

module.exports = router;
