import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import blogRouter from './routes/blog.route.js';
import agentRouter from './routes/agent.route.js'

// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
    }
    ).catch(err => {
    console.error('Error connecting to mongo', err);
    }
    );
// const __dirname = path.resolve();
const app = express();
app.use(cors());

app.use(express.json())
// app.use(cookieParser())

//display the text on the screen
app.listen(8000, () => {
  console.log('Server listening on port 8000!');
}
)

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/blog', blogRouter)
app.use('/api/agent', agentRouter)


// app.use(express.static(path.join(__dirname, '/client/dist')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// })

// //create the middleware function

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error'; 
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     })
// })