import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { PaymentsContext } from "../App";
import Image from "./Image";

import fotoGaen from "../assets/images/foto_gaen.jpg";
import fotoJuan from "../assets/images/foto_juan.jpg";
import fotoSanti from "../assets/images/foto_santi.jpg";

import calculateDebt from "../helpers/calculateDebt";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin: 20px 0 0 0;
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
  width: 40px;
  overflow-x: scroll;
`;

const Payee = styled.div`
  margin: 0;
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

const List = styled.ul`
  border: 1px solid white;
  border-radius: 5px;
  list-style-type: none;
  padding-inline-start: 0;
`;

const Item = styled.li`
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
`;

const photos = {
  "Juan Cruz": fotoJuan,
  Gaen: fotoGaen,
  Santi: fotoSanti,
};

const Totals = () => {
  const [payments] = useContext(PaymentsContext);
  const [debts, setDebts] = useState(null);

  useEffect(() => {
    if (payments) {
      setDebts(calculateDebt(payments));
    }
  }, [payments]);

  if (debts) {
    return (
      <Container>
        <Title>Totals</Title>
        <List>
          {Object.keys(debts).map((payee) => {
            return Object.keys(debts[payee]).map((payer) => {
              if (debts[payee][payer] < 0) {
                return null;
              }
              return (
                <Item key={`${payee} to ${payer}`}>
                  <Payee>
                    <ImageContainer>
                      <Image src={photos[payee]} alt={payee} />;
                    </ImageContainer>
                  </Payee>
                  owes
                  <Payer>
                    <ImageContainer>
                      <Image src={photos[payer]} alt={payer} />;
                    </ImageContainer>
                  </Payer>
                  <Amount>{`${debts[payee][payer]}`}</Amount>
                </Item>
              );
            });
          })}
        </List>
      </Container>
    );
  }
  return null;
};

export default Totals;
