import React, { useEffect, useState } from "react";
import {
    Card,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
// import Select from 'react-select';

function AddUser(props) {
    const [genderState, setGenderState] = useState(false);
    const [collegeSearchText, setCollegeSearchText] = useState("");
    const [collegeState, setCollegeState] = useState(false);
    // const [collegeList, setCollegeList] = useState([]);
    const [filteredCollegeNames, setFilteredCollegeNames] = useState([]);
    const [hobbies, setHobbies] = useState(
        {
            Reading: false,
            Gaming: false,
            Traveling: false,
            Drawing: false,
            Other: false,
        }
    );
    const [otherHobby, setOtherHobby] = useState("");

    const handleCollegeSearchChange = e => {
        const searchText = e.target.value;
        setCollegeSearchText(searchText);
        collegelist(searchText);
    };

    const collegelist = (searchText) => {
        if (searchText !== "") {
            fetch(`http://universities.hipolabs.com/search?name=${searchText}`)
                .then(response =>
                    response.json()
                )
                .then(data => {
                    let names = data.map((name) => {
                        return name.name;
                    })
                    setFilteredCollegeNames(names);
                })
        } else {
            setFilteredCollegeNames([]);
        }
    }

    // useEffect(() => {
    //     let search = collegeSearchText ? collegeSearchText : "";
    //     fetch(`http://universities.hipolabs.com/search?name=${search}`)
    //         .then(response =>
    //             response.json()
    //         )
    //         .then(data => {
    //             let names = data.map((name) => {
    //                 return name.name;
    //             })
    //             setFilteredCollegeNames(names);
    //             // return names
    //         })
    // }, [collegeSearchText]);

    const handleHobbyChange = event => {
        let newHobbies = { ...hobbies };
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        setHobbies({
            ...newHobbies,
            [name]: value
        });
        handleChange({
            ...newHobbies,
            [name]: value
        }, "getHobbies");
    };

    const handleChange = (value, propsName) => {
        props[propsName](value);
        if (propsName === "getHobbies") {
            if (typeof value === 'object') {
                const selectedHobbies = Object.keys(value).filter((hobby) => value[hobby] === true && hobby !== "Other")
                props[propsName](otherHobby ? [...selectedHobbies, otherHobby] : selectedHobbies);
            } else {
                const selectedHobbies = Object.keys(hobbies).filter((hobby) => hobbies[hobby] === true && hobby !== "Other")
                props[propsName](value !== "" ? [...selectedHobbies, value] : selectedHobbies);
            }
        }
    }

    return (
        <>
            <Card className="shadow border-0 rounded-3 p-3">
                <Form>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <Label
                                    htmlFor="user_name"
                                    size="md"
                                >
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    id="user_name"
                                    placeholder="Enter Name"
                                    size="md"
                                    onChange={(e) => {
                                        handleChange(e.target.value, "getName")
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label
                                    htmlFor="user_dob"
                                    size="md"
                                >
                                    Birth Date
                                </Label>
                                <Input
                                    type="Date"
                                    id="user_dob"
                                    size="md"
                                    onChange={(e) => {
                                        // getDOB(e.target.value)
                                        handleChange(e.target.value, "getDOB")
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <Label
                                    htmlFor="user_address"
                                    size="md"
                                >
                                    Address
                                </Label>
                                <Input
                                    type="textarea"
                                    id="user_address"
                                    placeholder="Enter Address"
                                    size="md"
                                    onChange={(e) => {
                                        handleChange(e.target.value, "getAddress")
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label
                                    htmlFor="user_gender"
                                    size="md"
                                >
                                    Gender
                                </Label>
                                <Dropdown
                                    id="user_gender_dropdown"
                                    className="w-100"
                                    isOpen={genderState}
                                    toggle={() => setGenderState(!genderState)}
                                >
                                    <DropdownToggle
                                        className="w-100 border d-flex justify-content-between px-3 align-items-center"
                                        caret
                                        color="white"
                                    >
                                        {props.gender ? props.gender : "Select Gender"}
                                    </DropdownToggle>
                                    <DropdownMenu
                                        className="w-100"
                                    >
                                        {["Female", "Male"].map((item) => {
                                            return (
                                                <DropdownItem
                                                    key={`${item}_gender`}
                                                    onClick={(e) => {
                                                        handleChange(item, "getGender")
                                                    }}
                                                >
                                                    {item}
                                                </DropdownItem>
                                            )
                                        })
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <FormGroup>
                                <Label
                                    htmlFor="user_college"
                                    size="md"
                                >
                                    College
                                </Label>
                                <Dropdown
                                    id="user_college"
                                    className="w-100"
                                    isOpen={collegeState}
                                    toggle={() =>
                                        setCollegeState(!collegeState)
                                    }
                                >
                                    <DropdownToggle
                                        className="w-100 border d-flex justify-content-between align-items-center px-3"
                                        caret
                                        color="white"
                                    >
                                        {props.selectedCollegeName
                                            ? props.selectedCollegeName
                                            : "Select College"}
                                    </DropdownToggle>
                                    <DropdownMenu
                                        className="w-100"
                                        style={{
                                            maxHeight: "150px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        <DropdownItem>
                                            <Input
                                                className="mx-1 bgColor border"
                                                type="text"
                                                onChange={
                                                    handleCollegeSearchChange
                                                }
                                                placeholder="Select College Name"
                                                onClick={e =>
                                                    e.stopPropagation()
                                                }
                                            />
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        {filteredCollegeNames.length !== 0 && filteredCollegeNames.map(
                                            (item, index) => {
                                                return (
                                                    <DropdownItem
                                                        key={
                                                            index +
                                                            "_CollegeValue"
                                                        }
                                                        onClick={() =>
                                                            handleChange(item, "getSelectedCollege")
                                                        }
                                                    >
                                                        {item}
                                                    </DropdownItem>
                                                );
                                            }
                                        )}
                                        {filteredCollegeNames.length === 0 &&
                                            collegeSearchText === "" && (
                                                <DropdownItem>
                                                    No Result Found
                                                </DropdownItem>
                                            )}
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <FormGroup>
                                <Label
                                    htmlFor="user_hobbies"
                                    size="md"
                                >
                                    Hobbies
                                </Label>
                                <Row className="user_hobbies">
                                    {
                                        Object.keys(hobbies).map(hobby => (
                                            <Col sm="4" key={`_${hobby}`}>
                                                <label>
                                                    <input
                                                        name={hobby}
                                                        type="checkbox"
                                                        checked={hobbies[hobby]}
                                                        onChange={handleHobbyChange} />
                                                    &nbsp;
                                                    <span>{hobby}</span>
                                                </label>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className={hobbies.Other ? "visible" : "invisible"}>
                        <Col lg="6">
                            <FormGroup>
                                <Label
                                    htmlFor="user_other_hobbies"
                                    size="md"
                                >
                                    Other Hobbies
                                </Label>
                                <Input
                                    type="text"
                                    id="user_other_hobbies"
                                    size="md"
                                    value={props.otherHobby}
                                    onChange={(e) => {
                                        setOtherHobby(e.target.value)
                                        handleChange(e.target.value, "getHobbies")
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default AddUser;
