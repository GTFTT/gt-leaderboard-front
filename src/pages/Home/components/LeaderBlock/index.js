
import _ from 'lodash';

import Styles from './styles.module.css';

const LeaderBlock = (props) => {
    return (
        <div className={ Styles.mainCont }>
            <div className={Styles.numberCont}>{props.leader.rowNumber}</div>
            <div className={Styles.nameCont}>
                {_.get(props, 'leader.firstName', '')}
                {_.get(props, 'leader.lastName', '')}
            </div>
            <div className={Styles.ratingCont}>{props.leader.rating}</div>
        </div>
    );
}

export default LeaderBlock;