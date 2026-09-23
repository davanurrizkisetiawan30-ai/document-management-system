import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login'
import Home from './pages/Home';
import Document from './pages/Document';
import User from './pages/User';
import Company from './pages/Company';
import AuditTrail from './pages/AuditTrail';

function App() {

    const location = useLocation();
    const isLogin = location.pathname === "/login"

    return (
        <>
            {!isLogin && <Navbar />}
            <div className={isLogin ? "" : "layout"}>
                {!isLogin && <Sidebar />}
                <main className={isLogin ? "" : "content"}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/document" element={<Document />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/audit-trail" element={<AuditTrail />} />
                        <Route path="/company" element={<Company />} /> 
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default App;