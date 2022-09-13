const fs = require('fs');

function reqHandler (req, res) {
    const url = req.url
    const method = req.mthod
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<html>`)
        res.write(`<head><title>Enter Message</title></heade>`) // will work in chunk
        res.write(`<body>
            <form action="/message" method="POST">
                <input type="text" name="message" />
                <button type="submit">Send</button>
            </form>
        </body>`) // will work in chunk
        res.write(`</html>`)
        return res.end()
    }
    
    if (url === '/message' && method === 'POST') {
        const reqBody = [];
        req.on('data', (chunk) => {
            reqBody.push(chunk)
        }) // allow to listen some event
    
        req.on('end', () => {
            const parsedBody = Buffer.concat(reqBody).toString();
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            // fs.writeFileSync('message.text', message)
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    
                }
            })
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        })
    }

    // sending the response
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>`) // will work in chunk
    res.write(`<head><title>Checking</title></heade>`) // will work in chunk
    res.write(`<body><h1>Hello World!</h1></body>`) // will work in chunk
    res.write(`</html>`)
    res.end()
}

module.exports = reqHandler;

// 1st way
// module.exports = { handler: reqHandler, someText: 'someText' };

// 2
// module.exports.handler = reqHandler;

// 3. 
// exports.handler = reqHandler;
// exports.someText = 'Some TExt'