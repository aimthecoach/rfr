import db from './index'

const { sequelize, Sequelize } = db

const Feature = sequelize.define(
  'feature',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    product_id: {
      type: Sequelize.UUID
    },
    start_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    exp_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    underscored: true
  }
)
export default Feature
