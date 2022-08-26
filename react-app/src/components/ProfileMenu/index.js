import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./profilemenu.css";
function ProfileMenu({ showMenu, userId }) {
	return (
		<div className="profile-menu">
			{showMenu && (
				<div>
					<Link className="profile-menu-link" to={`/${userId}`}>
						<i className="fa-regular fa-circle-user"></i>
						<p className="nav-bar-p ">Profile</p>
					</Link>

					<div className="nav-bar-p logout">
						<LogoutButton />
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfileMenu;
