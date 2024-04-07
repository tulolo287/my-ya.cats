import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index'

export const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
  },
  {
    indexes: [
      {
        fields: ['last_name'],
      },
    ],
  }
)
