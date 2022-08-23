import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./profilemenu.css";
function ProfileMenu({ showMenu, userId }) {
	return (
		<div className="profile-menu">
			{showMenu && (
				<div>
                    <Link className="profile-menu-link" to={`/${userId}`}>
                        <i class="fa-regular fa-circle-user"></i>
						<p className="nav-bar-p ">Profile</p>
					</Link>

					<p className="nav-bar-p logout">
						<LogoutButton />
					</p>
				</div>
			)}
		</div>
	);
}

export default ProfileMenu;
