import { FaDatabase, FaSpinner } from "react-icons/fa6";

const UserProfile = ({ logUser, noDataFound }) => {
    return (
        <section>
            {logUser.length ? logUser[0].isLoggedin ? (
                <div>
                    <p><img src={logUser[0].gravatarUrl} alt="User's gravatar" /></p>
                    <p>{logUser[0].first_name}</p>
                    <p>{logUser[0].last_name}</p>
                    <p>{logUser[0].username}</p>
                    <p>{logUser[0].email}</p>
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