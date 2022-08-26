import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import { authenticate } from "./store/session";
import Profile from "./components/Images/Profile";
import HomePage from "./components/HomePage";


function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);
	let user = useSelector((state) => state.session.user);
	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<>{user ? <NavBar /> : null}</>

			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/:userId">
					<Profile />
				</ProtectedRoute>
				{/* <ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute> */}
				<ProtectedRoute path="/" exact={true}>
					<HomePage />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
