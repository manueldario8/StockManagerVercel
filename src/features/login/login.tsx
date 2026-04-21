import "./login.css";
import { Logo } from "../../exports";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../api/authService";

const Login = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleEmailSubmit = (e: any) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Introduce un email válido.");
            return;
        }
        setError("");
        setStep(2);
    };


    const handlePasswordSubmit = async (
        e: any) => {
        e.preventDefault();

        if (!password.trim()) {
            setError("La contraseña es obligatoria");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await authService.login({ email, password });

            navigate("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sub-main">
            <a href="/" className="icon-container"><img src={Logo} alt="logo" /></a>
            {error && <p className="error-text">{error}</p>}
            {step === 1 && (
                <>

                    <h3>Inicia sesión o crea una cuenta</h3>
                    <form onSubmit={handleEmailSubmit} className="my-form-floating">
                        <section className="form-dt">
                            <label>Introduce el correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </section>

                        <button type="submit" className="submit-button">{loading ? "Cargando..." : "Continuar"}</button>

                        <section className="adviser">
                            <p>
                                Al continuar, aceptas las{" "}
                                <Link to="/conditions">Condiciones de uso</Link> y el{" "}
                                <Link to="/privacy">Aviso de privacidad</Link>.
                            </p>
                        </section>

                        <Link to="/signup" className="link">
                            Registrarme
                        </Link>
                    </form>

                </>
            )}

            {step === 2 && (
                <>
                    <h3>Iniciar sesión</h3>
                    <p className="email-preview"> {email}{" "} <button type="button" onClick={() => setStep(1)} className="edit-btn">Cambiar</button></p>

                    <form onSubmit={handlePasswordSubmit} className="my-form-floating">
                        <section className="form-dt">
                            <label>Contraseña</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: 10,
                                        top: 14,
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </section>

                        <button type="submit" className="submit-button" disabled={loading}>{loading ? "Iniciando sesión..." : "Iniciar sesión"}</button>
                    </form>
                    <section className="adviser">
                        <p>Al iniciar sesión, aceptas las <a href="/conditions">Condiciones de uso</a> y el <a href="/privacy">Aviso de privacidad</a> de este sitio</p>
                        <br />
                        <a href="#">¿Necesitas ayuda?</a>
                    </section>
                </>
            )}

            <p className="copyright">© 2025–2026</p>
        </div>
    );
};

export default Login;
