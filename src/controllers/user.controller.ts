import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import APIError from "../exeption/APIError";
import ValidationError from "../exeption/ValidationError";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import Locals from "../providers/Locals";

class UserController {
  public async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }
      console.log("errors", errors)
      const { userName, name, age, country } = request.body;
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        throw new APIError("User with userName already exists", 400);
      }
      const user = await new User({
        userName,
        name,
        age,
        country,
      }).save();
      const token = jwt.sign({ _id: user._id }, Locals.config().appSecret);
      response.send({
        statusCode: 200,
        message: "User added successfully",
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }
      const userId = request.user._id;
      const { userName, name, age, country } = request.body;
      const user = await User.findById(userId);
      console.log(userId);
      if (!user) {
        throw new APIError("Invalid User id", 400);
      }
      if (userName) {
        const userWithUsername = await User.findOne({ userName });
        if (userWithUsername) {
          throw new APIError("UserName already exists", 400);
        }
        user.userName = userName;
      }
      if (name) {
        user.name = name;
      }
      if (age) {
        user.age = age;
      }
      if (country) {
        user.country = country;
      }
      await user.save();
      response.send({
        statusCode: 200,
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.user._id;
      const user = await User.findById(userId);
      if (!user) {
        throw new APIError("Invalid User id", 400);
      }
      response.send({
        statusCode: 200,
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.user._id;
      const user = await User.findById(userId);
      if (!user) {
        throw new APIError("Invalid User id", 400);
      }
      await User.findByIdAndDelete(userId);
      response.send({
        statusCode: 200,
        message: "User deleted successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
