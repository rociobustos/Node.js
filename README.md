# Node.js
La carpeta EnviarMail contiene un proyecto a través del cual se procede a diseñar un servidor NodeJS que pueda servir un sitio con 5 secciones:
- 3 de ellas serán estáticas
- Otra sección es un formulario de contacto para una empresa de turismo, donde los parametros del emisor y receptor del envio no se asignan en base a los datos ingresados en el formulario, por ejemplo: 
    En el formulario de contacto de una agencia de turismo como parametro de envio y recepcion pongo el mismo mail de la empresa, ya que       al ingresar a la pagina de la misma, un usuario realiza una consulta y deja su email para que la empresa posteriormente lo contacte.
- Y la última es un formulario de contacto a través del cual se realiza el envío de mail, donde el remitente debe ingresar su email y contraseña, el mensaje y a quien va dirigido.

Estos envíos de mail se hacen utilizando el paquete nodemailer.js.
