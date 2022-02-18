const cont=require('./controller')
module.exports = (router) => {
  router.get("/api/zoon",cont.find, middleware.response);
  router.post("/api/zoon",cont.create, middleware.response);
  router.put("/api/zoon",cont.update, middleware.response);
  router.delete("/api/zoon",cont.delete, middleware.response);
};


