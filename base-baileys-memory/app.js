const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { Client } = require('pg')
const path = require('path')


const flujoMenu= addKeyword("4")
    .addAnswer("Referente a costos por favor comunicarse con colecturía marcando al número https://wa.link/kdi1hc")
    .addAnswer("digita *0* para el menu", {
        delay: 1500
    })
 
const flujoModalidad = addKeyword("2")
    .addAnswer('*Educación Básica Superior* (8vo a 10mo grados) para personas con escolaridad inconclusa (PCEI) modalidad a distancia.')
    .addAnswer('*Bachillerato en Ciencias* (1°, 2° y 3°) para personas con escolaridad inconclusa (PCEI) modalidad a distancia…')
    .addAnswer("digita *0* para el menu",{
        delay:1500
    })
   
const flujoTiempo = addKeyword("3")
    .addAnswer("*Modalidad Presencial* \nPara la modalidad presencial los estudiantes deben acudir a la institución en el horario establecido de 07:10  13:10 de lunes a viernes ")
    .addAnswer("*Modalidad a Distancia* \n La modalidad a Distancia Virtual se realiza por medio de la plataforma y/o fichas académicas. \n Dar pruebas de los años correspondientes, por medio de la plataforma virtual. \n Al finalizar el proceso debe realizar la prueba o proyecto de grado el cual le acredita para ser bachiller (se realizan a finales del mes de junio)")
    .addAnswer("digita *0* para el menu", {
        delay: 1500
    })

const flujoInformacion = addKeyword("1")
    .addAnswer("Usted se ha comunicado con el Colegio de Bachillerato Particular Dr. Jose María Vivar Castro, con 19 años al servicio de la sociedad Lojana, ecuatoriana y fuera del país.")
    .addAnswer("digita *0* para el menu", {
        delay: 1500
    })

const flujoTikTok = addKeyword("6")
    .addAnswer("*Echa un vistazo:* *TikTok*\n\t")
    .addAnswer("digita *0* para el menu", {
        delay: 1500
    })

const FlujoContabilidad = addKeyword("5")
    .addAnswer('Información exclusiva en secretaria del plantel marcando al número https://walink.co/c5ad39')
    .addAnswer("digita *0* para el menu", {
        delay: 1500
    })

const flujoSalir = addKeyword("7")
    .addAnswer("Gracias por contactarte con *José Maria Viviar Castro* estamos para servirte. 😊",
    null, async(ctx, {endFlow}) =>{
        return endFlow({ body: "*¡Hasta pronto!* 👋"})
    })

const flujoSecundario = addKeyword("[^1-7]")
    .addAnswer("Numero Invalido, ingrese un numero del *1* al *7*")

const flujoInicio = addKeyword(EVENTS.WELCOME
    )
    .addAnswer('\t*¡Bienvenid@!* 👋\nHola soy *J*, el asistente virtual del colegio José María Vivar Castro \nSelecione una opción si necesita información academica:\n\t*1*- Información institucional 😎\n\t*2*- Requisitos de Matricula ✅\n\t*3*- Formas de Estudio \n\t*4* - Costos\n\t*5* - Información Exclusiva 👨‍💻 \n\t*6* - Nuestras Redes 📱\n\t*7* - Salir 👋', {
    }, 
    null, 
    [flujoInformacion, flujoMenu, flujoModalidad, flujoTiempo, flujoTikTok, flujoSalir, FlujoContabilidad, flujoSecundario])
  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoInicio])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()

    setTimeout(() => {
        addAnswer("Cerrando el chatbot automáticamente...")
        process.endFlow(0)
    }, 10 * 60 * 1000)
  

}

main()