/*MODULO DONDE REALIZO LA GESTION DE ENVIO DE EMAIL  
EN EL CUAL EL REMITENTE DEBE INGRESAR SU EMAIL Y CONTRASEÑA*/
var nodemailer = require('nodemailer');
var querystring = require('querystring');

function cargarMsj(pedido, respuesta) {
    var info = '';
    pedido.on('data', function (datosparciales) {
        console.log("DATOS PARCIALES", datosparciales);
        info += datosparciales;
        console.log("INFO", info);
    });
    pedido.on('end', function () {
        var valor = querystring.parse(info);

        console.log("valor", valor);
        console.log("***************************DENTRO DE CARGAR MAIL ***********************************+")
        console.log("MAIL: ", valor['correo']);
        console.log("ASUNTO: ", valor['asunto']);
        console.log("MENSAJE: ", valor['mensaje']);
        enviarMail(pedido, respuesta, valor);
    });
}


function enviarMail(pedido, respuesta, valor) {
    console.log("***************************DENTRO DE ENVIAR MAIL ***********************************+")
    console.log("MAIL: ", valor['correo']);
    console.log("ASUNTO: ", valor['asunto']);
    console.log("MENSAJE: ", valor['mensaje']);


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: valor['correo'],
            pass: valor['contraseña']
        }
    });
    var mailOptions = {
        from: valor['correo'],
        to: valor['correoDestinatario'],
        subject: valor['asunto'],
        text: valor['mensaje'],

    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("¡ERROR!", error);
            respuesta.writeHead(500, { 'Content-Type': 'text/html' });
            respuesta.write('<!doctype html><html><head></head><body>' +
                'Verifique que los datos ingresados sean correctos o que si su correo electronico permite el acceso de aplicaciones poco seguras' +
                '<br><a href="index.html">Retornar</a>' +
                '</body></html>');
            respuesta.end();
        }
        else
            console.log("Mensaje enviado exitosamente", info);

        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        respuesta.write('<!doctype html><html><head></head><body>' +
            '<h4>MENSAJE ENVIADO EXITOSAMENTE!</h4><p>Su mensaje ha sido enviado correctamente.</p>' +
            '<a href="index.html">RETORNAR</a>' +
            '</body></html>');
        respuesta.end();

    });

}

exports.cargarMsj = cargarMsj;
