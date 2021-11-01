const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f1dfb4bdc8691216117a6072da5fb4f2&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json:true}, (error, {body} = {}) => {   
        if (error) {
            callback(error)
        } else if (body.error) {
            callback('Could not find location, try different coordinates!')
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast
