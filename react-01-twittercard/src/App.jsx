import React from 'react';
import TwitterFollowCard from './TwitterFollowCard.jsx';

function App() {
	return (
		<section>
			<TwitterFollowCard
				username='jonmircha'
				name='Jonathan MirCha'
				isfollowing={true}
			/>
			<TwitterFollowCard username='pheralb' name='Pablo' isfollowing={false} />
			<TwitterFollowCard
				username='midudev'
				name='Miguel Ángel Durán'
				isfollowing={true}
			/>
		</section>
	);
}

export default App;
