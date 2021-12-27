import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
} from "reactstrap";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

function UserList() {
    const [addUserModal, setAddUserModal] = useState(false);
    const [userList, setUserlist] = useState([]);
    // Add User States
    const [name, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [selectedCollegeName, setSelectedCollegeName] = useState("");
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    //Table Heading
    const TableHeading = [
        "User Name",
        "College",
        "Hobbies",
        "Action",
    ];

    let lastId = userList.length !== 0 ? Math.max.apply(null, userList.map(user => user.id)) : 0;
    let newId = lastId + 1;

    const handleSave = (e) => {
        let data = {
            id: newId,
            name: name,
            dob: dob,
            address: address,
            gender: gender,
            college: selectedCollegeName,
            hobbies: selectedHobbies,
        }
        setUserlist([data, ...userList]);
        // localStorage.setItem("UserList", JSON.stringify(userList))
        console.log("UserInfoList", userList, name, address, dob, gender, selectedCollegeName, selectedHobbies.join())
    }

    const handleDelete = (rowID) => {
        let removeUser = userList.filter((user) =>
            user.id !== rowID
        );
        setUserlist(removeUser);
    }

    return (
        <>
            <Card className="m-4" border="info">
                <CardHeader className="">
                    <Row>
                        <Col className="sm-6">
                            Users
                        </Col>
                        <Col className="sm-6">
                            <div className="d-flex justify-content-end">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setAddUserModal(true);
                                    }}>
                                    ADD
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                {
                                    TableHeading.map((heading) => {
                                        return (
                                            <th key={`${heading}`}>
                                                {heading}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList.length !== 0 &&
                                userList.map((user, index) => {
                                    return (
                                        <tr key={`${user.id}_${index}`}>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td>
                                                {user.college}
                                            </td>
                                            <td>
                                                {user.hobbies.join()}
                                            </td>
                                            <th>
                                                <div>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <Link to={`"/EditUser/${user.id}"`}>
                                                                <button
                                                                    type="button"
                                                                    className="btn-round btn btn-primary btn-sm"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <button
                                                                type="button"
                                                                className="btn-round btn btn-primary btn-sm"
                                                                onClick={() => handleDelete(user.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                </div>`
                                            </th>
                                        </tr>

                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

            {/* Add User Modal */}
            <Modal
                isOpen={addUserModal}
                toggle={() => {
                    setAddUserModal(false);
                }}
                size="lg"
                centered
                scrollable
                style={{ height: "500px" }}
            >
                <ModalHeader
                    toggle={() => {
                        setAddUserModal(false);
                    }}
                >
                    Add User
                </ModalHeader>
                <ModalBody>
                    <AddUser
                        getName={(value) => setName(value)}
                        getDOB={(value) => setDOB(value)}
                        getAddress={(value) => setAddress(value)}
                        gender={gender}
                        getGender={(value) => setGender(value)}
                        selectedCollegeName={selectedCollegeName}
                        getSelectedCollege={(value) => setSelectedCollegeName(value)}
                        getHobbies={(value) => setSelectedHobbies(value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            setAddUserModal(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={
                            name !== "" && selectedCollegeName !== "" && selectedHobbies.length !== 0 ?
                                "" : "disabled"}
                        color="primary"
                        onClick={(e) => {
                            handleSave(e)
                            setAddUserModal(false)
                        }}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
export default UserList;