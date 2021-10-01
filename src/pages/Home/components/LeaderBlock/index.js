import { useState } from 'react';
import _ from 'lodash';
import { Popover } from '@mui/material';

import Styles from './styles.module.css';

import { ScoreHistoryModal } from './../index'

/**
 * This blocks shows a user
 * @param {*} props.leader - user
 * @returns 
 */
const LeaderBlock = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className={ Styles.mainCont }>
            <div
                className={Styles.numberCont}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {props.leader.rowNumber}
            </div>

            <div className={Styles.nameCont}>
                {`${_.get(props, 'leader.firstName', '')} ${_.get(props, 'leader.lastName', '')}`}
            </div>

            <span><ScoreHistoryModal userId={props.leader.id} /></span>

            <div className={Styles.ratingCont}>{props.leader.rating}</div>

            <Popover
                id="mouse-over-popover"
                sx={{
                pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <div className={Styles.popoverContainer}>
                    <div className={Styles.popoverTitle}>
                        {`${_.get(props, 'leader.firstName', '')} ${_.get(props, 'leader.lastName', '')}`}
                        <span>(#{_.get(props, 'leader.id', '')})</span>
                    </div>
                    <a className={Styles.popoverEmail} href={`mailto:${props.leader.email}`}>
                        { props.leader.email }
                    </a>
                </div>
            </Popover>
        </div>
    );
}

export default LeaderBlock;