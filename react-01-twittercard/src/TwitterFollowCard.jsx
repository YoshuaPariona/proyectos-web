import { useState } from "react";
import React from "react";

function TwitterFollowCard({ username, name, isfollowing }) {
	const [isFollowing, setIsFollowing] = useState(isfollowing);

	const buttonFollowText = isFollowing ? "Siguiendo" : "Seguir";

	const buttonFollowClass = isFollowing
		? "followButton button-following"
		: "followButton";

	const handleClick = () => {
		setIsFollowing(!isFollowing);
	};

	return (
		<article className="tw-followCard">
			<header>
				<img src={`https://unavatar.io/${username}`} alt="Avatar" />
				<div>
					<strong>{name}</strong>
					<span>@{username}</span>
				</div>
			</header>

			<aside>
				<button className={buttonFollowClass} onClick={handleClick}>
					{buttonFollowText}
				</button>
			</aside>
		</article>
	);
}

export default TwitterFollowCard;
