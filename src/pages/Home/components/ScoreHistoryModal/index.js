import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Modal, Box, Typography, Pagination } from '@mui/material';

import { fetchAPI } from 'utils';

import Styles from './styles.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#555',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ScoreHistoryModal = ({userId}) => {

    const [filters, setFilters] = useState({page: 1, pageSize: 10});
    const [scores, setScores] = useState({});
    const [open, setOpen] = useState(false);

    

    useEffect(() => {
        if(!userId || !open) return;

        fetchAPI('GET', `/users/${userId}/scores`, filters)
            .then(res => {
                setScores(res);
            })
            .catch(console.log);
    }, [ userId, filters, open ]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Scores</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Score history
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {_.map(scores.userScores, (score) => {
                            return <div className={Styles.score}>{score.score}</div>
                        })}
                    </Typography>
                    <div className={Styles.paginationCont}>
                        <Pagination
                            value={filters.page}
                            count={Math.ceil(_.get(scores, 'stats.count', 0)/filters.pageSize)}
                            shape="rounded"
                            variant="outlined"
                            onChange={(e, value) => setFilters({...filters, page: value})}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ScoreHistoryModal;