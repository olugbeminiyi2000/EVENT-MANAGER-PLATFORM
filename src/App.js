import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import AuthLogin from './AuthLogin';
import AuthSignUp from './AuthSignUp';
import EventList from './EventList';
import { useState, useEffect } from 'react';
import userAxios from './apis/userApi';
import { gravatar } from './gravatarUrl';

function App() {
  /*
    At first I need a states management for the login form
    which would be for first_name, last_name, email, username
    and password, and a state for all Users in my user.json.

    Also we need to fetch the data from the database server,
    but the fetch will be done once in a useEffect, because
    our dependency will not change.

    also create a error message for signup error
  */
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [image, setImage] = useState(undefined);
  const [signupError, setSignupError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [noUserAccount, setNoUserAccount] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /*
      now try to use this userAxios to fetch the data
      from the user.json database first, and then set
      the state users which will be used in the AuthSignUp
      and AuthLogin components.
    */
    const fetchUsers = async () => {
      try {
        const usersData = await userAxios.get("/users");
        if (usersData.data.length === 0) {
          setNoUserAccount("No user account account Found !!!")
        }
        setUsers(usersData.data);
      } catch (error) {
        console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
      }
    }
    fetchUsers();
  }, []);

  /*
    A function called handleSignUp is used to check if that
    user has created an account or not verify the passwords
    of the user and also send back the form if password
    verification was unsuccessful or the user already exists
  */
  const handleSignUp = (e) => {
    /*
      prevent the default action of a form
      which is to submit it to a server given
      by action attribute and the request method
      given by the method attribute.
    */
    e.preventDefault();
    // check passwords if they are correct
    if (password !== verifyPassword) {
      setSignupError("Your passwords are not identical check password again :(");
      setPassword('');
      setVerifyPassword('');
      return;
    }
    // check if the users data have not been successfully fetched
    if (users.length === 0) {
      if (noUserAccount) {
        //Do nothing
      } else {
        setSignupError("Data verification in progress. Please wait briefly before resubmitting. Thank you!");
        return;
      }
    }

    // check if the user exists
    const checkUserExist = function (user) {
      if (user.username === username || user.email === email || (user.first_name === first_name && user.last_name === last_name)) {
        return true;
      } else {
        return false;
      }
    }
    const userExists = users.filter(checkUserExist);

    if (userExists.length > 0) {
      setSignupError(`The User ${userExists[0].first_name} ${userExists[0].last_name} with username ${userExists[0].username} and email ${userExists[0].email} already exists`);
      setPassword('');
      setVerifyPassword('');
      return;
    }
    /*
      TODO.
      If the userExists length is 0 (zero), that user doesn't exist and can be added to the database of users, and also the state Users and also redirect to login and also give a success message, also
      change the state of form and signup error.
    */
    // new user id
    let id = users.length ? users.reduce((accumulator, currentValue) => typeof accumulator === "number" ? accumulator > currentValue.id ? accumulator : currentValue.id : accumulator.id > currentValue.id ? accumulator.id : currentValue.id, 0) : 0;
    id = parseInt(id) + 1;
    const isLoggedin = false;
    const gravatarUrl = gravatar(email);
    // note here the id's of endpoints must be in strings
    const newUser = { id: `${id}`, first_name, last_name, username, email, password, isLoggedin, gravatarUrl };
    // first add the data to the state in case someone
    // else wants to create an account before our posted
    // new user works.
    const allUsers = [...users, newUser];
    // post the data to the server
    const addUser = async (user) => {
      try {
        const userData = await userAxios.post(`/users/`, user);
        console.log(userData.data);
      } catch (error) {
        console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`)
      }
    }
    addUser(newUser);
    setUsers(allUsers);
    setFirstName('');
    setLastName('');
    setUserName('');
    setEmail('');
    setPassword('');
    setVerifyPassword('');
    setSignupSuccess('User successfully Created :)');
    navigate("/login");
  }

  const handleLogin = (e) => {
    // prevent the default of submitting a form
    e.preventDefault();
    // a callback function used to filter if that account exists or not
    const checkUserIn = (user) => {
      if (user.username === username && password === user.password) {
        return true;
      } else {
        return false;
      }
    }
    // get the user if it exists or not
    const authenticateUser = users.filter(checkUserIn);
    // if user doesn't exist send an error to the form
    if (authenticateUser.length === 0) {
      setSigninError("This account doesn't exist, sign up to create one :(");
      setSignupSuccess('');
      return;
    }
    /*
      change the isloggedin of that authenticated user to true,
      create a new array of objects haveing the loggedin user
      isLoggedin property changed.

      we have to send patch request for the authenticateUser[0].id,
      to change the user isLoggedin attribute in the database and in the state
    */
    authenticateUser[0].isLoggedin = true;
    let newUserData = users.filter((user) => user.id !== authenticateUser[0].id);
    newUserData = [...newUserData, authenticateUser[0]];
    const changeUserIsLoggedin = async (id) => {
      try {
        const changeIsLoggedIn = await userAxios.patch(`/users/${id}/`, { isLoggedin: true });
        console.log(changeIsLoggedIn);
        navigate(`/user/${id}`)
      } catch (error) {
        console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
      }
    }
    changeUserIsLoggedin(authenticateUser[0].id);
    // if the user exist navigate to the second app which is the user dashboard
    setUsers(newUserData);
    setPassword('');
    setUserName('');
  }
  return (
    <div className='App'>
      <HomeHeader />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<AuthLogin signupSuccess={signupSuccess} username={username} password={password} setUserName={setUserName} setPassword={setPassword} handleLogin={handleLogin} signinError={signinError} />} />
        <Route path="/signup" element={<AuthSignUp first_name={first_name} last_name={last_name} email={email} username={username} password={password} image={image} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setUserName={setUserName} setPassword={setPassword} signupError={signupError} handleSignUp={handleSignUp} verifyPassword={verifyPassword} setVerifyPassword={setVerifyPassword} setImage={setImage} />} />
      </Routes>
    </div>
  );
}

export default App;
