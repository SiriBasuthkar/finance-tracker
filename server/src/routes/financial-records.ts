import express from "express";
import type { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record.ts";

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; 
    const records = await FinancialRecordModel.find({ userId });

    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }

    return res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    return res.status(500).send("Server error.");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    
    const newRecordBody =req.body;
    const newRecord =new FinancialRecordModel(newRecordBody);
    const savedRecord=await newRecord.save();

    return res.status(200).json(savedRecord);
  }
   catch (err) {
    console.error("Error fetching records:", err);
     res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id=req.params.id;
    const newRecordBody =req.body;
    const record =await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      {new : true}
    );
    if(!record) return res.status(404).send();
    

    return res.status(200).json(record);
  }
   catch (err) {
    console.error("Error fetching records:", err);
     res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id=req.params.id;
    const record =await FinancialRecordModel.findByIdAndDelete(id);
    if(!record) return res.status(404).send();
    return res.status(200).json(record);
  }
   catch (err) {
    console.error("Error fetching records:", err);
     res.status(500).send(err);
  }
});

export default router;
