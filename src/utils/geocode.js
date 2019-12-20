const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3BhY2V0aHlzIiwiYSI6ImNrNDhscDRhMzA5M2szZm1wZ2Jia3lnc24ifQ.NE48sV9ThEAMnTtcS_h2GA&limit=1`
    request({ url, json: true }, (error, { body }) => {
        const data = body.features
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (data.length === 0) {
            callback('Unable to find Location try another place', undefined)
        } else {
            callback(undefined, {
                latitude: data[0].center[1],
                longitude: data[0].center[0],
                location: data[0].place_name
            })
        }
    })
}

module.exports = geoCode