const AuthSignUp = ({ first_name, last_name, email, username, password, setFirstName, setLastName, setEmail, setUserName, setPassword, handleSignUp, signupError, verifyPassword, setVerifyPassword }) => {
    return (
        <form method="post" encType="multipart/form-data" onSubmit={handleSignUp}>
            {signupError ? (<p className="signupError">
                {signupError}
            </p>) : null}
            <p>
                <label htmlFor="first_name">firstname</label>
                <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="last_name">lastname</label>
                <input
                    id="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </p>
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
            <p>
                <label htmlFor="verify_password">Verify password</label>
                <input
                    id="verify_password"
                    type="password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />
            </p>
            <button
                type="submit"
            >
                Sign up
            </button>
        </form>
    );
}

export default AuthSignUp