import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap"; // Pastikan Image diimpor dari react-bootstrap
import axios from "axios";
import { API_URL } from "../utils/Constans";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function(item) {
            return axios
            .delete(API_URL+"keranjangs/"+item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h2>Sukses pesan</h2>
        <p>Terimaksih sudah memesan</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
