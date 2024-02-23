// models/image.js
import { DataTypes } from 'sequelize';
import sequelize from './database.js';
import User from './user.js'; // Import the User model
const Image = sequelize.define('Image', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    trim: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  expectedSalary: {
    type: DataTypes.NUMERIC,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  currentStatus: {
    type: DataTypes.STRING,
  },
  nodejsExperience: {
    type: DataTypes.STRING,
  },
  reactjsExperience: {
    type: DataTypes.STRING,
  },
  image: {
    type: [DataTypes.JSONB],
  },
  category: {
    type: DataTypes.STRING,
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
    },
  },
}, {
  tableName: 'Image'
});




export default Image;