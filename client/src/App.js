import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { musicServiceFactory } from "./services/musicService";
import { AuthProvider } from "./contexts/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { AllMusic } from "./components/AllMusic/AllMusic";
import { Create } from "./components/Create/Create";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { Logout } from "./components/Logout/Logout";
import { RouteGuard } from "./components/common/RouteGuard";

function App() {
    const navigate = useNavigate();
    const [music, setMusic] = useState([]);
    const [auth, setAuth] = useLocalStorage("auth", {});

    let musicService = musicServiceFactory(null);
    if (auth) {
        musicService = musicServiceFactory(auth.accessToken);
    }

    useEffect(() => {
        musicService.getAll()
            .then(result => {
                setMusic(result);
            })
    }, []);

    const onDelete = async (musicId) => {
        const result = window.confirm("Are you sure you want to delete this music?");

        if (result === true) {
            await musicService.deleteFunc(musicId);

            setMusic(state => state.filter(x => x._id !== musicId));
            navigate('/allMusic');
        }
    };

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

    return (
        <AuthProvider>
            <div id="wrapper">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/allMusic" element={<AllMusic music={music} />} />

                        <Route element={<RouteGuard />}>
                            <Route path="/logout" element={<Logout />} />
                        </Route>

                        <Route element={<RouteGuard />}>
                            <Route path="/create" element={<Create onMusicCreateSubmit={onMusicCreateSubmit} />} />
                        </Route>

                        <Route element={<RouteGuard />}>
                            <Route path="/edit/:musicId" element={<Edit onMusicEditSubmit={onMusicEditSubmit} />} />
                        </Route>

                        <Route element={<RouteGuard />}>
                            <Route path="/details/:musicId" element={<Details onDelete={onDelete} />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
