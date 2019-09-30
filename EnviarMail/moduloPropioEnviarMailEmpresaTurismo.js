/*MODULO PARA FORMULARIO DE CONTACTO PARA UNA EMPRESA - 
DONDE LOS PARAMETROS DEL EMISOR Y RECEPTOR DEL ENVIO NO SE ASIGNAN EN BASE A LOS DATOS INGRESADOS EN EL FORMULARIO.
EJ: AGENCIA DE TURISMO
    En el formulario de contacto de una agencia de turismo como parametro de envio y recepcion pongo el mismo 
    mail de la empresa, ya que al ingresar a la pagina de la misma, 
    un usuario realiza una consulta y deja su email para que la empresa posteriormente lo contacte.
*/

var nodemailer = require('nodemailer');
var querystring = require('querystring');

function cargarMsj(pedido,respuesta) {
    var info = '';
    pedido.on('data', function(datosparciales){
        console.log("DATOS PARCIALES", datosparciales);
         info += datosparciales;
         console.log("INFO", info);
    });
    pedido.on('end', function(){
        var valor = querystring.parse(info);
        
        console.log("valor", valor);
        console.log("***************************DENTRO DE CARGAR MAIL ***********************************+")
        console.log("MAIL: " , valor['correo']);
        console.log("ASUNTO: " , valor['asunto']);
        console.log("MENSAJE: " , valor['mensaje']);
        enviarMail(pedido, respuesta, valor); 
    });	
}


function enviarMail(pedido, respuesta, valor) {
    console.log("***************************DENTRO DE ENVIAR MAIL ***********************************+")
    console.log("MAIL: " , valor['correo']);
    console.log("ASUNTO: " , valor['asunto']);
    console.log("MENSAJE: " , valor['mensaje']);


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'de.prueba.contacto@gmail.com',
            pass: 'pruebacontacto'
        }
    });
    var mailOptions = {
        from: 'de.prueba.contacto@gmail.com',
        to:'de.prueba.contacto@gmail.com',
        subject : valor['asunto'] , 
        text : valor['mensaje'],
        //html: "<b>Mensaje: </b><br><p>"+ valor['mensaje'] + "</p><br>" + "<b>Remitente: </b><br><p>Nombre y Apellido: " + valor['nombre'] + "<br><b>Correo de contacto: </b>" + valor['correo'] 
        html: valor['mensaje'] + "<br><br><p>Mensaje enviado por: " + valor['nombre'] + " " + valor['apellido'] + "</p><p>Correo de contacto: " + valor['correo'] +"</p>"

    }
    
    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
          console.log("¡ERROR!", error);
          respuesta.writeHead(500, {'Content-Type': 'text/html'});
          respuesta.write('<!doctype html><html><head></head><body>'+
                        'Verifique que los datos ingresados sean correctos o que si su correo electronico permite el acceso de aplicaciones poco seguras'+
                        '<br><a href="index.html">Retornar</a>'+
                        '</body></html>');		
          respuesta.end();
        }
        else
          console.log("Mensaje enviado exitosamente" , info);
          
          respuesta.writeHead(200, {'Content-Type': 'text/html'});
          respuesta.write('<!doctype html><html><head></head><body>'+
                            'Mensaje enviado exitosamente!'+'<br>'+
                            '<a href="index.html">Retornar</a>'+
                            '</body></html>');		
          respuesta.end();
    
   });
    
    }

    exports.cargarMsj = cargarMsj;
