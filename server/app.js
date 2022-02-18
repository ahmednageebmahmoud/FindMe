require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser')


server.use(bodyParser.json())
server.get('/',(req,res)=>{
  res.send('Hello World')
})


/**
 * Load Module
 * @param {{services:any,router:Function,core:Function,models:any}} module
 */
function loadModule(module) {
  //Excute Core
  if (module.core) {
    module.core();
  }

  //Load Router
  if (module.router) {
    module.router(server);
  }

  //Load Service -- Appedn All Service In The Global Object
  if (module.services) {
    Object.keys(module.services).forEach((key) => {
      global[key] = module.services[key];
    });
  }

  //Load Models -- Appedn All Models To Mongoes
  if (module.models) {
    Object.keys(module.models).forEach((modelName) => {
      global["DB"] = global["DB"] || {};
      global["DB"][modelName] =    mongoose.model(modelName, module.models[modelName]);
    });
  }
}

// Load Modules
loadModule(require("./service/index"));
loadModule(require("./module/zoon/index"));

/**
 * Start The Server
 */
exports.startServer = () => {
  server.listen(process.env.PORT, () => {
    console.log(`Server Is Started On http://localhost:${process.env.PORT}`);
  });
};
