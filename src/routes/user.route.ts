import { Router } from "express";
import { body } from "express-validator";
import {
  ageError,
  ageRange,
  countryError,
  countryRange,
  nameError,
  nameRange,
  userNameError,
  userNameRange,
} from "../constants/user.constant";
import userController from "../controllers/user.controller";
const router = Router();

router.post("/health-check", userController.healthCheck);
router.post(
  "/",
  body("userName", userNameError).isString().isLength(userNameRange),
  body("name", nameError).isString().isLength(nameRange),
  body("country", countryError).isString().isLength(countryRange),
  body("age", ageError).isNumeric().isLength(ageRange),
  userController.createUser
);

router.put(
  "/",
  body("userName", userNameError).optional().isString().isLength(userNameRange),
  body("name", nameError).optional().isString().isLength(nameRange),
  body("country", countryError).optional().isString().isLength(countryRange),
  body("age", ageError).optional().isNumeric().isLength(ageRange),
  userController.createUser
);

router.get("/", userController.getUser);

router.delete("/", userController.deleteUser);

export default router;
