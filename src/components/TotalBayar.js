import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/Constans";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentComponent = ({ keranjangs }) => {
    const navigate = useNavigate(); // Use navigate hook

    const submitTotalBayar = (TotalBayar) => {
        const pesanan = {
            total_bayar: TotalBayar,
            menus: keranjangs
        };

        axios.post(API_URL + "pesanans", pesanan).then(() => {
            navigate('/sukses'); // Navigate to success page
        });
    };

    const TotalBayar = keranjangs.reduce((result, item) => result + item.total_harga, 0);

    return (
        <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
            <Row>
                <Col md={{ span: 3, offset: 9 }} className="px-4">
                    <h4>
                        Total :{" "}
                        <strong className="float-right mr-2">
                            {" "}
                            Rp. {numberWithCommas(TotalBayar)}{" "}
                        </strong>
                        <Button
                            variant="primary"
                            className="mb-2 mt-4 mr-2 w-100"
                            size="lg"
                            onClick={() => submitTotalBayar(TotalBayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            <strong>BAYAR</strong>
                        </Button>
                    </h4>
                </Col>
            </Row>
        </div>

        {/* Mobile */}
        <div className="d-sm-block d-md-none">
            <Row>
                <Col md={{ span: 3, offset: 9 }} className="px-4">
                    <h4>
                        Total :{" "}
                        <strong className="float-right mr-2">
                            {" "}
                            Rp. {numberWithCommas(TotalBayar)}{" "}
                        </strong>
                        <Button
                            variant="primary"
                            className="mb-2 mt-4 mr-2 w-100"
                            size="lg"
                            onClick={() => submitTotalBayar(TotalBayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            <strong>BAYAR</strong>
                        </Button>
                    </h4>
                </Col>
            </Row>
        </div>
        </>
    );
};

export default PaymentComponent;
