/**
 * General Reposne Function
 * @param {*} req Express Request Object
 * @param {*} res Express Response Object
 */
exports.response = (req, res) => {
  const httpCode = res.locals.error ? 400 : 200;
  res.status(httpCode).send({
    code: httpCode,
    data: res.locals.data,
    error:{
      message:res.locals.error?.message,
      details:res.locals.error
    } ,
    
  });
};

