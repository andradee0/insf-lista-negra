import con from "./connection.js";
import crypto from 'crypto-js'

export async function inserirUsuario(pessoa) {
    const comando = `
        insert into tb_usuario (nm_usuario, ds_senha) 
					        values (?, ?)
    `;
    
    let hash = crypto.SHA256(pessoa.senha).toString()

    let resposta = await con.query(comando, [pessoa.nome, hash ])
    let info = resposta[0];
    
    return info.insertId;
}

export async function validarUsuario(pessoa) {
    const comando = `
        select 
            id_usuario id,
            nm_usuario nome
        from tb_usuario 
        where 
            nm_usuario = ?
            and ds_senha = ?
    `;
    
    let hash = crypto.SHA256(pessoa.senha).toString()
    let registros = await con.query(comando, [pessoa.nome, hash])
    return registros[0][0];
}