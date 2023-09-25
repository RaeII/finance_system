import sql from "./db.js";
import colors from 'colors/safe.js';
class userModel {
  
  create = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO discord_server SET ?",
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

  getServerByDiscordId = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT

        id,
        discord_id,
        name

        FROM discord_server WHERE discord_id = ? `,[id],

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

  getServerIdByDiscordId = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        id
        FROM discord_server WHERE discord_id = ? `,[id],
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

  getUsers = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        *
        FROM users`,

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

  getUserByEmailOrUserName = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        *
        FROM users WHERE email = ? OR user_name = ?`,
        [data.email,data.user_name],

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

  getUsersFilter = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        ${data}
        FROM users`,

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

  updateUserbyId = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      sql.query(
        `UPDATE users SET ? WHERE id = ?`,
        [data,data.id],
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
