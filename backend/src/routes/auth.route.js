import express from "express";

const router=express.Router();

router.post("/login",(req,res)=>{
    res.send("logged in successfully")
})

router.post("/logout",(req,res)=>{
    res.send("logged in successfully")
})

router.post("/signup",(req,res)=>{
    res.send("logged in successfully")
})


export default router;
