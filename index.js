const app = require('./app');
const { ErrorMiddleware } = require("./middlewares");
const  mongoose = require('mongoose');
app.use(ErrorMiddleware);

const { MONGO_URI, PORT, APPLICATION_NAME } = require('./config');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`${APPLICATION_NAME} is running on localhost:`, PORT);
    });
}).catch(err => {
    {
        console.log(err);
    }
}) ;
