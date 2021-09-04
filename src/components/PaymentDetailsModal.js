import React, { useState } from "react";
import styled from "styled-components";

import Subtitle from "./Subtitle";
import Image from "./Image";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";

import fotoGaen from "../assets/images/foto_gaen.jpg";
import fotoJuan from "../assets/images/foto_juan.jpg";
import fotoSanti from "../assets/images/foto_santi.jpg";

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  border-style: none;
  border-radius: 3px;
  padding: 0;
  overflow: hidden;
`;

const photos = {
  "Juan Cruz": fotoJuan,
  Gaen: fotoGaen,
  Santi: fotoSanti,
};

const PaymentDetailsModal = (props) => {
  const { payment, handleClose } = props;
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleClickOnShadow = (event) => {
    event.stopPropagation();
    event.preventDefault();

    handleClose();
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowConfirmationDialog(true);
  };

  return (
    <Shadow onClick={handleClickOnShadow}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>Payment Details</Title>
        <Box>
          <Subtitle>Payer: </Subtitle>
          <ImageContainer>
            <Image src={photos[payment.user]} alt={payment.user} />;
          </ImageContainer>
        </Box>
        <Box>
          <Subtitle>Paid: </Subtitle>
          <Subtitle>{payment.amount}</Subtitle>
        </Box>
        <VerticalBox>
          <Subtitle>For: </Subtitle>
          <Box style={{ marginBottom: "30px" }}>
            {payment.benefactors.map((benefactor) => {
              return (
                <ImageContainer key={`${payment.user} to ${benefactor}`}>
                  <Image src={photos[benefactor]} alt={benefactor} />;
                </ImageContainer>
              );
            })}
          </Box>
        </VerticalBox>
        <Button onClick={handleClickDelete} style={{ backgroundColor: "red" }}>
          Delete
        </Button>
        {showConfirmationDialog ? (
          <ConfirmationModal
            handleCloseForParent={handleClose}
            handleClose={() => setShowConfirmationDialog(false)}
            payment={payment}
          />
        ) : null}
      </Container>
    </Shadow>
  );
};

export default PaymentDetailsModal;
