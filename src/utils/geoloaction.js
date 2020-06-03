
const request = require('request')

const geolocation = (address, callback) => {
    const geoapiURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmF2aXNhaGF5IiwiYSI6ImNrYXE0dnQ2aTA1azUyc3ByZWcwZnR1bXEifQ.yaY0JUuUnQjX_j-3tmqhdA&limit=1'
    request({ url: geoapiURL, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Geo Location', undefined)
        }
        else if (body.features.length == 0) {
            callback('Location Not Found, Please search for another Location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                loction: body.features[0].place_name
            })
        }
    })
}

module.exports =geolocation