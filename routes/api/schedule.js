const{Router} = require('express')

const router = Router()

const scheduleController = require("../../controller/scheduleController");

//pake 3000 /scheduler/

router.get("/", scheduleController.getAllSchedule);
router.get("/:id", scheduleController.getOne);
router.post("/add",scheduleController.addSchedule);
router.put("/:id",scheduleController.updateSchedule);
router.delete("/:id",scheduleController.deleteOne);

module.exports = router