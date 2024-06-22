import { useEffect, useState } from "react";
import axios from "axios";
import UserModal from "../modal";
import Button from "@mui/material/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const Index = () => {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3000/users").then((res) => {
            if (res.status === 200) {
                setUsers(res.data);
            }
        });
    }, []);

    const toggle = () => {
        setModal(false);
        setUser({});
    };

    const deleteUser = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
            if (res.status === 200) {
                window.location.reload();
            }
        });
    };

    const openModal = (item) => {
        setUser(item);
        setModal(true);
    };

    return (
        <>
            <UserModal open={modal} toggle={toggle} user={user} />
            <div className="container mx-auto px-4">
                <h1 className="text-center my-3 text-3xl font-bold">Users</h1>
                <Button
                    variant="contained"
                    color="success"
                    className="my-3"
                    onClick={() => setModal(true)}>
                    Add User
                </Button>
                <TableContainer component={Paper}>
                    <Table className="table-auto border-collapse border border-gray-200">
                        <TableHead>
                            <TableRow>
                                <TableCell className="border border-gray-200 px-4 py-2">
                                    T/R
                                </TableCell>
                                <TableCell className="border border-gray-200 px-4 py-2">
                                    Name
                                </TableCell>
                                <TableCell className="border border-gray-200 px-4 py-2">
                                    Email
                                </TableCell>
                                <TableCell className="border border-gray-200 px-4 py-2">
                                    Number
                                </TableCell>
                                <TableCell className="border border-gray-200 px-4 py-2">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="border border-gray-200 px-4 py-2">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="border border-gray-200 px-4 py-2">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="border border-gray-200 px-4 py-2">
                                        {item.email}
                                    </TableCell>
                                    <TableCell className="border border-gray-200 px-4 py-2">
                                        {item.number}
                                    </TableCell>
                                    <TableCell className="border border-gray-200 px-4 py-2">
                                        <Button
                                            variant="contained"
                                            color="info"
                                            className="mx-1"
                                            onClick={() => openModal(item)}>
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            className="mx-1"
                                            onClick={() => deleteUser(item.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default Index;
