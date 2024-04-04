import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBM0wXgP5fHGRzaYKOaEFD-VUaKzGyz4VE",
  authDomain: "lumiere-pweb.firebaseapp.com",
  projectId: "lumiere-pweb",
  storageBucket: "lumiere-pweb.appspot.com",
  messagingSenderId: "596129220953",
  appId: "1:596129220953:web:716ae336262a54399f6448"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }
