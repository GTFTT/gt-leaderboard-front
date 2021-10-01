import { useState, useEffect } from 'react';
import { Select, TextField, MenuItem, Pagination, PaginationItem } from '@mui/material';
import _ from 'lodash';

import { fetchAPI } from 'utils';
import { availableRegions } from 'global';

import { LeaderBlock } from './components';
import Styles from './styles.module.css';

const Home = () => {
    const [leaderboard, setLeaderboard] = useState({});
    const [filters, setFilters] = useState({page: 1, pageSize: 25, query: "", region: ""});

    useEffect(() => {
        fetchAPI('GET', '/leaderboard', filters)
            .then(res => {
                setLeaderboard(res);
            })
            .catch(console.log);
    }, [filters]);
    
    return (
        <div className={Styles.mainCont}>
            <div className={Styles.controlsCont}>
                <div className={Styles.inputCont} >
                    <TextField
                        className={Styles.inputField}
                        id="filled-basic"
                        label="Search..."
                        variant="filled"
                        value={ filters.query }
                        onChange={e => setFilters({...filters, query: e.target.value, page: 1})}
                    />
                    <Select
                        className={Styles.inputSelect}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Region"
                        value={filters.region}
                        onChange={e => setFilters({...filters, region: e.target.value, page: 1})}
                    >
                        {
                            _.map(availableRegions, (region, index) => {
                                return <MenuItem key={index} value={region}>{region}</MenuItem>
                            })
                        }
                        <MenuItem value={""}>All regions</MenuItem>
                    </Select>
                </div>
                <div className={Styles.paginationCont}>
                    <Pagination
                        value={filters.page}
                        count={Math.ceil(_.get(leaderboard, 'stats.count', 0)/filters.pageSize)}
                        shape="rounded"
                        variant="outlined"
                        onChange={(e, value) => setFilters({...filters, page: value})}
                    />
                </div>
            </div>

            {
                _.map(leaderboard.leaderboard, (leader) => {
                    return <LeaderBlock key={leader.id} leader={leader}/>
                })
            }
        </div>
    );
}

export default Home;