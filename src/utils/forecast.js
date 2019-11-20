const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/fdea7a7b5b170bf2526a6abe04ca8c4b/${latitude},${longitude}`
    const qs = {units: 'si'}

    request.get({url, qs, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service');
        } else if (body.error) {
            callback('unable to find location');
        } else {
            const currently = body.currently
            callback(undefined, `It is currently ${currently.temperature} degrees out, daily high is ${body.daily.data[0].temperatureHigh} and daily low is ${body.daily.data[0].temperatureLow}`)
        }
    })
}

module.exports = forecast