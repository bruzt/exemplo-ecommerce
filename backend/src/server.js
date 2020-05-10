
const app = require('./app');

app.listen(process.env.PORT || 3001, () => {
    console.log(`server running on port ${process.env.PORT || 3001}`)
});

module.exports = app;