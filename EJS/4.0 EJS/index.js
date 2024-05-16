import express from "express";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

let weekdayOrWeekend;
let content;

function checkWeekdayOrWeekend() {
     var date = new Date();
     var day = date.getDay();

     if(1 <= day <= 5){
          weekdayOrWeekend = "a weekday";
          content = "work hard";
     }else{
          weekdayOrWeekend = "the weekend";
          content = "have fun";
     }
}

app.get('/', (req, res) => {
     checkWeekdayOrWeekend();
     res.render('index.ejs', {weekdayOrWeekend: weekdayOrWeekend, content: content});
});

app.listen(port, () => {
     console.log(`Port is listen on ${port}`);
});