const fs = require('fs')
const pinataSdk = require('@pinata/sdk')
const pinata = pinataSdk('f2e0188887f4b5ae161f', '92ae688fbe61ce9abcf496ffee7efd82b56eeaf9838293b49e25134280f6cc53')

//place your file name here
const filename = 'avatar.jpg'
const readableStream = fs.createReadStream(`./images/${filename}`)

pinata.testAuthentication().then((output) => {
    console.log(output);
}).catch((error) => {
    console.log(error)
})

let fileOptions = {
    pinataMetadata: {
        name: 'avatar.jpg'
    }
}

module.exports = {

    pinataFunction: async function () {
        const pinFile = pinata.pinFileToIPFS(readableStream, fileOptions).then((output) => {
            uri = `https://ipfs.io/ipfs/${output.IpfsHash}?filename=${filename}`
            console.log(uri)
            return uri
        }).catch((error) => {
            console.log(error)
        }).then(async (uri) => {
            //Personalize these variables

            let name = "Raphael"
            let description = "A handsome young man destined for greatness"


            const body = {
                "name": name,
                "description": description,
                "image": uri,
                "attributes": [{
                    "trait_type": "Strength",
                    "value": "100"
                },
                {
                    "trait_type": "Self Control",
                    "value": "100"
                }
                ]
            }
            const jsonFileName = 'avatar.json'

            const jsonOptions = {
                pinataMetadata: {
                    name: `${jsonFileName}`
                }
            }


            const pinJSON = pinata.pinJSONToIPFS(body, jsonOptions).then((output) => {
                uri = `https://ipfs.io/ipfs/${output.IpfsHash}?filename=${jsonFileName}`
                console.log(uri)
                return uri
            })

            return Promise.all([pinJSON]).then((result) => {
                console.log("The result : ", result)
                return result[0]
            })


        })
        return Promise.all([pinFile]).then((result) => {
            console.log("The final result: ", result)
            return result[0]
        })
    }
}
