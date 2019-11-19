const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFtZXMwMDgiLCJhIjoiY2syd3BxMGVnMDM4dDNtcnZoa2c4eHUwZSJ9.xnRwPFkabYqEoBoa16j3dA&limit=1`
    request(url, {json:true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to loc services', undefined)
        } else if (body.features.length < 1) {
            callback('no loc found', undefined)
        } else {
            const data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode