import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const API_KEY = '2fa9cd04ef215e599f6fcd22ba5644a2';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {result: "API RESPONSE"});
});

app.post("/getWeatherUpdate", async(req, res) => {
    try {
        const loc = req.body.location;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${API_KEY}`);
        
        const result = {
            weather: {
                main: response.data.weather[0].main,
                description: response.data.weather[0].description
            },
            main: {
                temp: response.data.main.temp,
                humidity: response.data.main.humidity
            },
            wind: {
                speed: response.data.wind.speed
            }
        };

        console.log(result);
        res.render("index.ejs", { result: result });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }

});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});