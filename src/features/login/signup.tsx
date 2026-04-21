import './login.css';
import { Logo } from '../../exports';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { API_ROUTES, API_BASE_URL } from '../../api/config';


const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [completeName, setCompleteName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("URL que va a llamar:", `${API_BASE_URL}${API_ROUTES.users}`);
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);

      await apiClient<void>(API_ROUTES.users, {  
        method: 'POST',
        body: JSON.stringify({ email, completeName, password }),
      });

      navigate('/login');
    } catch (err: any) {
      setError(err.message ?? 'Error al crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sub-main">
      <a href="/"><img src={Logo} alt="Logo" /></a>
      <h3>Crear una cuenta</h3>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="my-form-floating">
        <section className="inner-sec-form">
          <section className="info-inputs">

            <section className="form-dt">
              <label>Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </section>

            <section className="form-dt">
              <label>Nombre y apellido</label>
              <input
                type="text"
                className="form-control"
                value={completeName}
                onChange={(e) => setCompleteName(e.target.value)}
                required
              />
            </section>

            <section className="form-dt">
              <label>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 10, top: 14, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </section>

          </section>
        </section>

        <section className="ad-icon">
          <i className="fa-solid fa-circle-exclamation"></i>
          <label>Las contraseñas deben tener al menos 6 caracteres</label>
        </section>

        <section className="inner-sec-form">
          <section className="form-dt">
            <label>Repetir contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </section>
        </section>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <Link to="/login" className="link">¿Ya tenés cuenta? Iniciá sesión</Link>
      </form>

      <section className="adviser">
        <p>
          Al continuar, aceptás las <a href="/conditions">Condiciones de uso</a> y el{' '}
          <a href="/privacy">Aviso de privacidad</a> de este sitio
        </p>
        <br />
        <p className="copyright">© 2025–2026</p>
      </section>
    </div>
  );
};

export default SignUp;