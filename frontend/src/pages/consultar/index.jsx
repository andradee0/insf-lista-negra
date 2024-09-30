import { useState } from 'react'
import './index.scss'

import axios from 'axios'
import { Link } from 'react-router-dom';



export default function Consultar() {
    const [listaNegra, setListaNegra] = useState([]);


    async function buscar() {
        const url = 'http://localhost:5010/listaNegra/';
        let resp = await axios.get(url);
        setListaNegra(resp.data);
    }

    

    return (
        <div className='pagina-consultar'>
            <h1> CONSULTAR </h1>

            <button onClick={buscar}>Buscar</button>

            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Motivo</th>
                        <th>Vingança</th>
                        <th>Nota de Ódio</th>
                        <th>Perdoado?</th>
                    </tr>
                </thead>

                <tbody>
                    {listaNegra.map(item => 
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.motivo}</td>
                            <td>{new Date(item.vinganca).toLocaleDateString()}</td>
                            <td>{item.notaOdio}</td>
                            <td>{item.perdoado ? 'Sim' : 'Não'}</td>
                        </tr>
                    )}
                </tbody>

            </table>

           
        </div>
    )
}
