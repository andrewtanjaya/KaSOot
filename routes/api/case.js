const{Router} = require('express')

const router = Router()

const caseController = require("../../controller/caseController");

//pake 3000 /case/

router.get("/", caseController.getAllCase);
router.get("/:id", caseController.getOne);
router.get("/quiz/:id", caseController.getQuiz);
router.post("/add",caseController.addCase);
router.put("/:id",caseController.updateCase);
router.delete("/:id",caseController.deleteOne);

module.exports = router