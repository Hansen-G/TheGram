import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";

import "./LoginSignupForm.css";
const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [name, setName] = useState("");
	const [index, setIndex] = useState(0);
	const [url, setUrl] = useState(
		"https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png"
	);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const imageArr = [
			"https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png",
			"https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png",
			"https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png",
			// "https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png", // Has instagram logo
		];
		let roulette = setInterval(() => {
			if (index === 2) setIndex(0);
			else setIndex((index) => index + 1);
			return setUrl(imageArr[index]);
		}, 5000);
		return () => clearInterval(roulette);
	}, [index, url]);

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(username, email, password, name)
			);
			if (data) {
				setErrors(data);
			}
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateName = (e) => {
		setName(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="master-container">
			<div className="phone-anchor">
				<div className="phone">
					<img className="roulette" src={url} alt="roulette" />
					<img
						src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
						alt="phone"
					/>
				</div>
			</div>

			<div className="master-form-container">
				<div className="lrg-logo-container">
					<img
						className="login-logo"
						src="https://res.cloudinary.com/hansenguo/image/upload/v1661536371/TheGramme/logo1_oxkgrb.png"
						alt="logo"
					/>
				</div>
				<div>
					<form onSubmit={onSignUp}>
						<div>
							{errors.map((error, ind) => (
								<div key={ind}>{error}</div>
							))}
						</div>
						<div>
							{/* <label>User Name</label> */}
							<input
								type="text"
								name="username"
								placeholder="Username"
								onChange={updateUsername}
								value={username}
								className="verification-form-input"
								required={true}
							></input>
						</div>
						<div>
							{/* <label>Name</label> */}
							<input
								type="text"
								name="name"
								placeholder="Name"
								onChange={updateName}
								value={name}
								className="verification-form-input"
								required={true}
							></input>
						</div>
						<div>
							{/* <label>Email</label> */}
							<input
								type="email"
								name="email"
								placeholder="Email"
								onChange={updateEmail}
								value={email}
								className="verification-form-input"
								required={true}
							></input>
						</div>
						<div>
							{/* <label>Password</label> */}
							<input
								type="password"
								name="password"
								placeholder="Password"
								onChange={updatePassword}
								value={password}
								className="verification-form-input"
								required={true}
							></input>
						</div>
						<div>
							{/* <label>Repeat Password</label> */}
							<input
								type="password"
								name="repeat_password"
								placeholder="Repeat Password"
								onChange={updateRepeatPassword}
								value={repeatPassword}
								required={true}
								className="verification-form-input"
							></input>
						</div>
						<button type="submit" className="submit-btn">
							Sign Up
						</button>
					</form>
				</div>
				<div className="switch-method">
					<div className="switch-method-content">
						Already have an account?{" "}
						<Link to={"/login"} className="switch-method-lnk">
							Log In
						</Link>
					</div>
				</div>
			</div>
		</div>
		//
	);
};

export default SignUpForm;
