const{Router} = require('express')

const router = Router()

const ansController = require("../../controller/ansController");
const upload = require("../../middleware/upload")
//pake 3000 /case/

router.get("/", ansController.getAllAns);
router.get("/:id", ansController.getOne);
router.get("/user/:id",ansController.getOneUserAns);
router.post("/add",ansController.addAns);
router.put("/:id",ansController.updateAns);
router.delete("/:id",ansController.deleteOne);

// router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//        if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send(file)
// })


module.exports = router

