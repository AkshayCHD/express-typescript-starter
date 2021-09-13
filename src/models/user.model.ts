import mongoose from "../providers/Database";

export interface IUser {
  userName: string;
  name: string;
  age: number;
  country: string;
}

// Create the model schema & register your custom methods here
export interface IUserModel extends IUser, mongoose.Document {}

// Define the User Schema
export const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true },
    age: { type: String, default: 0 },
    country: { type: String, default: "India" },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;
