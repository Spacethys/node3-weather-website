const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/80043abf839f5a1bd9e5f049d0f34489/${latitude},${longitude}?units=si`
    request({ url, json: true }, (error, { body }) => {
        const dailyData = body.daily
        const currrentData = body.currently
        if (error) {
            callback('Unable to reach wether service', undefined)
        } else if (body.error) {
            callback('Unable to find location please try another location on retype', undefined)
        } else {
            callback(undefined, `${dailyData.data[0].summary} It is currently ${currrentData.temperature} degrees out. Today's Temparature has a daily high of ${dailyData.data[0].temperatureHigh} degrees and a daily low of ${dailyData.data[0].temperatureLow} degrees. There is a ${currrentData.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast