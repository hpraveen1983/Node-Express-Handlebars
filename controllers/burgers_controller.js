const express = require("express");
const router = express.Router(); // Call an Instance of the express.Router(), apply Routes to it, and then Tell the Application to use those Routes

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

/////////////////////////////////////////////// /* Get Routes */ //////////////////////////////////////////////////////////

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    console.log("Route Path Hit");
    burger.selectAll((data) => {
      handlebarsObject = {
        burger: data
      };
      console.log("Diplayed Burgers");
      res.render("index", handlebarsObject);
    });

});

/////////////////////////////////////////////// /* Post Routes */ //////////////////////////////////////////////////////////

router.post("/api/burger", function(req, res) {
  console.log("burger Route Hit");
  burger.insertOne(["burger_name","devoured"], [req.body["burger_name"], req.body.devoured], (result)=>{
    // Send back the ID of the new quote
    console.log(result);
    res.json(result);
  });
});

router.put("/api/burger/:id", function(req, res) {

  let burgerID = req.params.id
  let condition = "id = " + burgerID ;

  console.log("burger Route Hit. ID is "+ burgerID);
  console.log("Dev is " + req.body.devoured);

  burger.updateOne(["devoured"], [req.body.devoured], condition, (result)=>{
    // Send back the ID of the new quote
    console.log("Executing First Declared CallBack");
    res.json(result);
  });
});


module.exports = router;
