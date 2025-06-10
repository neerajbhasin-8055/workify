import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js"
const router = express.Router()

router.route('/register').post(singleUpload,register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile/update').post(isAuthenticated,singleUpload,updateProfile)
router.get('/me', isAuthenticated, (req, res) => {
    res.status(200).json({
        message: "Authenticated ✅",
        userId: req.id
    });
});


export default router