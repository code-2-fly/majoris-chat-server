import { sign, verify } from "jsonwebtoken"

class jwtService {
  private static secret = process.env.JWT_KEY || ""

  public static createAccess = async (
    payload: any,
    expiresIn: string,
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      sign(payload, this.secret, { expiresIn: expiresIn }, (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
  }

  public static verify = async (payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      verify(payload, this.secret, (err: Error | null, decoded: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      })
    })
  }
}

export default jwtService
