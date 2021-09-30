import { useState, useEffect } from 'react';
import _ from 'lodash';

import { fetchAPI } from 'utils';

import { LeaderBlock } from './components';

const Home = () => {
    const [leaderboard, setLeaderboard] = useState({});

    useEffect(() => {
        fetchAPI('GET', '/leaderboard')
            .then(res => {
                setLeaderboard(res);
            })
            .catch(console.log);

        
    }, []);
    
    return (
        <div>
            {JSON.stringify(leaderboard)}
            {
                _.map(leaderboard.leaderboard, (leader) => {
                    return <LeaderBlock key={leader.id} leader={leader}/>
                })
            }
        </div>
    );
}

export default Home;