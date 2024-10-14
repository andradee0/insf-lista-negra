import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import adicionarRotas from './rotas.js'


const servidor = express();
servidor.use(cors());
servidor.use(express.json());
servidor.get('/status', (req, resp) => {
    
    let text = 'oii'
    let chavePriv = 'Andrade'

    let textCriptografado = crypto.AES.encrypt(text, chavePriv).toString()

    let textEncriptado = 'U2FsdGVkX1+eEF/VRhTxlY+m/bdI3aFDQprw8a8AzwU='

    let descript = crypto.AES.decrypt(textEncriptado, chavePriv).toString(crypto.enc.Utf8) 

    resp.send({text, textCriptografado, descript})
})


adicionarRotas(servidor);

servidor.listen(process.env.PORTA, () => console.log(`--> API subiu na porta ${process.env.PORTA}`));