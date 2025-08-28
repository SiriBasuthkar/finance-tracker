// pwd : 1ciVweNUCB0tEQCL

import mongoose from "mongoose";

import express from "express";
import financialRecordsRouter from "./routes/financial-records.ts";
import cors from "cors";


const app: express.Application = express();


const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://siribasuthkar:1ciVweNUCB0tEQCL@financetracker.qjmytmb.mongodb.net/";

mongoose.
connect(mongoURI)
.then(()=> console.log("Connected to mongoDb!"))
.catch((err)=>console.error("Failed to connect to mongoDB:",err));

app.use("/financial-records", financialRecordsRouter);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});