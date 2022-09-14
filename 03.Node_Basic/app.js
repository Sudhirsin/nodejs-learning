const http = require('http');
const fs = require('fs');

const routes = require('./route');
 
// function requestListener (req, res) {
//     console.log('chek')
// }

const server = http.createServer(routes
    // (req, res) => {
    // console.log('Hello');
    // console.log(req.url, req.method, req.headers)

    // const url = req.url;
    // const method = req.method
    // console.log(url)

    // if (url === '/') {
    //     res.setHeader('Content-Type', 'text/html');
    //     res.write(`<html>`)
    //     res.write(`<head><title>Enter Message</title></heade>`) // will work in chunk
    //     res.write(`<body>
    //         <form action="/message" method="POST">
    //             <input type="text" name="message" />
    //             <button type="submit">Send</button>
    //         </form>
    //     </body>`) // will work in chunk
    //     res.write(`</html>`)
    //     return res.end()
    // }

    // if (url === '/message' && method === 'POST') {
    //     const reqBody = [];
    //     req.on('data', (chunk) => {
    //         reqBody.push(chunk)
    //     }) // allow to listen some event

    //     req.on('end', () => {
    //         const parsedBody = Buffer.concat(reqBody).toString();
    //         console.log(parsedBody)
    //         const message = parsedBody.split('=')[1]
    //         // fs.writeFileSync('message.text', message)
    //         fs.writeFile('message.txt', message, (err) => {
    //             if (err) {
                    
    //             }
    //         })
    //         res.statusCode = 302
    //         res.setHeader('Location', '/')
    //         return res.end()
    //     })
    // }


    // // sending the response
    // res.setHeader('Content-Type', 'text/html');
    // res.write(`<html>`) // will work in chunk
    // res.write(`<head><title>Checking</title></heade>`) // will work in chunk
    // res.write(`<body><h1>Hello World!</h1></body>`) // will work in chunk
    // res.write(`</html>`)
    // res.end()

    // process.exit()
// }
);

server.listen(5000)

