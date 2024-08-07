import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import Filter from "bad-words";

import { computed, onUnmounted, ref } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyDSrh9IbpIjDDii8p0xIUMwGx71S7O-3To",
  authDomain: "probspace-5615e.firebaseapp.com",
  projectId: "probspace-5615e",
  storageBucket: "probspace-5615e.appspot.com",
  messagingSenderId: "205665459250",
  appId: "1:205665459250:web:60abc9c64f179acd66302b",
  measurementId: "G-7XCWQXJ7BX",
  databaseURL: "https://probspace-5615e-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export function useAuth() {
  const user = ref(null);
  const unsubscribe = onAuthStateChanged(auth, (_user) => {
    user.value = _user;
  });
  onUnmounted(unsubscribe);

  const isLogin = computed(() => user.value !== null);

  const login = async () => {
    const githubProvider = new GithubAuthProvider();
    await signInWithPopup(auth, githubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        user.value = result.user;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginAnonymously = async () => {
    await signInAnonymously(auth)
      .then(() => {
        user.value = auth.currentUser;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        user.value = null;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { user, isLogin, login, logOut, loginAnonymously };
}

const messageQuery = query(
  collection(db, "messages"),
  orderBy("createdAt", "asc") // Ascending order
);

export function useChat() {
  const messages = ref([]);
  const filter = new Filter();
  const { isLogin, user } = useAuth();

  const sendMessage = async (text) => {
    if (!isLogin.value) {
      return;
    }
    const { uid, photoURL, displayName } = user.value;

    await addDoc(collection(db, "messages"), {
      text: filter.clean(text),
      createdAt: new Date(),
      uid,
      photoURL,
      displayName,
    });
  };

  onSnapshot(messageQuery, (querySnapshot) => {
    messages.value = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });

  return { messages, sendMessage };
}
