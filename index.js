require("dotenv").config();
const app = require('./routes');
// const cors = require('cors');

// app.use(cors())

require('./config/database')

app.listen(process.env.PORT, () => {
  console.log(`Server udah jalan di port ${process.env.PORT}`);
})