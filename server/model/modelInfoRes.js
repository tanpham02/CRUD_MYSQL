const MySQL = require('mysql')
const dotEnv = require('dotenv')

dotEnv.config()

const connection = MySQL.createConnection({ 
      host: process.env.DB_Host,
      user: process.env.DB_UserName,
      database: process.env.DB_DatabaseName,
      password: process.env.DB_Password,
      multipleStatements: true
})

const connectDB = async () =>{
  const Conn = await connection.connect( (err) => {
   if (err) {
    console.log(err)
    return
  } 
   console.log('Connected DB success!')
  })
  return Conn
}



module.exports = {connection, connectDB}
