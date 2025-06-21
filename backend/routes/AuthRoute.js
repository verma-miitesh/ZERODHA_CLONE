const { Signup, Login } = require("../controllers/AuthController");
const router = require("express").Router();
const {userVerification}=require("../middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/',userVerification);


module.exports = router;