import React, { useState } from 'react';
import { Aba } from '../Aba';
import {AiFillHome, AiFillFolderOpen, AiFillPushpin} from 'react-icons/ai';
import { MdSettings, MdOutlineBubbleChart, MdSupervisorAccount } from 'react-icons/md';
import { RiAccountCircleFill } from 'react-icons/ri';
import { IoLogOut } from 'react-icons/io5';

export function Menu() {

    const [aba1, setAba1] = useState(false);
    const [aba2, setAba2] = useState(false);
    const [aba3, setAba3] = useState(false);
    const [aba4, setAba4] = useState(false);
    const [aba5, setAba5] = useState(false);
    const [aba6, setAba6] = useState(false);
    const [aba7, setAba7] = useState(false);

    return (
        <div className="menu">
            <div className="title">
            <MdOutlineBubbleChart size="24px" style={{paddingRight: "10px", paddingLeft: "10px"}}/>
            <p> datapower.com</p>
            </div>
            <Aba clicked={aba1} 
            onClick={() =>{
                setAba1(true);
                setAba2(false);
                setAba3(false);
                setAba4(false);
                setAba5(false);
                setAba6(false);
                setAba7(false);
            }} icon={<AiFillHome/>} redirect="home">Início</Aba>
            <Aba clicked={aba2} 
            onClick={() =>{
                setAba1(false);
                setAba2(true);
                setAba3(false);
                setAba4(false);
                setAba5(false);
                setAba6(false);
                setAba7(false);
            }} icon={<AiFillFolderOpen/>} redirect="home">Meus Arquivos</Aba>
            <Aba clicked={aba3} 
            onClick={() =>{
                setAba1(false);
                setAba2(false);
                setAba3(true);
                setAba4(false);
                setAba5(false);
                setAba6(false);
                setAba7(false);
            }} icon={<AiFillPushpin/>} redirect="home">Salvos</Aba>
            <Aba clicked={aba4} 
             onClick={() =>{
                setAba1(false);
                setAba2(false);
                setAba3(false);
                setAba4(true);
                setAba5(false);
                setAba6(false);
                setAba7(false);
            }} icon={<MdSupervisorAccount/>} redirect="home">Amigos</Aba>
            <Aba clicked={aba5} 
            onClick={() =>{
                setAba1(false);
                setAba2(false);
                setAba3(false);
                setAba4(false);
                setAba5(true);
                setAba6(false);
                setAba7(false);
            }} icon={<RiAccountCircleFill/>} redirect="home">Perfil</Aba>
            <Aba clicked={aba6} 
            onClick={() =>{
                setAba1(false);
                setAba2(false);
                setAba3(false);
                setAba4(false);
                setAba5(false);
                setAba6(true);
                setAba7(false);
            }} icon={<MdSettings/>} redirect="home">Configurações</Aba>
            <Aba clicked={aba7} 
            onClick={() =>{
                setAba1(false);
                setAba2(false);
                setAba3(false);
                setAba4(false);
                setAba5(false);
                setAba6(false);
                setAba7(true);
            }} icon={<IoLogOut/>} redirect="home">Sair</Aba>
        </div>
    )
}
