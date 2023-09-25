import sql from "./db.js";
import colors from 'colors/safe.js';
class userModel {

  insertManager = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO manager SET ?",
        data,
        (err, res) => {
          if (err) {
            return reject(err);
          }
          console.log("created post: ", {
            id: res.insertId
          });

          return resolve({
            id: res.insertId,
            ...data,
          });
        }
      );
    });
  };

  getManagerByUserId = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        id,
        user_id
        FROM manager WHERE user_id = ? `,[id],

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

  deleteManagerByUserId = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `DELETE FROM manager WHERE user_id = ?`,
        [id],
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

  //   return new Promise((resolve, reject) => {
  //     sql.query(
  //       `INSERT INTO user_account SET reg_date = ?, phone = ?`,
  //       [new Date(),phone],
  //       (err, res) => {
  //         if (err) {
  //           console.log("error: ", err);
  //           return reject(err);
  //         }
  //         console.log("created post: ", {
  //           id: res.insertId,
      
  //         });

  //         return resolve({
  //           id: res.insertId,
     
  //         });
  //       }
  //     );
  //   });
  // };

}

export default new userModel();
