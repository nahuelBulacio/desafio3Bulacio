import http from 'http';

const server = http.createServer((request, response) => {
    response.end("Hola Mundo desde backend");
});

server.listen(8080,() => {
    console.log("Estamos en línea en el puerto 8080")
});