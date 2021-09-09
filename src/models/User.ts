import { model, Document, Schema } from "mongoose"

interface IUser extends Document {
  username: string
  email: string
  password: string
  invites: number[]
  pending: number[]
  rooms: number[]
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  invites: [
    {
      type: Number,
    },
  ],
  pending: [
    {
      type: Number,
    },
  ],
  rooms: [
    {
      type: Number,
    },
  ],
})

export default model<IUser>("User", userSchema)
