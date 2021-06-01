const express = require('express');
const morgan = require('morgan');

const userRouter = require("./routes/userRoutes");
const teamRouter = require("./routes/teamRoutes");


const app = express();



if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log("Hello from the middleware!!!!");
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamRouter);

module.exports = app;


