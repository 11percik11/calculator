import  './Login.css';
export const Login = () => {
    return (
        <div className='container'>
            <div className='card'>
                <h2 className='title'>Вход</h2>
                <form className='form'>
                    <input
                        type="email"
                        placeholder="Email"
                        className='input'
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        className='input'
                    />
                    <button className='button'>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;