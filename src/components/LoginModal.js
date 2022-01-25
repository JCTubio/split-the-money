import React, { useState } from "react";
import styled from "styled-components";

const JUAN_CRUZ_PASSWORD = process.env.REACT_APP_JUAN_CRUZ_PASSWORD;
const SANTI_PASSWORD = process.env.REACT_APP_SANTI_PASSWORD;
const GAEN_PASSWORD = process.env.REACT_APP_GAEN_PASSWORD;

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 1);
`;

const Container = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 25px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 0px 40px;
`;

const Label = styled.label`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-size: 22px;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: white;
`;

const Checkbox = styled.input`
  font-size: 22px;
  border-style: none;
  border-radius: 5px;
`;

const Submit = styled.input`
  font-size: 22px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
`;

const LoginModal = (props) => {
  const { handleSubmit } = props;
  const [user, setUser] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordVisibilityChange = (event) => {
    setPasswordVisibility(event.target.checked);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    switch (user) {
      case JUAN_CRUZ_PASSWORD:
        handleSubmit("Juan Cruz");
        break;
      case SANTI_PASSWORD:
        handleSubmit("Santi");
        break;
      case GAEN_PASSWORD:
        handleSubmit("Gaen");
        break;
      default:
        alert("Wrong password.");
        break;
    }
  };

  return (
    <Shadow>
      <Container onSubmit={onSubmit}>
        <Label htmlFor="password">Enter your password:</Label>
        <Input
          type={passwordVisibility ? "text" : "password"}
          id="password"
          name="password"
          onChange={handleChange}
        />
        <CheckboxContainer>
          <CheckboxLabel>Show password </CheckboxLabel>
          <Checkbox
            type="checkbox"
            id="showpassword"
            name="showpassword"
            onChange={handlePasswordVisibilityChange}
            value={passwordVisibility}
          />
        </CheckboxContainer>
        <Submit type="submit" value="Submit" />
      </Container>
    </Shadow>
  );
};

export default LoginModal;
