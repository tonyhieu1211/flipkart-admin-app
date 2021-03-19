import React from 'react'
import './style.css'

const Card = (props) => {
    return (
        <div className="card"
            {...props}
        >
        {
            (props.headerLeft || props.headerRight) &&
            <div className="cardHeader">
                {
                    props.headerLeft && <div>{props.headerLeft}</div>
                }
                {
                    props.headerRight && <div>{props.headerRight}</div>
                }
            </div>
        }
            
            {props.children}
        </div>
    )
}

export default Card
