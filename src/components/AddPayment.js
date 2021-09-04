import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import NewPaymentModal from "./NewPaymentModal"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const Title = styled.h1`
  color: white;
`;

const AddPayment = () => {
  const [addingNewPayment, setAddingNewPayment] = useState(false);

  const openModal = () => {
      setAddingNewPayment(true)
  }

  const closeModal = () => {
      setAddingNewPayment(false)
  }

  return (
    <Container>
      <Title>Split that money</Title>
      <Button onClick={openModal} >Add a new payment</Button>
      {addingNewPayment ? <NewPaymentModal handleClose={closeModal} /> : null}
    </Container>
  );
};

export default AddPayment;
