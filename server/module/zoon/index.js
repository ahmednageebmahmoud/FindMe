exports.router = (router) => {
  require("./router")(router);
};

exports.models = {
  zoon: require("./model")
};
