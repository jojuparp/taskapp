const oracledb = require('oracledb');
const dbconfig = require('./dbconfig')

async function run() {
  let pool;

  //oracledb.autoCommit = true;

  try {
    pool = await oracledb.createPool(dbconfig);

    let connection;
    try {
      connection = await pool.getConnection();
      const sql = `select * from task`
      result = await connection.execute(sql, [], { autoCommit: true });
      
      console.log("Result is:", result);
    } catch (err) {
      throw (err);
    } finally {
      if (connection) {
        try {
          await connection.close(); // Put the connection back in the pool
        } catch (err) {
          throw (err);
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    await pool.close();
  }
}

run();