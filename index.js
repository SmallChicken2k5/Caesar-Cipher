const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const moment = require('moment')
require('dotenv').config();

// database
// const database = require('./config/database')
// database.connect();

// Route
const route = require(`./routers/client/index.route`)
// const adminRoute = require(`./routers/admin/index.route`)

// const systemConfig = require('./config/system');



// MAIN
const app = express();
app.use(methodOverride('_method'))
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/public`))
// set view engine PUG
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')

//Flash message
app.use(cookieParser('afasdhgwerw'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash message

// App local variables
app.locals.moment = moment;
// app.locals.prefixAdmin = systemConfig.prefixAdmin;
// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

route(app);
// adminRoute(app);

app.use((req, res) => {
    res.status(404).render('client/pages/errors/404', {
        title: 'Trang không tồn tại'
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});