const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const composeObject = {
    message: [],
    title: [],
    url: []
}


app.get('/', (req, res) => {
    res.render('main', { title: composeObject.title, message: composeObject.message, url: composeObject.url });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    let message = req.body.message;
    let title = req.body.title;
    let urlTitle = createUrl(title);
    title= filteredTitle(title);
    composeObject.message.push(message);
    composeObject.title.push(title);
    if(composeObject.url.includes(urlTitle)){
        urlTitle+=Math.floor(Math.random()*1000);
    }
    composeObject.url.push(urlTitle);
    console.log(composeObject.url);
    res.redirect('/');
});

app.get("/blogs/:blogsentry", (req, res) => {
    const requested = req.params.blogsentry;
    let title = "";
    let content = "";
    for (let i = 0; i < composeObject.url.length; i++) {
        if (requested === composeObject.url[i]) {
            title = composeObject.title[i];
            content = composeObject.message[i];
        }
    }

    res.render('blogsentry', { title: title, content: content });
});

app.listen(3000, () => {
    console.log("Server is listening @ Port 3000");
});

function createUrl(text){
    text=text.toLowerCase().trim();
    let regex = /[^a-z]/g
    text=text.replace(regex, "");
    text = text.split(" ").join("-");
    return text;
}

function filteredTitle(text){
    text= text[0].toUpperCase()+text.slice(1,text.length);
    return text;
}