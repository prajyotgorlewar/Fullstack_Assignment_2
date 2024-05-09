import express from "express";
import adminController from "../controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const router = express.Router();

router.route('/viewUsers').get(authMiddleware,adminMiddleware, adminController.getAllUsers);
router.route('/yourPosts').get(authMiddleware,adminMiddleware, adminController.getAllPosts);


router.route('/viewUsers/editUser/:id').get(authMiddleware,adminMiddleware, adminController.getUserById);


router.route('/viewUsers/editUser/:id').patch(authMiddleware,adminMiddleware, adminController.updateUserById);


//delete route
router.route('/viewUsers/deleteUser/:id').delete(authMiddleware,adminMiddleware,adminController.deleteUserById)




//for post
router.route('/addPost').post(authMiddleware,adminMiddleware, adminController.addPost);

router.route('/yourPosts/editPost/:id').get(authMiddleware,adminMiddleware, adminController.getPostById);


router.route('/yourPosts/editPost/:id').patch(authMiddleware,adminMiddleware, adminController.updatePostById);


//delete post
router.route('/yourPosts/deletePost/:id').delete(authMiddleware,adminMiddleware,adminController.deletePostById)
export default router;
