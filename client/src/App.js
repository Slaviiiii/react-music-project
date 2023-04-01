import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MusicProvider } from "./contexts/MusicContext";

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
    return (
        <AuthProvider>
            <MusicProvider>
                <div id="wrapper">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/allMusic" element={<AllMusic />} />
                            <Route path="/details/:musicId" element={<Details />} />

                            <Route element={<RouteGuard />}>
                                <Route path="/logout" element={<Logout />} />
                            </Route>

                            <Route element={<RouteGuard />}>
                                <Route path="/create" element={<Create />} />
                            </Route>

                            <Route element={<RouteGuard />}>
                                <Route path="/edit/:musicId" element={<Edit />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </MusicProvider>
        </AuthProvider>
    );
}

export default App;