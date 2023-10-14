const router = require("express").Router();

router.get("/", async(req, res) => {
 
    res.clearCookie("jwt");
    res.send(200);
  });

module.exports=router;