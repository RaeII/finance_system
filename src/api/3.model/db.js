import mysql from "mysql";
import env from "../../config/index.js";
import colors from 'colors/safe.js';


const connection = mysql.createConnection({
  host: env.MYSQL_HOSTNAME,
  user: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_NAME,
  port: env.MYSQL_PORT ? parseInt(env.MYSQL_PORT) : 3306,
});

connection.connect((error) => {
  try {
    if (error) throw error;
    console.log(colors.bold.magenta(" MYSQL"),'👌');
  } catch (error) {
    console.log('ERROR MYSQL',error)
  }

});

export default connection;

