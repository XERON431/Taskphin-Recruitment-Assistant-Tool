// models/database.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  dialect: 'postgres',
  ssl: true, // Enable SSL for secure connection (Render PostgreSQL requires SSL)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Disable SSL verification (necessary for some setups)
    }
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;
