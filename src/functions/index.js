import slugify from 'slugify'
import * as bcrypt from 'bcryptjs'

export const slug = str => slugify(str, { lower: true });

export const createMarkup = (text) => ({ __html: text });

export const uid = () => {
  let randTime = Date.now().toString(36).toLocaleUpperCase();
  let randNumber = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
  randNumber = randNumber.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
  return ''.concat(randTime, '-', randNumber);
};

const salt = bcrypt.genSaltSync(10);
export const passwordHash = plainPassword => {
  return bcrypt.hashSync(plainPassword, salt);
}

export const passwordVerify = (plainPassword,hashedPassword) =>{
  return bcrypt.compareSync(plainPassword, hashedPassword);
}