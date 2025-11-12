import { Comphashing } from "../Tools/crypt.js";

import { signToken } from "../Security/sends.js";

import { getUserID, getRealUser } from "../controllers/auxcomd.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const truUser = await getRealUser(email);

  const Valpasword = await Comphashing(email, password);

  if (!truUser && !Valpasword)
    return res.status(400).json({ message: "Invalid credentials" });

  const user = { id: await getUserID(email), email };

  const token = await signToken(user);

  res.status(200).json({ user: user.id, token: token });
};
