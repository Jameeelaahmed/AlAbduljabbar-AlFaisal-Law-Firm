import { useState } from 'react'
import UsersPagePresentational from './UsersPagePresentational'
import { useUsers } from '../../../hooks/useUsers';

export default function UsersPageContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const perPage = 5;

    const { data, isLoading } = useUsers({
        page: currentPage,
        perPage,
        search,
        branch: branchFilter,
        role: roleFilter,
    });

    const users = data?.data || [];
    const meta = data?.meta || { current_page: 1, total_pages: 1, total_records: 0 };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= meta.total_pages) setCurrentPage(page);
    };
    console.log({ users, meta });
    return (
        <UsersPagePresentational
            users={users}
            setBranchFilter={setBranchFilter}
            setRoleFilter={setRoleFilter}
            setSearch={setSearch}
            search={search}
            meta={meta}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            perPage={perPage}
            isLoading={isLoading}
        />
    )
}
