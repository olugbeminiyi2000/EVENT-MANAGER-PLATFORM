const AuthLogin = ({ signupSuccess, username, password, setUserName, setPassword, signinError, handleLogin }) => {
    return (
        <section>
            {signupSuccess ? (<p>
                {signupSuccess}
            </p>) : null}
            {signinError ? (
                <p>{signinError}</p>
            ) : null}
            <h1>Login Here :)</h1>
            <form onSubmit={handleLogin}>
                <p>
                    <label htmlFor="username">username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <button
                    type="submit"
                >
                    Login
                </button>
            </form>
        </section>
    );
}

export default AuthLogin