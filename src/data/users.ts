// import bcrypt from 'bcryptjs'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { IUser } from '../module/user/model/userInterface.js'

const users: IUser[] = [
  {
    name: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: hashSync('123456', genSaltSync(10)),
    role: 'admin',
    is_verified: true,
  },
  {
    name: 'Developer',
    username: 'admindev',
    email: 'admindev@example.com',
    password: hashSync('123456', genSaltSync(10)),
    role: 'admin',
    is_verified: true,
  },
  {
    name: 'John Doe',
    username: 'jhon',
    email: 'john@example.com',
    password: hashSync('123456', genSaltSync(10)),
    role: 'user',
    is_verified: true,
  },
  {
    name: 'Jane doe',
    username: 'jane',
    email: 'jane@example.com',
    password: hashSync('123456', genSaltSync(10)),
    role: 'user',
    is_verified: true,
  },
]

export default users
