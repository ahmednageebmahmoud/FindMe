const mongoose = require("mongoose");

const MONGOOSE_RECONNECT_MS = 1000;
const mongoUrl = process.env.MONGO_URI;

function reconnect() {
  return new Promise(async (resolve) => {
    try {
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      resolve();
    } catch (err) {
      console.error(err);
      console.info(`attempting to reconnect in (${MONGOOSE_RECONNECT_MS}) ms`);
      setTimeout(() => {
        resolve(reconnect());
      }, MONGOOSE_RECONNECT_MS);
    }
  });
}
module.exports = async () => {
  mongoose.connection.on("connected", () => {
    console.info(`mongoose connection open to ${mongoUrl}`);
  });

  mongoose.connection.on("error", console.error);

  mongoose.connection.on("disconnected", () =>
    console.info("mongoose disconnected")
  );

  await reconnect();
  return mongoose;
};
