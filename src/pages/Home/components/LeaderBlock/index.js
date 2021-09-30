
import Styles from './styles.module.css';

const LeaderBlock = (props) => {

    return (
        <div className={ Styles.mainCont }>Leader here: {JSON.stringify(props)}</div>
    );
}

export default LeaderBlock;