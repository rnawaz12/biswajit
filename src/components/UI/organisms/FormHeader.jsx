import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './formHeader.css';

export default function FormHeader(props) {

    return (
        <div className="formHeader">
            <div className="formTitle">{props.formHeader.title}</div>
            <div className="formButtons">
                {
                    props.formHeader.buttonList.map(btn => {
                        return <Button as={Link} to={btn.linkTo} key={btn.id} style={{ marginRight: "8px", minWidth: "100px" }} type={btn.type} variant={btn.variant} size="sm">{btn.name}</Button>
                    })
                }
            </div>
        </div>
    )
}
