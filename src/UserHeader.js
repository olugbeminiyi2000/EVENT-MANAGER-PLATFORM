import { FaShield } from "react-icons/fa6";
const UserHeader = ({ logUser, navigate, noDataFound }) => {
    return (
        <header>
            {logUser.length ? logUser[0].isLoggedin ? (
                <nav>
                    <ul>
                        <li>Profile</li>
                        <li>Create Event</li>
                        <li>Your Events where you can edit and delete</li>
                        <li>Booked Events</li>
                        <li>Settings Page</li>
                    </ul>
                </nav>
            ) : (
                <>
                    <p>Click on the Login button to return to the login page, user not currently looged in :(</p>
                    <FaShield />
                    <button onClick={() => navigate("/login")}>Login</button>
                </>
            ) : noDataFound ? <p>{noDataFound}</p>
                : <p>User profile menu is Loading...</p>
            }
        </header>
    );
}

export default UserHeader;