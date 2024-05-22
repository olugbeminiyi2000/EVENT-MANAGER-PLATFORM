import { FaShield } from "react-icons/fa6";
import { Link } from "react-router-dom";
import userAxios from "./apis/userApi";

const UserHeader = ({ logUser, navigate, noDataFound, users, setUsers }) => {
    const handleLogOut = () => {
        // get the users that are not this logged user
        let allUsers = users.filter((user) => user.id !== logUser[0].id);
        // now change the login status of the logged user to false
        logUser[0].isLoggedin = false;
        // now create a new array to store the logged in user and all other users
        allUsers = [...allUsers, logUser[0]];
        // create a function to patch this isloggedin status to the data base
        const logOutUser = async (id) => {
            try {
                const changeIsLoggedIn = await userAxios.patch(`/users/${id}/`, { isLoggedin: false });
                console.log(changeIsLoggedIn);
                console.log(users);
                navigate("/");
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        logOutUser(logUser[0].id);
        setUsers(allUsers);
    }
    return (
        <header>
            {logUser.length ? logUser[0].isLoggedin ? (
                <nav>
                    <ul>
                        <li><Link to={`/user/${logUser[0].id}/`}>Profile</Link></li>
                        <li><Link to={`/user/${logUser[0].id}/create`}>Create Event</Link></li>
                        <li><Link to={`/user/${logUser[0].id}/events`}>Your Events</Link></li>
                        <li><Link to={`/user/${logUser[0].id}/booked`}>Booked Events</Link></li>
                        <li>
                            <button
                                type="button"
                                onClick={handleLogOut}
                            >
                                logout
                            </button>
                        </li>
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