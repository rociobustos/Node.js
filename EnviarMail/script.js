var http = require('http');
var url = require('url');
var fs = require('fs');

//A CONTINUACIÓN INCORPORO EL MODULO DONDE REALIZO LA GESTION DE ENVIO DE EMAIL PARA UNA EMPRESA
var enviarMailEmpresaTurismo = require('./moduloPropioEnviarMailEmpresaTurismo'); 
/*A CONTINUACIÓN INCORPORO EL MODULO DONDE REALIZO LA GESTION DE ENVIO DE EMAIL  
DONDE EL REMITENTE DEBE INGRESAR SU EMAIL Y CONTRASEÑA */
var enviarMail = require('./moduloPropioEnviarMail'); 


var mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  :	'audio/mpeg3',
    'mp4'  : 'video/mp4'
 };

var servidor = http.createServer(function (pedido, respuesta) {
    var objetourl = url.parse(pedido.url);
    var camino = 'static' + objetourl.pathname;
    if (camino == 'static/')
        camino = 'static/index.html';
    encaminar(pedido, respuesta, camino);
});

servidor.listen(8888);

function encaminar(pedido, respuesta, camino) {

    switch (camino) {
        case 'static/cargarEmpresa': {
            enviarMailEmpresaTurismo.cargarMsj(pedido, respuesta);
            break;
        }

        case 'static/cargarContacto': {
            enviarMail.cargarMsj(pedido, respuesta);
            break;
        }

        default: {
            fs.exists(camino, function (existe) {
                if (existe) {
                    fs.readFile(camino, function (error, contenido) {
                        if (error) {
                            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                            respuesta.write('Error interno');
                            respuesta.end();
                        } else {
                            var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
                        }
                    });
                } else {
                    respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                    respuesta.write('<!doctype html><html><head></head><body><p>Recurso inexistente</p><a href="index.html">Retornar</a></body></html>');
                    respuesta.end();
                }
            });
        }
    }
}

console.log('Servidor web iniciado');