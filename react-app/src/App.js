import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Profile from "./components/Images/Profile";
import HomePage from "./components/HomePage";
import LoadingPage from "./components/LoadingPage";

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
				<Route path="/load" exact={true}>
					<LoadingPage />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/" exact={true}>
					<HomePage />
				</ProtectedRoute>
				<ProtectedRoute exact={true} to={/^\/\d+/}>
					<Profile />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
