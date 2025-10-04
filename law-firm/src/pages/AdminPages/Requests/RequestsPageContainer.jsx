import React, { useState } from "react";
import RequestsPagePresentational from "./RequestsPagePresentational";
import TableComponentContainer from "../../../components/AdminComponents/Table/TableComponentContainer";

export default function RequestsPageContainer() {
    // Example data
    const [requests, setRequests] = useState([
        {
            id: "REQ12345",
            customer: "عمر الموسى",
            branch: "الرياض",
            status: "قيد الانتظار",
        },
        {
            id: "REQ67890",
            customer: "سارة الخالد",
            branch: "جدة",
            status: "تم الحل",
        },
        {
            id: "REQ24680",
            customer: "فيصل آل سعود",
            branch: "الدمام",
            status: "قيد الانتظار",
        },
        {
            id: "REQ13579",
            customer: "نورة الفهد",
            branch: "الرياض",
            status: "تم الحل",
        },
        {
            id: "REQ98765",
            customer: "عبدالله العتيبي",
            branch: "جدة",
            status: "قيد الانتظار",
        },
    ]);
    return <RequestsPagePresentational requests={requests} />;
}
