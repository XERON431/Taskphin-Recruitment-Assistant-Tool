// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    defaultValue: '/avatar.png',
  },
  role: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    defaultValue: ['Creator'],
  },
  passwordResetCode: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  savedImages: {
    type: DataTypes.ARRAY(DataTypes.JSONB), // Array of JSONB type to store image data
    defaultValue: [], // Default value as an empty array
  },
}, {
  tableName: 'User'
});

export default User;
