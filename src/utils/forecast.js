const request = require('request')




const forecast = (position, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c078a043875704cbbdf7dabb15760b7a&query='+encodeURIComponent(position)

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to foracst server', undefined)
        }
        else if (body.error) {
            callback('response.body.error', undefined)
        }
        else {
            callback(undefined, {
                Location : body.location.name,
                temperature: body.current.temperature,
                Description: body.current.weather_descriptions[0]
            })

        }

    })


}

module.exports = forecast