import db from './index'
import config from '../config'

const { sequelize, Sequelize } = db

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    facebook_id: {
      type: Sequelize.STRING,
      unique: true
    },
    display_name: Sequelize.STRING,
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    access_token: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    refresh_token: Sequelize.STRING,
    role: {
      type: Sequelize.INTEGER,
      defaultValue: config.userRoles.user
    },
    billing_address: Sequelize.STRING,
    shipping_address: Sequelize.STRING
  },
  {
    underscored: true
  }
)
User.sync({ force: true })
export default User

// {
//   "id": "1391494597552308",
//   "displayName": "Ricardo Almeida",
//   "email": "aimuhz@sapo.pt",
//   "photo": "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.12.50.50/p50x50/1919099_115073891861058_4081595_n.jpg?oh=7ced04bf8838561810bef383218f62c3&oe=5A347EE0",
//   "verified": true,
//   "first_name": "Ricardo",
//   "last_name": "Almeida"
// }
