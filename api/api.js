const express = require('express')

const app = express()
const port = process.ENV.PORT || 3001

const router = require('./routes')

app.use('/api', router)

app.listen(port, () => {
   console.log(`Server is running on port ${port}`)   
})