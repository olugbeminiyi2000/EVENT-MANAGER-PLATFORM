import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserHeader from './UserHeader';
import UserProfile from './UserProfile';
import UserCreate from './UserCreate';
import UserEventList from './UserEventList';
import UserEvent from './UserEvent';
import UserBookedEventList from './UserBookedEventList';
import UserEditEvent from './UserEditEvent';
import userAxios from './apis/userApi';

function App2() {
    // create a state to store our logged user
    const [logUser, setLogUser] = useState([]);
    const [noDataFound, setNoDataFound] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [new_first_name, setNewFirstName] = useState('');
    const [new_last_name, setNewLastName] = useState('');
    const [new_email, setNewEmail] = useState('');
    const [new_username, setNewUserName] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [isEventDataGotten, setisEventDataGotten] = useState(null);
    const [isDataGotten, setIsDataGotten] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');

    // extract the id parameter from the App2 route path
    // use params returns an object literal of key(urlparameter)
    // and value(urlparametervalue)
    const { id } = useParams();
    const navigate = useNavigate();

    /*
        initialize database first, inorder to prevent errors

        handle imageupload next and if the image is uploaded
        set our imageUrl to that uploaded image and save it to
        the db whatever happens if indexdb fails or not we don't
        have to worry, because since our state already hass the
        uploaded image, it's fine the only thing is if the page
        reload retrieving the image if it was not saved will not
        be possible that's why we setimageurl to gravatar

        Saving the image to the indexdb is also necessary to be
        the first thing to do after uploading the image based on
        the loggedin user

        here we would be using the indexDb of the web browser
        to take the uploaded image we saved and put the path
        in a state, and if it is not we would put our gravatar
        url in that state rather.

        for errors that opening when opening connection to db
        or transaction error set the onerror event attributes
        to setImageUrl to gravatarUrl
    */
    const initializeDB = () => {
        const request = indexedDB.open('imageDB', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('images')) {
                db.createObjectStore('images', { keyPath: 'id' });
            }
        };

        request.onsuccess = function () {
            console.log('Database initialized successfully');
        };

        request.onerror = function (event) {
            console.error('Database initialization error:', event.target.errorCode);
        };
    };

    const handleImageUpload = (event, userId) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageData = e.target.result;
                saveImageToDB(imageData, userId);
                setImageUrl(imageData);
                setImageName(file.name);
            };
            reader.readAsDataURL(file);
        }
    }

    const saveImageToDB = (imageData, userId) => {
        const request = indexedDB.open('imageDB', 1);
        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            store.put({ id: `${userId}`, data: imageData });
        };
    }
    const loadImageFromDb = (gravatarUrl, userId) => {
        //make a request to the database based string and int
        // we used to save it.
        const request = indexedDB.open('imageDB', 1);
        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const getRequest = store.get(`${userId}`);
            getRequest.onsuccess = function (event) {
                const result = event.target.result;
                if (result) {
                    setImageUrl(result.data);
                } else {
                    setImageUrl(gravatarUrl);
                }
            };
        };

        request.onerror = function () {
            setImageUrl(gravatarUrl);
        }
    }
    const handleUpdate = (e, id) => {
        e.preventDefault();
        // check if the user exists
        const checkUserUpdateExist = function (user) {
            const arrayOfBool = [];
            let boolVar_1 = null;
            let boolVar_2 = null;

            if (user.username === new_username) {
                if (user.username === username) {
                    arrayOfBool.push(false);
                } else {
                    arrayOfBool.push(true);
                }
            }
            if (user.username !== new_username) {
                arrayOfBool.push(false);
            }
            if (user.email === new_email) {
                if (user.email === email) {
                    arrayOfBool.push(false);
                } else {
                    arrayOfBool.push(true);
                }
            }
            if (user.email !== new_email) {
                arrayOfBool.push(false);
            }
            if (user.first_name === new_first_name.toUpperCase()) {
                console.log(user.first_name, new_first_name.toUpperCase())
                if (user.first_name === first_name) {
                    boolVar_1 = false;
                } else {
                    boolVar_1 = true;
                }
            }
            if (user.first_name !== new_first_name.toUpperCase()) {
                boolVar_1 = false;

            }
            if (user.last_name === new_last_name.toUpperCase()) {
                console.log(user.last_name, new_last_name.toUpperCase())
                if (user.last_name === last_name) {
                    boolVar_2 = false;
                } else {
                    boolVar_2 = true;
                }
            }
            if (user.last_name !== new_last_name.toUpperCase()) {
                boolVar_2 = false;
            }
            if (user.first_name === new_first_name.toUpperCase() && user.last_name === new_last_name.toUpperCase() && boolVar_1 !== boolVar_2) {
                arrayOfBool.push(true);
            }
            if (user.first_name === new_first_name.toUpperCase() && user.last_name === new_last_name.toUpperCase() && boolVar_1 === true && boolVar_2 === true) {
                arrayOfBool.push(true);
            } else {
                arrayOfBool.push(false);
            }
            if (arrayOfBool.includes(true)) {
                return true;
            } else {
                return false;
            }

        }
        const userExists = users.filter(checkUserUpdateExist);
        // not using password

        if (userExists.length > 0) {
            setUpdateMessage(`The User ${userExists[0].first_name} ${userExists[0].last_name} with username ${userExists[0].username} and email ${userExists[0].email} already exists`);
            return;
        }

        if (userExists.length === 0) {
            if (!isDataGotten) {
                setUpdateMessage(`Data is currently being fetched, trying submitting update after few minutes`)
                return;
            }
        }
        let newUserData = users.filter((user) => user.id !== id);
        newUserData = [...newUserData, { id, first_name: new_first_name.toUpperCase(), last_name: new_last_name.toUpperCase(), username: new_username, email: new_email, password: new_password, isLoggedin: logUser[0].isLoggedin, gravatarUrl: logUser[0].gravatarUrl }];
        // post the data to the server
        const updateUser = async (id) => {
            try {
                const _ = await userAxios.put(`/users/${id}`, { id: `${id}`, first_name: new_first_name.toUpperCase(), last_name: new_last_name.toUpperCase(), username: new_username, email: new_email, password: new_password, isLoggedin: logUser[0].isLoggedin, gravatarUrl: logUser[0].gravatarUrl });
                console.log(_);
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`)
            }
        }
        updateUser(id);
        setUsers(newUserData);
        setFirstName(new_first_name.toUpperCase());
        setLastName(new_last_name.toUpperCase());
        setEmail(new_email);
        setUserName(new_username);
        setPassword(new_password);
        setNewPassword(new_password);
        setNewFirstName(new_first_name.toUpperCase());
        setNewLastName(new_last_name.toUpperCase());
        setNewEmail(new_email);
        setNewUserName(new_username);
        setUpdateMessage('Information updated successfully!!!');
        navigate(`/user/${id}`);
    }

    useEffect(() => {
        const getLoggedUser = async (id) => {
            try {
                const loggedUser = await userAxios.get(`/users?id=${id}`);
                if (loggedUser.data.length) {
                    // Call this function when your application loads
                    initializeDB();
                    // loadImage from indexDB or use gravatarUrl
                    loadImageFromDb(loggedUser.data[0].gravatarUrl, id);
                    setNoDataFound(null);
                    setLogUser(loggedUser.data);
                    setFirstName(loggedUser.data[0].first_name);
                    setLastName(loggedUser.data[0].last_name);
                    setEmail(loggedUser.data[0].email);
                    setUserName(loggedUser.data[0].username);
                    setPassword(loggedUser.data[0].password);
                    setNewFirstName(loggedUser.data[0].first_name);
                    setNewLastName(loggedUser.data[0].last_name);
                    setNewEmail(loggedUser.data[0].email);
                    setNewUserName(loggedUser.data[0].username);
                    setNewPassword(loggedUser.data[0].password);
                } else {
                    setNoDataFound("No data was found on this user");
                }
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        getLoggedUser(id);
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await userAxios.get("/users");
                setUsers(usersData.data);
                setIsDataGotten("Do nothing since data is gotten")
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await userAxios.get("/events");
                setEvents(eventsData.data);
                setisEventDataGotten("Do nothing since data is gotten");
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        fetchEvents();
    }, []);


    return (
        <div>
            <UserHeader logUser={logUser} navigate={navigate} noDataFound={noDataFound} users={users} setUsers={setUsers}/>
            <Routes>
                <Route path='/' element={<UserProfile logUser={logUser} noDataFound={noDataFound} new_first_name={new_first_name} new_last_name={new_last_name} new_email={new_email} new_username={new_username} new_password={new_password} imageUrl={imageUrl} setNewFirstName={setNewFirstName} setNewLastName={setNewLastName} setNewEmail={setNewEmail} setNewUserName={setNewUserName} setNewPassword={setNewPassword} handleImageUpload={handleImageUpload} imageName={imageName} handleUpdate={handleUpdate} updateMessage={updateMessage} />} />
                <Route path='/create' element={<UserCreate isEventDataGotten={isEventDataGotten} userId={id} events={events} setEvents={setEvents} logUser={logUser} />} />
                <Route path='/events' element={<UserEventList userId={id} events={events} logUser={logUser} />} />
                <Route path='/booked' element={<UserBookedEventList userId={id} events={events} logUser={logUser} />} />
                <Route path='/event/:id' element={<UserEvent events={events} logUser={logUser} navigate={navigate} setEvents={setEvents} userId={id} />} />
                <Route path='/edit/:id' element={<UserEditEvent events={events} logUser={logUser} navigate={navigate} setEvents={setEvents} userId={id} />} />
            </Routes>
        </div>
    );
}

export default App2