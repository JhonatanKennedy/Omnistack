import React,{ useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import './style.css'
import logoImg from '../../Assets/logo.svg'

import api from '../../services/api'


export default function Profile(){

    const history = useHistory()
    const [incidents,setIncidens] = useState([])

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidens(response.data)
        })
    },[ongId])

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })

            setIncidens(incidents.filter(incident=> incident.id !== id))
        }catch(err){
            alert('Erro ao deletar, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear()

        history.push('/')
    }


    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
    <span>Bem vinda, {ongName}</span>
                <Link className="button" to = "/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={handleLogout} size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                
                        <strong>DESCRIÇÂO</strong>
                        <p>{incident.description}</p>
                
                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency:'BRL'}).format(incident.value)}</p>
                        <button onClick={()=> handleDelete(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    )
}