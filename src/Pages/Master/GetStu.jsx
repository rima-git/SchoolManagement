import React, { useEffect, useMemo, useState } from "react";
import { GetStudentService } from '../../API/Service/Masterservice';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Card, CardHeader, CardBody, CardFooter, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function GetStu() {

    const [stuList, setStuList] = useState([]);
    const [timeLeft, setTimeLeft] = useState("");

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
        getallstudent();
    }, [token]);



    const getallstudent = () => {
        console.log(token);
        GetStudentService()
            .then(res => {

                console.log(res?.data?.results);
                const studentData = res?.data?.results || [];
                setStuList(studentData);
            })
            .catch(err => {
                console.log("Country Error:", err);
            });
    }


    const ColumnData = useMemo(() => [
        {
            accessorKey: "fName",
            header: "First Name",
            size: 150

        },
        {
            accessorKey: "lName",
            header: "Last Name",
            size: 150
        },
        {
            accessorKey: "mailID",
            header: "Mail Id",
            size: 150
        }
    ],
        []);

    const Tableconfig = useMaterialReactTable({
        columns: ColumnData,
        data: stuList,
    });
    return (
        <>
           <Container fluid className="p-3">

    <Card
        className="border-0 shadow-lg"
        style={{
            borderRadius: "18px",
            overflow: "hidden",
            background: "#ffffff"
        }}
    >

        {/* Header */}
        <CardHeader
            style={{
                background:
                    "linear-gradient(90deg, #2563eb, #1e40af)",
                padding: "20px 25px",
                border: "none"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <h3
                        style={{
                            color: "white",
                            margin: 0,
                            fontWeight: "600"
                        }}
                    >
                        Student List
                    </h3>

                    <p
                        style={{
                            color: "rgba(255,255,255,0.8)",
                            margin: 0,
                            marginTop: "5px"
                        }}
                    >
                        View all registered students
                    </p>

                </div>

            </div>

        </CardHeader>


        {/* Body */}
        <CardBody
            style={{
                padding: "25px",
                background: "#f8fafc"
            }}
        >

            <Row>

                <Col md={12}>

                    <div
                        style={{
                            background: "white",
                            padding: "15px",
                            borderRadius: "14px",
                            boxShadow:
                                "0 2px 10px rgba(0,0,0,0.05)"
                        }}
                    >

                        <MaterialReactTable
                            table={Tableconfig}
                        />

                    </div>

                </Col>

            </Row>

        </CardBody>

    </Card>

</Container>
        </>
    )
}

export default GetStu;