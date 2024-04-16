
import express from "express";
import {
  resetPassword, 
  forgotPassword, 
  logout, 
  loginUser, 
  registerUser, 
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  deleteUser,
  updateUser
} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

// Router route(dẫn) đến mục "/products" để get (nhận request) và đưa vào controller function (hàm điều khiển)
router.route("/register").post(registerUser);
// Đăng nhập người dùng
router.route("/login").post(loginUser);

// Đăng xuất người dùng
router.route("/logout").get(logout);

// Yêu cầu đặt lại mật khẩu
router.route("/password/forgot").post(forgotPassword);

// Yêu cầu cập nhật mật khẩu bằng token đã cung cấp
router.route("/password/reset/:token").put(resetPassword);

// Lấy thông tin hồ sơ của người dùng hiện tại
router.route("/me").get(isAuthenticatedUser, getUserProfile);

// Cập nhật mật khẩu của người dùng hiện tại
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// Cập nhật thông tin hồ sơ của người dùng hiện tại
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// Lấy thông tin tất cả người dùng (chỉ cho quản trị viên)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

// Lấy thông tin chi tiết của một người dùng cụ thể (chỉ cho quản trị viên)
router.route("/admin/users/:id")
  // Lấy thông tin chi tiết của người dùng (GET)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  // Cập nhật thông tin người dùng (PUT)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  // Xóa người dùng (DELETE)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

  export default router;