import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Document from './pages/Document';
import User from './pages/User';
import AuditTrail from './pages/AuditTrail';

function App() {
    return (
        <>
            <Navbar />
            <div className="layout">
                <Sidebar />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/document" element={<Document />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/audit-trail" element={<AuditTrail />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default App;