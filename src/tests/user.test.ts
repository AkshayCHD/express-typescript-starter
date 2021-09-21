import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env.test") });

import Locals from "../providers/Locals";
import { Database } from "../providers/Database";
Database.init(Locals.config().mongooseUrlUnitTest);
import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chai from "chai";
import Express from "../providers/Express";
import express from "express";
import { assert } from "chai";
import User, { IUserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);
describe("User unit tests", () => {
  let app: express.Application;
  const userId = mongoose.Types.ObjectId();
  const token = jwt.sign({ _id: userId }, Locals.config().appSecret);
  before((done) => {
    app = Express.getExpress();
    done();
  });
  describe("/PUT User", async () => {
    let user: IUserModel;

    it("Unauthorized error should be given", async () => {
      const result = await chai.request(app).put("/api/user");
      const { error } = result.body;
      const status = result.status;
      assert.equal(401, status);
    });

    it("User updated successfully", async () => {
      const user = await new User({
        _id: userId,
        name: "Akshay",
        userName: "Akshay",
        country: "India",
        age: 20,
      }).save();
      const result = await chai
        .request(app)
        .put("/api/user")
        .set("content-type", "application/json")
        .send({
          name: "Yahska",
          userName: "Yahska",
          country: "USA",
          age: 2,
        })
        .set({ Authorization: `Bearer ${token}` });
      const status = result.status;
      assert.equal(200, status);
      const updatedUser = await User.findById(userId);
      assert.equal(updatedUser?.name, "Yahska");
      assert.equal(updatedUser?.userName, "Yahska");
      assert.equal(updatedUser?.country, "USA");
      assert.equal(updatedUser?.age, 2);
    });
  });

  describe("/GET User", async () => {
    let user: IUserModel;
    beforeEach(async () => {
      user = await new User({
        _id: userId,
        userName: "123456789",
        name: "123456789",
        country: "India",
        age: 20,
      }).save();
    });
    it("Get user object", async () => {
      const result = await chai
        .request(app)
        .get("/api/user")
        .set("content-type", "application/json")
        .set({ Authorization: `Bearer ${token}` });
      const { userName, name, age, country } = result.body.user;
      assert.equal(user.name, name);
      assert.equal(user.country, country);
      assert.equal(user.userName, userName);
      assert.equal(user.age, age);
    });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  after(() => {
    Database.close();
  });
});
