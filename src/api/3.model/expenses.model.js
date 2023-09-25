import sql from "./db.js";
import colors from 'colors/safe.js';
class userModel {
  
  expensesAdd = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO expenses SET ?",
        data,
        (err, res) => {
          if (err) {
            console.log(colors.bold.red("❌ ERROR ❌\n"), err ,colors.bold.red("\n❌ ERROR ❌"));
            return reject(err);
          }
          console.log("created post: ", {
            id: res.insertId,
            ...data,
          });

          return resolve({
            id: res.insertId,
            ...data,
          });
        }
      );
    });
  };

  getExpensesByUserId = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        
        id,
        value_expenses,
        type_expenses,
        description_expenses,
        date_expenses,
        user_id
         
        FROM expenses WHERE expenses.user_id = ? 
        AND MONTH(expenses.date_expenses) = MONTH(?) 
        AND YEAR(expenses.date_expenses) = YEAR(?)
        ORDER BY id DESC`,
        [data.user_id,data.date_expenses,data.date_expenses],

        (err, res) => {
          if (err) {
            console.log("error: ", err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  };

  getTotalExpensesByUserId = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        
        SUM(value_expenses) AS expenses_month_total
         
        FROM expenses WHERE expenses.user_id = ? 
        AND MONTH(expenses.date_expenses) = MONTH(?) 
        AND YEAR(expenses.date_expenses) = YEAR(?)`
        
        ,
        [data.user_id,data.date_expenses,data.date_expenses],

        (err, res) => {
          if (err) {
            console.log("error: ", err);
            return reject(err);
          }
          console.log("post: ", res);
          return resolve(res);
        }
      );
    });
  };

  // FROM expenses WHERE user_id = ? 
  // AND MONTH(date_register) = MONTH("${data.date_register}") AND YEAR(date_register) = YEAR("${data.date_register}")`

  getChannelByDiscordId = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT

        channel_discord_id,
        channel_name,
        system_description,
        temperature

        FROM discord_channel WHERE channel_discord_id = ? `,[id],

        (err, res) => {
          if (err) {
            console.log("error: ", err);
            return reject(err);
          }
          console.log("post: ", res);
          return resolve(res);
        }
      );
    });
  };

  updateChannelbyDiscordId = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      sql.query(
        `UPDATE discord_channel SET ? WHERE channel_discord_id = ?`,
        [data,data.channel_discord_id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            return reject(err);
          }
          console.log("created post: ", {
            res
          });

          return resolve({
            affectedRows:res.affectedRows,
          });
        }
      );
    });
  };

  deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `DELETE FROM users WHERE id = ?`,[id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            return reject(err);
          }
          console.log("post: ", res);
          return resolve(res);
        }
      );
    });
  };


}

export default new userModel();
