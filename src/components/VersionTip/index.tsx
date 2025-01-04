import {VERSION_NAME} from "../../constants.ts";

import './VersionTip.scss';

function VersionTip() {
    return (
        <div className="version-tip">{VERSION_NAME}</div>
    );
}

export default VersionTip;