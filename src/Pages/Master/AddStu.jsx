import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { SaveUserService, GetCountryService, GetStateService } from '../../API/Service/Masterservice';
import { useNavigate } from "react-router-dom";


const InitialFormvalue = {
    MailID: "",
    FName: "",
    LName: "",
    Address: "",
    MobileNo: "",
    PinCode: "",
    CountryId: "",
    StateId: "",
    PanNO: "",
    AdhaarNo: "",
    DOB: "",
    Gender: "",
    CastId: "",
    MaritalStatus: ""
};

export default function AddStu() {


    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const expiryTime = Number(
                localStorage.getItem("expiryTime")
            );

            const now = new Date().getTime();
            const distance = expiryTime - now;

            // Expired
            if (distance <= 0) {

                clearInterval(interval);

                localStorage.removeItem("token");
                localStorage.removeItem("expiryTime");

                alert("Session Expired");

                window.location.href = "/";

                return;
            }
            // Calculate minutes & seconds
            // const minutes = Math.floor(
            //     (distance % (1000 * 60 * 60)) / (1000 * 60)
            // );

            // const seconds = Math.floor(
            //     (distance % (1000 * 60)) / 1000
            // );

            // setTimeLeft(`${minutes}:${seconds}`);

        }, 1000
        );

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getCountry();
        
    }, [token]);


    const getCountry = () => {
        GetCountryService()
            .then(res => {
                console.log("Country API:", res.data);

                // adjust based on your API response structure
                setCountryList(res.data.results);

                res.data.forEach(item => {
                    console.log(item.countryName);
                });
            })
            .catch(err => {
                console.log("Country Error:", err);
            });
    }


    const getStateByCountryId = (countryId) => {
        
        const RequestData = {
        countryId: countryId
    };
    GetStateService(RequestData)
            .then(res => {

                // setStateList(res.data);

                // res.data.forEach(item => {
                //     console.log(item.stateName);
                // });

                  console.log(res.data);

            setStateList(res.data.results);

            // res.data.results.forEach(item => {
            //     console.log(item.stateName);
            // });

            })
            .catch(err => {
                console.log("Country Error:", err);
            });
    }



    const FormickObj = useFormik({
        initialValues: InitialFormvalue,
        onSubmit: (values) => {

            SaveUserService(values)
                .then(Response => {
                    const { Status, Message } = Response.data;
                    if (Status == 1 && Message === "Success") {
                        alert("Record Saved Successfully");
                        handlereset();
                    }
                })
                .catch(Error => {
                    console.log("Error", Error);
                });
            console.log(values);
        }
    });

    const handlereset = () => {
        FormickObj.resetForm();
    };

    return (

        <Container fluid className="p-4">

            <Card
                className="border-0 shadow-lg"
                style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "#ffffff"
                }}
            >

                {/* Header */}
                <Card.Header
                    style={{
                        background:
                            "linear-gradient(90deg,#2563eb,#1d4ed8)",
                        padding: "22px 30px",
                        border: "none"
                    }}
                >

                    <div>

                        <h3
                            style={{
                                color: "white",
                                margin: 0,
                                fontWeight: "700"
                            }}
                        >
                            Add Student
                        </h3>

                        <p
                            style={{
                                color: "rgba(255,255,255,0.8)",
                                marginTop: "5px",
                                marginBottom: 0
                            }}
                        >
                            Fill all required student details
                        </p>

                    </div>

                </Card.Header>


                {/* Body */}
                <Card.Body
                    style={{
                        padding: "35px",
                        background: "#f8fafc",
                        //   maxHeight: "calc(100vh - 180px)",
                        // overflowY: "auto"
                    }}
                >

                    <Form onSubmit={FormickObj.handleSubmit}>


                        {/* SECTION */}
                        <div className="mb-4">

                            <h5
                                style={{
                                    fontWeight: "700",
                                    color: "#1e293b"
                                }}
                            >
                                Personal Information
                            </h5>

                            <hr />

                        </div>


                        {/* Row 1 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Email Address
                                    </Form.Label>

                                    <Form.Control
                                        type="email"
                                        name="MailID"
                                        value={FormickObj.values.MailID}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Email Address"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe",
                                            background: "#ffffff"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        First Name
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="FName"
                                        value={FormickObj.values.FName}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter First Name"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                        </Row>


                        {/* Row 2 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Last Name
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="LName"
                                        value={FormickObj.values.LName}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Last Name"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Address
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="Address"
                                        value={FormickObj.values.Address}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Address"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                        </Row>


                        {/* Row 3 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Mobile Number
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="MobileNo"
                                        value={FormickObj.values.MobileNo}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Mobile Number"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Pin Code
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="PinCode"
                                        value={FormickObj.values.PinCode}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Pin Code"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                        </Row>


                        {/* Row 4 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Country
                                    </Form.Label>

                                    <Form.Select
                                        name="CountryId"
                                        value={FormickObj.values.CountryId}
                                        //  onChange={FormickObj.handleChange}
                                        onChange={(e) => {

                                            FormickObj.handleChange(e);

                                            const countryId = e.target.value;

                                            getStateByCountryId(countryId);
                                        }}
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe",
                                            color: "black"
                                        }}
                                    >

                                        <option value="">
                                            Select Country
                                        </option>

                                        {countryList?.map((item, index) => (

                                            <option
                                                key={index}
                                                value={item.countryId}
                                            >
                                                {item.countryName}
                                            </option>

                                        ))}

                                    </Form.Select>

                                </Form.Group>

                            </Col>



                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        State
                                    </Form.Label>

                                    <Form.Select
                                        name="StateId"
                                        value={FormickObj.values.StateId}
                                        onChange={FormickObj.handleChange}
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe",
                                            color: "black"
                                        }}
                                    >

                                        <option value="">
                                            Select State
                                        </option>

                                        {stateList?.map((item, index) => (

                                            <option
                                                key={index}
                                                value={item.stateId}
                                            >
                                                {item.stateName}
                                            </option>

                                        ))}

                                    </Form.Select>

                                </Form.Group>

                            </Col>


                        </Row>


                        {/* Row 5 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        PAN Number
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="PanNO"
                                        value={FormickObj.values.PanNO}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter PAN Number"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Aadhar Number
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="AdhaarNo"
                                        value={FormickObj.values.AdhaarNo}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Aadhar Number"
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>



                        </Row>


                        {/* Row 6 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Date Of Birth
                                    </Form.Label>

                                    <Form.Control
                                        type="date"
                                        name="DOB"
                                        value={FormickObj.values.DOB}
                                        onChange={FormickObj.handleChange}
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "12px",
                                            color: "#334155"
                                        }}
                                    >
                                        Gender
                                    </Form.Label>

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "20px",
                                            paddingTop: "8px"
                                        }}
                                    >

                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Male"
                                            name="Gender"
                                            value="M"
                                            checked={FormickObj.values.Gender === "M"}
                                            onChange={FormickObj.handleChange}
                                        />

                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Female"
                                            name="Gender"
                                            value="F"
                                            checked={FormickObj.values.Gender === "F"}
                                            onChange={FormickObj.handleChange}
                                        />

                                    </div>

                                </Form.Group>

                            </Col>



                        </Row>


                        {/* Row 7 */}
                        <Row className="g-4 mb-2">

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Category
                                    </Form.Label>

                                    <Form.Select
                                        name="CastId"
                                        value={FormickObj.values.CastId}
                                        onChange={FormickObj.handleChange}
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        <option value="1">
                                            General
                                        </option>

                                        <option value="2">
                                            OBC
                                        </option>

                                        <option value="3">
                                            SC
                                        </option>

                                        <option value="4">
                                            ST
                                        </option>

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#334155"
                                        }}
                                    >
                                        Marital Status
                                    </Form.Label>

                                    <Form.Select
                                        name="MaritalStatus"
                                        value={FormickObj.values.MaritalStatus}
                                        onChange={FormickObj.handleChange}
                                        style={{
                                            height: "50px",
                                            borderRadius: "12px",
                                            border: "1px solid #dbeafe"
                                        }}
                                    >

                                        <option value="">
                                            Select Status
                                        </option>

                                        <option value="Married">
                                            Married
                                        </option>

                                        <option value="UnMarried">
                                            Unmarried
                                        </option>

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                        </Row>


                        {/* Buttons */}
                        <div
                            className="d-flex justify-content-end mt-5"
                            style={{
                                gap: "15px"
                            }}
                        >

                            <Button
                                variant="light"
                                onClick={handlereset}
                                style={{
                                    padding: "10px 28px",
                                    borderRadius: "12px",
                                    border: "1px solid #cbd5e1",
                                    fontWeight: "600"
                                }}
                            >
                                Reset
                            </Button>

                           {/* //     <Form onSubmit={FormickObj.handleSubmit}></Form> */}
                            <Button
                                type="submit"
                                style={{
                                    padding: "10px 30px",
                                    borderRadius: "12px",
                                    border: "none",
                                    fontWeight: "600",
                                    background:
                                        "linear-gradient(90deg,#2563eb,#1d4ed8)"
                                }}
                            >
                                Save Student
                            </Button>

                        </div>

                    </Form>

                </Card.Body>

            </Card>

        </Container>
    );
}

// <Container className="mt-4">
        //     <Card className="shadow border-0">

        //         <Card.Header className="bg-primary text-white">
        //             <h5 className="mb-0">Add User</h5>
        //         </Card.Header>

        //         <Card.Body>
        //             <Form onSubmit={FormickObj.handleSubmit}>

        //                 {/* Row 1 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Email</Form.Label>
        //                             <Form.Control
        //                                 type="email"
        //                                 name="MailID"
        //                                 value={FormickObj.values.MailID}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter Email"
        //                             />
        //                         </Form.Group>
        //                     </Col>

        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>First Name</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="FName"
        //                                 value={FormickObj.values.FName}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter First Name"
        //                             />
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Row 2 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Last Name</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="LName"
        //                                 value={FormickObj.values.LName}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter Last Name"
        //                             />
        //                         </Form.Group>
        //                     </Col>

        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Address</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="Address"
        //                                 value={FormickObj.values.Address}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter Address"
        //                             />
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Row 3 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Mobile No</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="MobileNo"
        //                                 value={FormickObj.values.MobileNo}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter Mobile Number"
        //                             />
        //                         </Form.Group>
        //                     </Col>

        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Pin Code</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="PinCode"
        //                                 value={FormickObj.values.PinCode}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter Pin Code"
        //                             />
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Row 4 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Country</Form.Label>


        //                             <Form.Select
        //                                 name="CountryId"
        //                                 value={FormickObj.values.countryId}
        //                                 onChange={FormickObj.handleChange}
        //                                 style={{ color: "black" }}
        //                             >
        //                                 <option value="">Select Country</option>

        //                                 {countryList?.map((item, index) => (
        //                                     <option key={index} value={item.countryId}>
        //                                         {item.countryName}
        //                                     </option>
        //                                 ))}
        //                             </Form.Select>
        //                         </Form.Group>
        //                     </Col>

        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>PAN No</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="PanNO"
        //                                 value={FormickObj.values.PanNO}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter PAN"
        //                             />
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Row 5 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Aadhar No</Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 name="AAdrarNo"
        //                                 value={FormickObj.values.AAdrarNo}
        //                                 onChange={FormickObj.handleChange}
        //                                 placeholder="Enter Aadhar"
        //                             />
        //                         </Form.Group>
        //                     </Col>

        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Date of Birth</Form.Label>
        //                             <Form.Control
        //                                 type="date"
        //                                 name="DOB"
        //                                 value={FormickObj.values.DOB}
        //                                 onChange={FormickObj.handleChange}
        //                             />
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Row 6 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Gender</Form.Label>
        //                             <div>
        //                                 <Form.Check
        //                                     inline
        //                                     type="radio"
        //                                     label="Male"
        //                                     name="Gender"
        //                                     value="M"
        //                                     checked={FormickObj.values.Gender === "M"}
        //                                     onChange={FormickObj.handleChange}
        //                                 />
        //                                 <Form.Check
        //                                     inline
        //                                     type="radio"
        //                                     label="Female"
        //                                     name="Gender"
        //                                     value="F"
        //                                     checked={FormickObj.values.Gender === "F"}
        //                                     onChange={FormickObj.handleChange}
        //                                 />
        //                             </div>
        //                         </Form.Group>
        //                     </Col>

        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Category</Form.Label>
        //                             <Form.Select
        //                                 name="CastId"
        //                                 value={FormickObj.values.CastId}
        //                                 onChange={FormickObj.handleChange}
        //                             >
        //                                 <option value="">Select Category</option>
        //                                 <option value="1">General</option>
        //                                 <option value="2">OBC</option>
        //                                 <option value="3">SC</option>
        //                                 <option value="4">ST</option>
        //                             </Form.Select>
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Row 7 */}
        //                 <Row className="mb-3">
        //                     <Col md={6}>
        //                         <Form.Group>
        //                             <Form.Label>Marital Status</Form.Label>
        //                             <Form.Select
        //                                 name="MaterialStatus"
        //                                 value={FormickObj.values.MaterialStatus}
        //                                 onChange={FormickObj.handleChange}
        //                             >
        //                                 <option value="">Select Status</option>
        //                                 <option value="Married">Married</option>
        //                                 <option value="UnMarried">Unmarried</option>
        //                             </Form.Select>
        //                         </Form.Group>
        //                     </Col>
        //                 </Row>

        //                 {/* Buttons */}
        //                 <div className="text-end mt-4">
        //                     <Button variant="secondary" className="me-2" onClick={handlereset}>
        //                         Reset
        //                     </Button>

        //                     <Button variant="success" type="submit">
        //                         Submit
        //                     </Button>
        //                 </div>

        //             </Form>
        //         </Card.Body>
        //     </Card>
        // </Container>