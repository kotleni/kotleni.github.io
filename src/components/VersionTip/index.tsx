import {VERSION_NAME, VERSION_NAME_REPLACEMENT} from "../../constants.ts";

import './VersionTip.scss';
import {useState} from "react";

function VersionTip() {
    const [clicksCount, setClicksCount] = useState(0);

    const increaseClicks = () => {
        setClicksCount(clicksCount + 1);
    };
    return (
        <div className="version-tip" onClick={increaseClicks}>{
            clicksCount < 8 ?
                (clicksCount % 2 === 0 ? VERSION_NAME : VERSION_NAME_REPLACEMENT)
                : `Clicks count: ${clicksCount}`
        }</div>
    );
}

export default VersionTip;