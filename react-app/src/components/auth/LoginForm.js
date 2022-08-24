import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginSignupForm.css";
const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [index, setIndex] = useState(0);
	const [url, setUrl] = useState(
		"https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png"
	);
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const imageArr = [
		"https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png",
		"https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png",
		"https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png",
		"https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png",
	];
	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const demoLogin = async () => {
		await dispatch(login("demo@aa.io", "password"));
	};

	useEffect(() => {
		let clean = setInterval(() => {
			console.log("roulette fire off", index);
			if (index === 3) {
				setIndex(0);
			} else {
				setIndex((index) => index + 1);
			}
			console.log(imageArr[index]);
			setUrl(imageArr[index]);
			return url;
		}, 5000);
		return () => clearInterval(clean);
	}, [index]);

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="master-container">
			<div className="phone-anchor">
				<div className="phone">
					<img className="roulette" src={url} />
					<img src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" />
				</div>
			</div>
			<div>
				<div className="master-form-container">
					<div className="lrg-logo-container">
						<img
							className=""
							src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
						/>
					</div>
					<div>
						<form onSubmit={onLogin}>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								{/* <label htmlFor='email'>Email</label> */}
								<input
									name="email"
									type="email"
									placeholder="Email"
									value={email}
									onChange={updateEmail}
                  className="verification-form-input"
                  required={true}
								/>
							</div>
							<div>
								{/* <label htmlFor='password'>Password</label> */}
								<input
									name="password"
									type="password"
									placeholder="Password"
									value={password}
									onChange={updatePassword}
                  className="verification-form-input"
                  required={true}
								/>
							</div>
							<button
								type="submit"
								className={`submit-btn ${
									email.length < 6 || password.length < 6
										? "disabled"
										: ""
								}`}
							>
								Log In
							</button>
            </form>
            
						<div className="or-container">
							<div className="line"></div>
							<div className="or">OR</div>
							<div className="line"></div>
						</div>
						<button className="submit-btn demo" onClick={demoLogin}>
							Demo
						</button>
					</div>
				</div>
				<div className="switch-method">
					<div className="switch-method-content">
						Don't have an account?{" "}
						<Link to={"/sign-up"} className="switch-method-lnk">
							Sign Up
						</Link>
					</div>
				</div>
				{/* <div className="switch-method">
					<div className="switch-method-content">
						
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default LoginForm;
