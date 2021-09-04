import React, { useContext, useState } from "react";
import styled from "styled-components";

import { PaymentsContext } from "../App";
import PaymentDetailsModal from "./PaymentDetailsModal";

import fotoGaen from "../assets/images/foto_gaen.jpg";
import fotoJuan from "../assets/images/foto_juan.jpg";
import fotoSanti from "../assets/images/foto_santi.jpg";

import Image from "./Image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;

const List = styled.ul`
  border: 1px solid white;
  border-radius: 5px;
  list-style-type: none;
  padding-inline-start: 0;
  max-height: 300px;
  overflow-y: scroll;
`;

const Item = styled.li`
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 10px;
`;

const Payer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const Amount = styled.p`
  margin: 0 10px 0 0;
  font-size: 16px;
  font-weight: bold;
  max-width: 40px;
  overflow-x: scroll;
`;

const Payee = styled.div`
  margin: 0;
  width: 45%;
  display: flex;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  border-style: none;
  border-radius: 3px;
  margin: 0 10px;
  padding: 0;
  overflow: hidden;
`;

const photos = {
  "Juan Cruz": fotoJuan,
  Gaen: fotoGaen,
  Santi: fotoSanti,
};

const PaymentsList = () => {
  const [payments] = useContext(PaymentsContext);
  const [activePayment, setActivePayment] = useState(null);

  if (!payments) {
    return null;
  }

  const handleClickOnPayment = (selectedPayment) => {
    setActivePayment(selectedPayment);
  };

  return (
    <Container>
      <List>
        {payments.map((payment, index) => {
          return (
            <Item onClick={() => handleClickOnPayment(payment)} key={index}>
              <Payer>
                <ImageContainer>
                  <Image src={photos[payment.user]} alt={payment.user} />;
                </ImageContainer>
              </Payer>
              paid for
              <Payee>
                {payment.benefactors.sort().map((benefactor) => {
                  return (
                    <ImageContainer key={benefactor}>
                      <Image src={photos[benefactor]} alt={benefactor} />;
                    </ImageContainer>
                  );
                })}
              </Payee>
              <Amount>{`${payment.amount}`}</Amount>
            </Item>
          );
        })}
      </List>
      {activePayment ? <PaymentDetailsModal handleClose={() => setActivePayment(null)} payment={activePayment} /> : null}
    </Container>
  );
};

export default PaymentsList;
