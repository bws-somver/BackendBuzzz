const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(cors());

// Read SSL certificate files
const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
const certificate = fs.readFileSync('./certs/server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const userRoutes = require('./src/User/Routes/RegisterUserRoutes');
const CommonApiRoutes=require('./src/User/Routes/CommonApiRounter');
const ProfilePostRoutes=require('./src/User/Routes/ProfilePostRouter');
const PostLikeRoutes= require ('./src/User/Routes/PostLikeRouter');
const PostCommentRoutes = require ('./src/User/Routes/PostCommentRouter');
const BarRouter = require ('./src/User/Routes/BarRouter');
const CheckInRouter = require('./src/User/Routes/CheckInRouter');
const otpRoutes = require ('../BackendBuzzz/src/User/Routes/OTPRouter')

app.use(express.json());
app.use('/users', userRoutes);
app.use('/CommonApi',CommonApiRoutes);
app.use('/ProfilePost',ProfilePostRoutes);
app.use('/PostLike',PostLikeRoutes);
app.use('/PostComment',PostCommentRoutes);
app.use('/Bar',BarRouter);
app.use('/CheckIn',CheckInRouter);
app.use('/otp', otpRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HTTP server
// app.listen(process.env.PORT||4006, () => {
//   console.log('DataBase is connected succesfully and Server is running on port 4006');
// });


// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} over HTTPS`);
});