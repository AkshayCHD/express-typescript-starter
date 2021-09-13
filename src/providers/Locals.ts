/**
 * Define App Locals & Configs
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Application } from "express";
import * as path from "path";
import * as dotenv from "dotenv";

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    const environment = process.env.ENV || "development";
    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 5521;
    const appSecret = process.env.APP_SECRET || "This is your responsibility!";
    const mongooseUrl = process.env.MONGOOSE_URL;
    const mongooseUrlUnitTest = process.env.MONGOOSE_URL_UNIT_TEST;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || "api";
    return {
      appSecret,
      apiPrefix,
      jwtExpiresIn,
      mongooseUrl,
      port,
      url,
      environment,
      mongooseUrlUnitTest,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
