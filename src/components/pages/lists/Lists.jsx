import { React, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApiService from '../../../helpers/ApiServices';
import FormHeader from '../../UI/organisms/FormHeader';
import Topbar from '../../UI/organisms/Topbar';

const formHeader = {
    title: "Custom List",
    buttonList: [
        {
            name: "Create",
            type: "submit",
            variant: "primary",
            handler: "",
            linkTo: "/lists/add"
        }
    ]
}

export default function Lists() {
    const [state, setState] = useState([]);

    const getLists = async () => {
        const response = await ApiService.get('list');
        console.log(response.data.documents);

        setState(response.data.documents);
    }

    useEffect(() => {
        getLists();

    }, [])


    return (
        <div className="lists">
            <Topbar />
            <FormHeader formHeader={formHeader} />

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List Id</th>
                        <th>Active</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Modifired At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.map(record => {
                            return <tr>
                                <td style={{ maxWidth: "10rem", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Button style={{ minWidth: "4rem" }} as={Link} to={`lists/view/${record.id}`} size="sm">View</Button>
                                    <Button style={{ minWidth: "4rem" }} as={Link} to={`lists/edit/${record.id}`} size="sm">Edit </Button>
                                </td>
                                <td>{record.listId}</td>
                                <td style={{ minWidth: '120px' }}>{record.isActive ? "T" : "F"}</td>
                                <td style={{ minWidth: '120px' }}>{record.name}</td>
                                <td>{record.description}</td>
                                <td>{record.createdBy}</td>
                                <td>{new Date(record.createdAt).toDateString()}</td>
                                <td>{new Date(record.updatedAt).toDateString()}</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>

        </div>
    )
}
