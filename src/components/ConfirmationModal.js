import React, { useContext } from "react";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";

import Firebase from "../firebase/Firebase";
import { FirebaseContext } from "../App";

import Button from "./Button";

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin: 25px;
  border-radius: 25px;
  border: double white 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 20px 40px;
  background-color: #1c061a;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 10px 0;
`;

const PaymentDetailsModal = (props) => {
  const { payment, handleClose, handleCloseForParent } = props;
  const fetchData = useContext(FirebaseContext);

  const handleClickOnShadow = (event) => {
    event.stopPropagation();
    event.preventDefault();

    handleClose();
  };

  const handleClickDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      const docRef = doc(Firebase.db, Firebase.paymentsCollection, payment.id);

      await updateDoc(docRef, {
        deleted: true,
      });
      fetchData();

    } catch (e) {
      alert("Error uploading payment.", e);
    }
    handleClose();
    handleCloseForParent();
  };

  return (
    <Shadow onClick={handleClickOnShadow}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>Are you sure?</Title>
        <Box>
          <Button
            onClick={handleClickDelete}
            style={{ backgroundColor: "red" }}
          >
            Yes, delete.
          </Button>
        </Box>
        <Box>
          <Button onClick={handleClose} style={{ backgroundColor: "green" }}>
            No, go back.
          </Button>
        </Box>
      </Container>
    </Shadow>
  );
};

export default PaymentDetailsModal;
