import { FaDatabase, FaSpinner } from "react-icons/fa6";

const UserProfile = ({ logUser, noDataFound, new_first_name, new_last_name, new_email, new_username, new_password, imageUrl, handleImageUpload, setNewFirstName, setNewLastName, setNewEmail, setNewUserName, setNewPassword, imageName, handleUpdate, updateMessage }) => {
    const inputFileStyle = {
        display: "none",

    };
    const LabelFileStyle = {
        cursor: "pointer",
    }
    return (
        <section>
            {logUser.length ? logUser[0].isLoggedin ? (
                <div>
                    <div>
                        <div>
                            <div><img src={imageUrl} alt="User's profile pic" /></div>
                            <div>
                                <p>Upload a Newphoto</p>
                                <p>{imageName}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="imageUpload" style={LabelFileStyle}>Upload</label>
                            <input style={inputFileStyle} type="file" id="imageUpload" accept="image/*" onChange={(e) => handleImageUpload(e, logUser[0].id)} />
                        </div>
                    </div>
                    <div>
                        <form method="post" onSubmit={(e) => handleUpdate(e, logUser[0].id)}>
                            {updateMessage ? (<div className="updateMessage">{updateMessage}</div>) : null}
                            <div>
                                <p>
                                    <label htmlFor="first_name">firstname</label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={new_first_name}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="last_name">lastname</label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={new_last_name}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div>
                                <p>
                                    <label htmlFor="email">email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={new_email}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="username">username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={new_username}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div>
                                <p>
                                    <label htmlFor="password">password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={new_password}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                >
                                    Update Information
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <p>Do the suggestion above</p>
            ) : noDataFound ?
                <>
                    <FaDatabase />
                </>
                : <>
                    <FaSpinner />
                </>
            }
        </section>
    );
}

export default UserProfile;