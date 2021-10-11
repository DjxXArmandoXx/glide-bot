# configurar bot
Antes que anda quiero decir que este bot es un bot de prueba, avance bastante así que quise publicarlo, puede tener errores aunque yo, no lo he encontrado ninguno, esta programado en javaScript co nodejs y la libreria [discord.js](https://discord.js.org/).

Para empezar, en la carpeta configs hay un archivo llamado config.example.json, deben borrar la palabra example que quede asi: `config.json`, adentro del archivo en donde dice **token** deben pegar el token de su bot, si buscaron un bot supongo que ya lo tendran creado.

En donde dice `defaultPrefix` pondra el prefix por defecto que tendra el bot (después con el comando `set-prefix` los usuarios podran cambiarlo).

En `mongoPath` deben poner su url de mongodb, para saber como crear uno presiona [aqui](https://www.youtube.com/watch?v=97FfXEy1zas.) (video de fazt).

En `devsId` debes poner las ids de los devs o personas me manejaran el bot, si solo eres tu pon solo la tuya.

En `principalDev` pon la id de la persona principal que manejara el bot, en este caso probablemente la tuya.


Haciendo todo eso ya esta listo para usarse, debes tener instalado [nodejs](https://nodejs.org/es) si o si version 16.1.0 o superior, después de instalarlo y reiniciar tu pc, debes abrir una terminal en tu bot, para hacerlo debes ir a la carpeta donde esta el proyecto y en la parte de arriba escribir **cmd**,
así:

![ejemplo](https://cdn.discordapp.com/attachments/854112747536515124/891753525959331910/unknown.png)

después apreta la tecla **enter** y debe abrirse una terminal, dentro escribe: npm install, espera a que termina y escribe: "`node .`" espera que inicie y deberia mostrar esto:

![inicio](https://cdn.discordapp.com/attachments/854112747536515124/891753373110517760/unknown.png)

en bot ready dira el nombre de tu bot.

Listo! ya puedes empezar a usar el bot y disfrutarlo