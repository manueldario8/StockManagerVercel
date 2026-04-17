import './login.css';
import { Logo } from '../../exports';


const SignUp = () => {
    return (
        <>
            <div className="sub-main">
                <a href="/"><img src={Logo} alt="Logo" /></a>
                <h3>Crear una cuenta</h3>
                <form action="" className='my-form-floating'>
                    <section className='inner-sec-form'>
                        
                        <section className="info-inputs">
                            <section className="form-dt">
                                <label htmlFor="">Ingresa un correo electrónico</label>
                                <input type="mail" required/></section>
                            <section className="form-dt">
                                <label htmlFor="">Nombre y apellido</label>
                                <input type="text" required/></section>
                            <section className="form-dt">
                                <label htmlFor="">Contraseña</label>
                                <input type="text" required minLength={6}/></section>
                        </section>
                    </section>
                    <section className='ad-icon'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <label htmlFor="">Las contraseñas deben tener al menos 6 caracteres</label>
                    </section>
                    <section className='inner-sec-form'>
                        <section className="form-dt">
                        <label htmlFor="">Vuelva a escribir la contraseña</label>
                        <input type="text" required minLength={6}/></section></section>
                    <button type='submit'>Crear cuenta</button>

                </form>
                <section className="adviser">
                    <p>Al continuar, aceptas las <a href="/conditions">Condiciones de uso</a> y el <a href="/privacy">Aviso de privacidad</a> de este sitio</p>
                    <br /><p className="copyright">© 2025–2026</p>
                </section>
                
            </div>

        </>
    )
}

export default SignUp;
