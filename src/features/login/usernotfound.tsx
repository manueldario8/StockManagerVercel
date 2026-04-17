import './login.css';
//import Logo from '../../assets/logoapp.jpg'

const UserNotFound = () => {
    return (
        <>
            <main className="login-main-container">
                    <div className="sub-main">
                        <a href="/" className="icon-container"><img src="" alt="logo" /></a>
                        <h3>Parece que todavía no tenés cuenta</h3>
                        <section className="my-form-floating">
                            <section className="verify">
                            <label htmlFor="mailpassed">example@gmail.com</label>
                            <a href="">Cambiar</a>
                            </section>
                            <p>Verifica que el correo usado esté correcto o podés crear una nueva cuenta</p>
                            <a href="#"><button className="goToIdentify">Crear nueva cuenta</button></a>
                        </section>
                        <section className="adviser">
                            <p>¿Ya eres cliente?</p>
                            <br />
                        </section>
                        <a className="registerLink" href="/login">Iniciar sesión</a>
                        <p className="copyright">© 2025–2026</p>
                    </div>
            </main>
        </>
    )
}

export default UserNotFound;