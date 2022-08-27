import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import ProfileMenu from "../ProfileMenu";
import ImageFormModal from "../ImageFormModal";

import "./index.css";
const NavBar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((state) => state.session.user);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<div>
			<ImageFormModal
				className="create_new_image_button"
				showModal={showModal}
				setShowModal={setShowModal}
				onClose={() => setShowModal(false)}
			/>
			<nav className="nav-bar-container">
				<div className="nav-bar-logo-container">
					<Link
						title="Instagram / Mackey Saturday, Public domain, via Wikimedia Commons"
						to="/"
					>
						<img
							alt="Instagram logo"
							src="https://res.cloudinary.com/hansenguo/image/upload/v1661536371/TheGramme/logo1_oxkgrb.png"
							className="logo"
						/>
					</Link>
				</div>
				<div className="nav-bar-icons">
					<div className="nav-bar">
						<div className="nav-bar-li">
							<NavLink
								to="/"
								exact={true}
								activeClassName="active"
								className="nav-bar-link"
							>
								<i className="fa-solid fa-house icon"></i>
							</NavLink>
							<NavLink to="/" className="nav-bar-link">
								<i
									className="fa-regular fa-square-plus icon"
									onClick={() => setShowModal(!showModal)}
								></i>
							</NavLink>
							
							<div
								onClick={() => setShowMenu(!showMenu)}
								className="profile-pic-anchor"
							>
								<img
									src={user.profile_img}
									style={{ width: "24px", cursor: "pointer" }}
									alt="profile"
								></img>
								<ProfileMenu
									showMenu={showMenu}
									userId={user.id}
								></ProfileMenu>
							</div>
						</div>
						{/* <li className="nav-bar-li">
						<NavLink
							to="/login"
							exact={true}
							activeClassName="active"
							className="nav-bar-link"
						>
							Login
						</NavLink>
					</li>
					<li className="nav-bar-li">
						<NavLink
							to="/sign-up"
							exact={true}
							activeClassName="active"
							className="nav-bar-link"
						>
							Sign Up
						</NavLink>
					</li> */}
						{/* <li className="nav-bar-li">
						<NavLink
							to="/users"
							exact={true}
							activeClassName="active"
							className="nav-bar-link"
						>
							Users
						</NavLink>
					</li> */}

						{/* <div> */}

						{/* </div> */}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
