// libs 
import { useState } from "react";
// components
import ServiceItemPresentational from "./ServiceItemPresentational"

function ServiceItemContainer() {
    const [isChecked, setIsChecked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <ServiceItemPresentational isChecked={isChecked} setIsChecked={setIsChecked} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </>
    )
}

export default ServiceItemContainer
