Udemy course by Maximilian Schwarzmüller


// File system
core modules
1. http - help to launch server, send requests
2. https - Launch a SSL server (data will be encryted)
3. fs
4. path
5. os

// Event cycle
`process.exit()` -> will help to close the server
or `ctrl + C`

// Stream and Buffer

// Start working on data early
Stream => req body part1 => req body part2 => req body part3 => Fully parsed

// Blocking and Non-blocking
fs.writeFileSync => this will stop the process untile the file is created. // block the next line of code

// this will not block the code of execution (async nature)
fs.writeFile('message.txt', data, (err) => { 
    if (err) {

    }
})


// Single Thread, Event loop and Blocking
1. Nodejs using only on single thread(Single JS thread).
2. Event loop will once our code start running. (Handle even callbacks)
3. `Worker Pool` is for heavy work. (Different thread) for ex. heavy file write. once the worker pool finished their there callback will we trigger by event loop.