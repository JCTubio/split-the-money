import React, { useState, useContext } from "react";
import styled from "styled-components";
import { collection, addDoc, updateDoc } from "firebase/firestore";

import Firebase from "../firebase/Firebase";
import { AuthContext, FirebaseContext } from "../App";

import fotoGaen from "../assets/images/foto_gaen.jpg";
import fotoJuan from "../assets/images/foto_juan.jpg";
import fotoSanti from "../assets/images/foto_santi.jpg";

import Button from "./Button";
import Image from "./Image";
import Subtitle from "./Subtitle";

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

const Container = styled.form`
  margin: 25px;
  border-radius: 25px;
  border: double white 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 40px;
  background-color: #1c061a;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
`;

const Checkbox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 35px;
  border-style: none;
  border-radius: 3px;
  margin: 0 10px;
  padding: 0;
  overflow: hidden;
  -webkit-box-shadow: ${(props) =>
    props.highlight
      ? "0px 0px 12px 1px #8CFF85, 0px 0px 12px 1px #8CFF85"
      : "none"};
  box-shadow: ${(props) =>
    props.highlight
      ? "0px 0px 12px 1px #8CFF85, 0px 0px 12px 1px #8CFF85"
      : "none"};
`;

const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 20px 0;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 0 0 30px;
`;

const Label = styled.label`
  font-size: 22px;
  color: white;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 22px;
  border-style: none;
  border-radius: 5px;
`;

const LoginModal = (props) => {
  const { handleClose } = props;

  const user = useContext(AuthContext);
  const fetchData = useContext(FirebaseContext)

  const [benefactors, setBenefactors] = useState([user]);
  const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("")

  const handleCheckboxChange = (event) => {
    if (benefactors.includes(event.target.name)) {
      setBenefactors(
        benefactors.filter((benefactor) => benefactor !== event.target.name)
      );
    } else {
      setBenefactors([...benefactors, event.target.name]);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClickOnShadow = (event) => {
    event.stopPropagation();
    event.preventDefault();

    handleClose();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(
        collection(Firebase.db, Firebase.paymentsCollection),
        {
          amount,
          benefactors,
          user,
          description,
          deleted: false
        }
      );
      await updateDoc(docRef, {
        id: docRef.id,
      });
      fetchData()
    } catch (e) {
      alert("Error uploading payment.", e);
    }
    handleClose();
  };

  return (
    <Shadow onClick={handleClickOnShadow}>
      <Container onClick={e => e.stopPropagation()} onSubmit={onSubmit}>
        <Title>Add a new payment</Title>
        <Subtitle>Who should split it?</Subtitle>
        <CheckboxContainer>
          <Checkbox
            highlight={benefactors.includes("Juan Cruz")}
            type="button"
            id="juan cruz"
            name="Juan Cruz"
            onClick={handleCheckboxChange}
          >
            <Image src={fotoJuan} alt="foto juan" />
          </Checkbox>
          <Checkbox
            highlight={benefactors.includes("Santi")}
            type="button"
            id="santi"
            name="Santi"
            onClick={handleCheckboxChange}
          >
            <Image src={fotoSanti} alt="foto santi" />
          </Checkbox>
          <Checkbox
            highlight={benefactors.includes("Gaen")}
            type="button"
            id="gaen"
            name="Gaen"
            onClick={handleCheckboxChange}
          >
            <Image src={fotoGaen} alt="foto gaen" />
          </Checkbox>
        </CheckboxContainer>
        <AmountContainer>
          <Label htmlFor="amount">Amount:</Label>
          <Input id="amount" name="amount" onChange={handleAmountChange} />
        </AmountContainer>
        <DescriptionContainer>
          <Label htmlFor="description">Description:</Label>
          <Input id="description" name="description" onChange={handleDescriptionChange} />
        </DescriptionContainer>
        <Button type="submit" value="Submit">
          Submit
        </Button>
      </Container>
    </Shadow>
  );
};

export default LoginModal;
