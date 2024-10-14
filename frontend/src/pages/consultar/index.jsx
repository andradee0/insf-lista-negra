import { useEffect, useState } from 'react'
import './index.scss'
import toast, { Toaster } from 'react-hot-toast'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';



export default function Consultar() {
    const [token, setToken] = useState(null);
    const [listaNegra, setListaNegra] = useState([]);


    const navigate = useNavigate()


    async function buscar() {
        const url = `http://localhost:5050/listaNegra?x-access-token=${token}`;
        let resp = await axios.get(url);
        setListaNegra(resp.data);

        if(resp.data.length > 0){
            toast.success(`${resp.data.length} itens encontrados!`)
        }else{
            toast.error(`${resp.data.length} itens encontrados!`)
        }

        
    }

    async function excluir(id) {
        const url = `http://localhost:5050/listaNegra/${id}?x-access-token=${token}`;
        await axios.delete(url)

        await buscar()
    }

    async function sair() {
        localStorage.setItem('USUARIO', null)
        navigate('/')
    }

    useEffect(() => {
        let token = localStorage.getItem('USUARIO')
        setToken(token)

        if (token == 'null') {
            navigate('/')
        }
    }, [])
    

    return (
        <div className='pagina-consultar'>
            <h2>Bem-vindo {token?.nome}</h2>
            <button onClick={sair}>Sair</button>
            <h1> CONSULTAR </h1>

            <button onClick={buscar}>Buscar</button>
            <button><Link to={'/cadastrar'}>Cadastrar</Link></button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Motivo</th>
                        <th>Vingança</th>
                        <th>Nota de Ódio</th>
                        <th>Perdoado?</th>
                        <th>Ações</th>
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
                            <td>
                                <Link to={`/cadastrar/${item.id}`}>Alterar</Link>
                                <Link onClick={() => excluir(item.id)}>Deletar</Link>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

                <Toaster />
        </div>
    )
}
