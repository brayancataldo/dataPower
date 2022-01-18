import React from 'react'
import { useHistory } from 'react-router-dom'

export function Aba(props) {

    const history = useHistory();
    
    return (
        <div className={props.clicked === true ? "aba-after" : "aba-before"} onClick={props.onClick}>
            <div style={{ paddingLeft: "10px", paddingRight: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            {props.icon}
            </div>
            <div style={{width: "100%"}}>
            {props.children}
            </div>
        </div>
    )
}
