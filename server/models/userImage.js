// models/userImage.js
import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const UserImage = sequelize.define('UserImage', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'UserImage'
});

export default UserImage;
