import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/Constans";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [menus, setMenus] = useState([]);
  const [categoriYangDipilih, setCategoriYangDipilih] = useState("Makanan");
  const [keranjangs, setKeranjangs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL + "products?category.nama=" + categoriYangDipilih)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });

    getListKeranjang();
  }, [categoriYangDipilih]);

  const getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        setKeranjangs(res.data);
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });
  };

  const changeCategory = (value) => {
    setCategoriYangDipilih(value);
    setMenus([]);

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });
  };

  const masukKeranjang = (value) => {
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please log in first before adding items to the cart.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then(() => {
              getListKeranjang();
              Swal.fire({
                title: "Added to Cart",
                text: `${keranjang.product.nama} has been added to the cart.`,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.log("Error ya dek ya", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then(() => {
              Swal.fire({
                title: "Updated in Cart",
                text: `${keranjang.product.nama} has been updated in the cart.`,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.log("Error ya dek ya", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error ya dek ya", error);
      });
  };

  return (
    <div className="mt-3">
      <Container fluid>
        <Row>
          <ListCategories
            changeCategory={changeCategory}
            categoriYangDipilih={categoriYangDipilih}
          />
          <Col className="mt-3">
            <h4>
              <strong>Daftar Produk</strong>
            </h4>
            <hr />
            <Row className="overflow-auto menu">
              {menus &&
                menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={masukKeranjang}
                  />
                ))}
            </Row>
          </Col>
          <Hasil keranjangs={keranjangs} {...props} getListKeranjang={getListKeranjang}/>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
