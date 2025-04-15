const express = require("express");
const router = express();


//users
router.get("/", (req,res)=>{
    res.send("Get for users");
});

router.get("/:id", (req,res)=>{
    res.send("Get for users id");
})

router.post("/",(req,res)=>{
    res.send("POST for users");
});

router.delete("/:id", (res,req)=>{
    res.send("delete for user id");
});

module.exports = router;