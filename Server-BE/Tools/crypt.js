import bcrypt from "bcryptjs";

import { getPassWord } from "../controllers/auxcomd.js";

export const hashing = async (word) => {
  const saltRounds = 10;
  return await bcrypt.hash(word, saltRounds);
};

export const Comphashing = async (word, normalWord) => {

  const hasWord = await getPassWord(word);

  if(!hasWord) return false

  return await bcrypt.compare(normalWord, hasWord);
};
