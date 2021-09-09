import { Router, Request, Response } from "express"
import jwt from "../services/jwt-service"
import { hash, compare } from "bcrypt"
import User from "../models/User"

const route = Router()

route.post("/signin", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
      const validPass = await compare(password, user.password)
      if (validPass) {
        const access_token = await jwt.createAccess(
          {
            user_id: user._id,
            access_token: true,
          },
          "10 minutes",
        )
        const refresh_token = await jwt.createAccess(
          {
            user_id: user._id,
            refresh_token: true,
          },
          "1 year",
        )
        res.status(200).json({ access_token, refresh_token })
      }
    }
  } catch (err) {
    res.sendStatus(400)
  }
})

route.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body
    const hashedPass = await hash(password, 10)
    const user = {
      username: username,
      email: email,
      password: hashedPass,
    }
    await User.create(user)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400)
  }
})

export default route
