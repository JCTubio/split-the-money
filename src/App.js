import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore";

import Firebase from "./firebase/Firebase";

import devices from "./constants/devices";

import PaymentsList from "./components/PaymentsList";
import AddPayment from "./components/AddPayment";
import LoginModal from "./components/LoginModal";
import DeleteAllModal from "./components/DeleteAllModal";
import Totals from "./components/Totals";
import Button from "./components/Button";

const AppContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #1c061a;

  @media ${devices.tablet} {
  }
`;

export const AuthContext = createContext(null);
export const PaymentsContext = createContext(null);
export const FirebaseContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const handleLogin = (value) => {
    setUser(value);
  };

  const handleClickOnDeleteAll = () => {
    setShowDeleteAllModal(true);
  };

  function fetchData() {
    const q = query(
      collection(Firebase.db, Firebase.paymentsCollection),
      where("deleted", "==", false)
    );
    getDocs(q).then((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => {
        return doc.data();
      });

      setPayments(docs);
    });
  }

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (user) {
    return (
      <AuthContext.Provider value={user}>
        <PaymentsContext.Provider value={[payments, setPayments]}>
          <FirebaseContext.Provider value={fetchData}>
            <AppContainer>
              <AddPayment />
              <PaymentsList />
              <Totals />
              {user === "Juan Cruz" ? (
                <Button
                  onClick={handleClickOnDeleteAll}
                  style={{ backgroundColor: "red" }}
                >
                  Delete all
                </Button>
              ) : null}
              {showDeleteAllModal ? (
                <DeleteAllModal
                  handleClose={() => {
                    setShowDeleteAllModal(false);
                  }}
                />
              ) : null}
            </AppContainer>
          </FirebaseContext.Provider>
        </PaymentsContext.Provider>
      </AuthContext.Provider>
    );
  }

  return <LoginModal handleSubmit={handleLogin} />;
};

export default App;
