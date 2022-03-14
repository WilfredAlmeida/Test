const mongoose = require("mongoose");

module.exports.connect = async () => {
    await mongoose
        .connect(process.env.DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        .then(() => {
        })
        .catch((err) => console.log(err));
}
