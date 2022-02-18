const Joi = require("joi");

/**
 * Create A New Zoon
 * @param {*} req Express Request Object
 * @param {*} res Express Response Object
 * @param {*} next Express Next Funxtion
 */
exports.create = async (req, res, next) => {
  try {
    const validate = Joi.object()
      .keys({
        name: Joi.string().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
      })
      .validate(req.body);
    if (validate.error) {
      res.locals.error = validate.error;
      return next();
    }

    //Insert Now
    const newZoon = new DB.zoon({
      name: validate.value.name,
      location: {
        type: "Point",
        coordinates: [validate.value.longitude, validate.value.latitude],
      },
    });
    await newZoon.save();

    res.locals.data = newZoon;
  } catch (error) {
    res.locals.error = error;
  }
  next();
};

/**
 * Update Zoon
 * @param {*} req Express Request Object
 * @param {*} res Express Response Object
 * @param {*} next Express Next Funxtion
 */
exports.update = async (req, res, next) => {
  try {
    const validate = Joi.object()
      .keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
      })
      .validate(req.body);
    if (validate.error) {
      res.locals.error = validate.error;
      return next();
    }

    //Update Now
    const zoon = await DB.zoon.findOne({ _id: validate.value.id });
    if (!zoon) {
      throw new Error("Zoon is Not Found");
    }

    Object.assign(zoon, {
      name: validate.value.name,
      location: {
        coordinates: [validate.value.longitude, validate.value.latitude],
      },
    });
    await zoon.save();

    res.locals.data = zoon;
  } catch (error) {
    res.locals.error = error;
  }
  next();
};

/**
 * Delete Zoon
 * @param {*} req Express Request Object
 * @param {*} res Express Response Object
 * @param {*} next Express Next Funxtion
 */
exports.delete = async (req, res, next) => {
  try {
    const validate = Joi.object()
      .keys({
        id: Joi.string().required(),
      })
      .validate(req.body);
    if (validate.error) {
      res.locals.error = validate.error;
      return next();
    }

    //Update Now
    const zoon = await DB.zoon.findOne({ _id: validate.value.id });
    if (!zoon) {
      throw new Error("Zoon is Not Found");
    }
    await zoon.delete();
  } catch (error) {
    res.locals.error = error;
  }
  next();
};

/**
 * Finde Nearer Zoon To User By Coordinates And In 1 Metter
 * @param {*} req Express Request Object
 * @param {*} res Express Response Object
 * @param {*} next Express Next Funxtion
 */
exports.find = async (req, res, next) => {
  try {
    const result = await DB.zoon.find().where({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [req.query.longitude, req.query.latitude],
          },
          $maxDistance: 1, //One Metter
        },
      },
    });

    
    res.locals.data = result;
  } catch (error) {
    res.locals.error = error;
  }
  next();
};
