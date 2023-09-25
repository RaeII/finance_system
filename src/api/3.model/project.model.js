import sql from "./db.js";
import colors from 'colors/safe.js';
class projectModel {
  
  create = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO project SET ?",
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

  getProjectById = (id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        *
        FROM project WHERE id = ? `,[id],

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

  getProjects = () => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT
        *
        FROM project`,
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

  getProjectsManager = () => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT mrp.project_id AS mrp_project_id,
        project.contract_number,
        project.contract_name,
        project.client_name,
        project.description,
        project.status,
        project.initial_date,
        project.estimated_completion_date,
        project.conclusion_date,
        project.date_register,
        project.created_by_user_id
        FROM manager 
      INNER JOIN managers_responsibles_project AS mrp ON (mrp.manager_id = manager.id)
      INNER JOIN project ON (project.id = mrp.project_id)
      WHERE manager.user_id  = 42,`,
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

  addManagerProject = (data) => {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT managers_responsibles_project SET ?",
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

  getReponsibleByUserAndProjectId = (data) => {
    console.log('Date user',data)
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT 
        manager.id AS id_manager,
        mrp.project_id AS project_id
               FROM manager
               INNER JOIN managers_responsibles_project AS mrp ON (mrp.manager_id = manager.id and mrp.project_id = ?)
               WHERE manager.user_id = ?`,
        [data.project_id, data.user_id],
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

  updateProjectbyId = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      sql.query(
        `UPDATE project SET ? WHERE id = ?`,
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

export default new projectModel();
