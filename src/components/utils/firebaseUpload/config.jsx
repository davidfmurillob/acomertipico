import { initializeApp } from "firebase/app";
// con getStorage nos conectamos primero al backend
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyCUDQEKp0CC2-ig1-QEYaQU58Per4CkjJk",
  authDomain: "react-imagenes.firebaseapp.com",
  projectId: "react-imagenes",
  storageBucket: "react-imagenes.appspot.com",
  messagingSenderId: "1077523652706",
  appId: "1:1077523652706:web:0b2a6c0af121711a2cb13b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


export async function  uploadFile (file) {
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}