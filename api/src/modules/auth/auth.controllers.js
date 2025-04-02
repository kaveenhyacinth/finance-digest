import { errorRes, successRes } from "../../lib/utils/response.util.js";
import { signInUser, signUpUser } from "./auth.services.js";

export async function signup(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  try {
    const token = await signUpUser({ firstName, lastName, password, email });
    return successRes(res, 201, { data: { token }, message: "User has been created successfully!" });
  } catch (error) {
    errorRes(next, error);
  }
}

export async function signin(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await signInUser({ password, email });
    return successRes(res, 200, { data: { token } });
  } catch (error) {
    errorRes(next, error);
  }
}