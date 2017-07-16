const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'client/build')));
const port = process.env.PORT || 3001

const router = require('./routes')

app.use('/api', router)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`)   
})
