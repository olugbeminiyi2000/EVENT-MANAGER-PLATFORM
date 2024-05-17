import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserHeader from './UserHeader';
import UserProfile from './UserProfile';
import userAxios from './apis/userApi';
function App2() {
    // create a state to store our logged user
    const [logUser, setLogUser] = useState([]);
    const [noDataFound, setNoDataFound] = useState(null);
    // extract the id parameter from the App2 route path
    // use params returns an object literal of key(urlparameter)
    // and value(urlparametervalue)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getLoggedUser = async (id) => {
            try {
                const loggedUser = await userAxios.get(`/users?id=${id}`);
                loggedUser.data.length ? setNoDataFound(null) : setNoDataFound("No data was found on this user");
                setLogUser(loggedUser.data);
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        getLoggedUser(id);
    }, [id])
    return (
        <div>
            <UserHeader logUser={logUser} navigate={navigate} noDataFound={noDataFound} />
            <Routes>
                <Route path='/' element={<UserProfile logUser={logUser} />}/>
            </Routes>
        </div>
    );
}

export default App2