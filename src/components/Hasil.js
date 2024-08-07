import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/Constans";
import axios from "axios";
import Swal from "sweetalert2";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: null, // Initialize as null
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan || "", // Ensure keterangan is set to an empty string if not present
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    const newJumlah = this.state.jumlah + 1;
    this.setState({
      jumlah: newJumlah,
      totalHarga: this.state.keranjangDetail.product.harga * newJumlah,
    });
  };

  kurang = () => {
    if (this.state.jumlah > 1) {
      const newJumlah = this.state.jumlah - 1;
      this.setState({
        jumlah: newJumlah,
        totalHarga: this.state.keranjangDetail.product.harga * newJumlah,
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then(() => {
        this.props.getListKeranjang(); // Ensure this updates the parent state
        Swal.fire({
          title: "Update pesanan!",
          text: data.product.nama + " berhasil diupdate",
          icon: "success",
          button: false,
        });
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then(() => {
        this.props.getListKeranjang(); // Ensure this updates the parent state
        Swal.fire({
          title: "Hapus pesanan!",
          text: this.state.keranjangDetail.product.nama + " berhasil dihapus",
          icon: "error",
          button: false,
        });
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                      {/* Display keterangan here */}
                      {menuKeranjang.keterangan && (
                        <p className="text-muted">Keterangan: {menuKeranjang.keterangan}</p>
                      )}
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
