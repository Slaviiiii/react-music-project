import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as musicService from "./services/musicService";
import { AuthContext } from "./contexts/AuthContext";
import * as authService from "./services/authService";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { AllMusic } from "./components/AllMusic/AllMusic";
import { Create } from "./components/Create/Create";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";

function App() {
  const navigate = useNavigate();
  const [music, setMusic] = useState([]);
  // const [auth, setAuth] = useState({});

  useEffect(() => {
    musicService.getAll()
      .then(result => {
        setMusic(result);
      })
  }, []);

  const onMusicCreateSubmit = async (data) => {
    const newMusic = await musicService.create(data);

    navigate('/allMusic');
    setMusic(state => [...state, newMusic]);
  };

  const onMusicEditSubmit = async (data) => {
    const editedMusic = await musicService.edit(data._id, data);

    navigate(`/details/${data._id}`);
    setMusic(state => state.filter(x => x._id !== editedMusic._id));
    setMusic(state => [...state, editedMusic]);
  };

  const onLoginSubmit = async (data) => {
    try {
      const user = await authService.login(data);
      console.log(user);
      // setAuth(user);
    } catch (err) {
      console.log('Login problem!');
    }
  };

  return (
    <AuthContext.Provider value={{ onLoginSubmit }}>
      <div id="wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allMusic" element={<AllMusic music={music} />} />
            <Route path="/create" element={<Create onMusicCreateSubmit={onMusicCreateSubmit} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:musicId" element={<Details />} />
            <Route path="/edit/:musicId" element={<Edit onMusicEditSubmit={onMusicEditSubmit} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
