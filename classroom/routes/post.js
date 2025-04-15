const express = require("express");
const router = express(); 

//post
router.get("/", (req,res)=>{
    res.send("Get for posts");
});

router.get("/:id", (req,res)=>{
    res.send("Get for posts id");
})

router.post("/",(req,res)=>{
    res.send("POST for posts");
});

router.delete("/:id", (res,req)=>{
    res.send("delete for post id");
});

module.exports = router;
