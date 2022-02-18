const Schema = require("mongoose").Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      }, //Like [Longitude,Latitude]
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

schema.index({ location: "2dsphere" });

module.exports = schema;
