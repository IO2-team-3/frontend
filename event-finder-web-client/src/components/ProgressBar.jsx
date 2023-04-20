import styles from "../style.js";

const ProgressBar = (props) => {
    return (
        <div className="background-wrapper w-full overflow-hidden">
            <div className="h-2 w-full bg-gray-300 rounded overflow-hidden">
                <div className={`h-full rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500`}
                     style={{width: `${props.percent}%`}}></div>
            </div>
            <div style={{width:`${window.screen.availWidth}px`,height:"calc(100vh - 8px)"}}/>
        </div>
    );
}

export default ProgressBar;