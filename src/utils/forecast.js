const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1"

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect to weather services', undefined)
        }

        else if(body.list[0].length === 0){
            callback('Unable to find weather. Try another search', undefined)
        }

        else {
            callback(undefined,{
                temp: body.list[0].main.temp,
                location: body.city.name
            })
        }
    })
}

module.exports = forecast