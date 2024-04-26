import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Firebase from './img/Firebase.png';
import './App.css';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAoogMI9_8TPNQa84jgIhq82kUFBS0DLbA",
  authDomain: "etec-e956f.firebaseapp.com",
  projectId: "etec-e956f",
  storageBucket: "etec-e956f.appspot.com",
  messagingSenderId: "854672994423",
  appId: "1:854672994423:web:1b8e803937624c353c5672",
  measurementId: "G-NHEWFX3PF7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const userCredential = await firebase.auth().signOut(email, password);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      
      setUser(null);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>    
      <img src={Firebase} alt="Firebase"/>
      <div className="container">
        <h1>Autenticar</h1>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <button onClick={handleGoogleLogin}>Entrar com Google</button>
        {error && <p className="erro">{error}</p>}
        {user && (
          <div className="resultado">
            <h2>Dados do Usuário:</h2>
            <p>Nome: {user.displayName || 'Não fornecido'}</p>
            <p>Email: {user.email}</p>
            <p>ID do Usuário: {user.uid}</p>
            <button className="sair" onClick={handleLogout}>Sair</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
