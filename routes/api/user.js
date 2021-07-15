const{Router} = require('express')
const auth = require('../../auth')

const router = Router()

//view
// router.get('/', async (req,res)=>{
//     try {
//         const user = await User.find()
//         if(!user) throw new Error('No user')
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }
// })

// insert
// router.post('/', async (req,res)=>{
//     const newUser = new User(req.body)
//     try {
//         const user = await newUser.save()
//         if(!user) throw new Error('Something went wrong saving the user')
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }
// })

//update
// router.put('/:id', async (req,res)=>{
//     const {id} = req.params
//     try {
//         const response = await User.findByIdAndUpdate(id,req.body)

//         if(!response) throw new Error('Something went wrong ')
//         const updated = {... response._doc, ... req.body}
//         res.status(200).json(updated)
//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }
// })

//delete
// router.delete('/:id', async (req,res)=>{
//     const {id} = req.params
//     try {
//         const removed = await User.findByIdAndDelete(id)
//         if(!removed) throw new Error('Something went wrong ')
//         res.status(200).json(removed)
//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }
// })

const userController = require("../../controller/userController");

//pake 3000 /user/
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth,userController.getUserDetails);
router.put("/:id",userController.updateUser);
router.get("/:id",userController.getOne);
router.delete('/:id',userController.deleteOne);
router.get("/",userController.getAllUser);


module.exports = router