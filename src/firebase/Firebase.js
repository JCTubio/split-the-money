// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// import firebase cofig
import firebaseConfig from './config'

// define firebase class
class Firebase {
    constructor(props) {
        this.app = initializeApp(props)
        this.db = getFirestore();
        this.paymentsCollection = 'payments'
    } 
}

// Initialize Firebase and export it (Singleton Pattern)
export default new Firebase(firebaseConfig)
