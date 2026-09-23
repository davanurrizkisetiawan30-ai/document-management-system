import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../logic/loginLogic";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="login">
            <div className="login-box">
                <h2>DOCUMENT MANAGEMENT SYSTEM</h2>

                <label>Username</label>
                <input type="text" placeholder="Masukkan Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => {
                    const success = loginUser(username, password);
                    if (success) {
                        navigate("/");
                    } else {
                        setError("Username atau password salah");
                    }}}>Login</button>
                    {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Login;