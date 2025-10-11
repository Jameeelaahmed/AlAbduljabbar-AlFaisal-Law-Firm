import { useRef, useState, useEffect } from "react";
import GenericTable from "../../../components/AdminComponents/Table/GenericTable";
import Headline from "../../../components/AdminComponents/Headline/Headline";
import Modal from "../../../components/AdminComponents/Modals/Modal";
import UpdateUser from "../../../components/AdminComponents/Modals/UpdateUser/UpdateUser";
import DeleteUser from "../../../components/AdminComponents/Modals/DeleteUser/DeleteUser";
import { useUsers } from "../../../hooks/useUsers";
import AddUser from "../../../components/AdminComponents/Modals/AddUser/AddUser";

function Users() {
    const [branchFilter, setBranchFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [username, setUsername] = useState("");
    const editUserRef = useRef(null);
    const deleteUSerRef = useRef(null);
    const createUserRef = useRef(null);

    // 🔹 Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // 🔹 Open edit modal
    function openEditUserModal(user) {
        setSelectedUserId(user.id);
        if (editUserRef.current) {
            editUserRef.current.open(user);
        }
    }

    // 🔹 Close edit modal
    function closeEditUserModal() {
        setSelectedUserId(null);
        if (editUserRef.current) {
            editUserRef.current.close();
        }
    }

    function openDeleteUserModal(user) {
        setSelectedUserId(user.id);
        setUsername(user.fullName);
        if (deleteUSerRef.current) {
            deleteUSerRef.current.open(user);
        }
    }

    function closeDeleteUserModal() {
        setSelectedUserId(null);
        setUsername(null);
        if (deleteUSerRef.current) {
            deleteUSerRef.current.close();
        }
    }

    function openCreateUserModal() {
        if (createUserRef.current) {
            createUserRef.current.open();
        }
    }

    function closeCreateUserModal() {
        if (createUserRef.current) {
            createUserRef.current.close();
        }
    }

    const tableColumns = [
        { key: "fullName", header: "اسم المستخدم" },
        { key: "email", header: "البريد الإلكتروني" },
        {
            key: "role",
            header: "الدور",
            render: (role) => (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                    {role}
                </span>
            ),
        },
        { key: "mobileNumber", header: "رقم الجوال" },
        { key: "whatsappNumber", header: "رقم الواتساب" },
    ];

    const tableActions = [
        {
            label: "تعديل",
            onClick: (user, e) => {
                e?.stopPropagation?.();
                openEditUserModal(user);
            },
            className: "text-gray-500 hover:bg-blue-50",
        },
        {
            label: "حذف",
            onClick: (user, e) => {
                e?.stopPropagation?.();
                openDeleteUserModal(user);
            },
            className: "text-gray-500 hover:bg-red-50",
        },
    ];

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            {/* Header */}
            <Headline
                headlineLabel="إدارة المستخدمين"
                buttonLabel="إضافة مستخدم"
                buttonIcon="+"
                handleOpenCategoryModal={openCreateUserModal}
            />

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 sm:p-3 cursor-pointer bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm sm:text-base w-full sm:w-auto min-w-[120px]"
                >
                    <option value="">الدور</option>
                    <option value="مسؤول">مسؤول</option>
                    <option value="دعم">دعم</option>
                    <option value="عميل">عميل</option>
                </select>

                <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 sm:p-3 cursor-pointer bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm sm:text-base w-full sm:w-auto min-w-[120px]"
                >
                    <option value="">الفرع</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة">مكة</option>
                </select>

                <input
                    type="text"
                    placeholder="ابحث عن المستخدمين بالاسم، البريد الإلكتروني..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 sm:p-3 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm min-w-[250px] sm:min-w-[300px]"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <GenericTable
                    useDataHook={useUsers}
                    columns={tableColumns}
                    actions={tableActions}
                    perPage={5}
                    filters={{
                        search: debouncedSearch,
                        branch: branchFilter,
                        role: roleFilter,
                    }}
                />
            </div>
            {/* create user modal  */}
            <Modal
                ref={createUserRef}
                title="إضافة مستخدم جديد"
                onClose={(e) => {
                    e?.stopPropagation?.();
                    closeCreateUserModal();
                }}
            >
                <AddUser />
            </Modal>
            {/* Edit User Modal */}
            <Modal
                ref={editUserRef}
                title="تعديل المستخدم"
                onClose={(e) => {
                    e?.stopPropagation?.();
                    closeEditUserModal();
                }}
            >
                {/* ✅ Pass selectedUserId */}
                {selectedUserId && (
                    <UpdateUser
                        userId={selectedUserId}
                        onSuccess={() => {
                            closeEditUserModal();
                        }}
                        onFailure={() => {
                            closeEditUserModal();
                        }}
                    />
                )}
            </Modal>

            {/* Delete User Modal */}
            <Modal
                ref={deleteUSerRef}
                title="حذف المستخدم"
                onClose={(e) => {
                    e?.stopPropagation?.();
                    closeDeleteUserModal();
                }}
            >
                {selectedUserId && (
                    <DeleteUser
                        userId={selectedUserId}
                        username={username}
                        onClose={() => {
                            closeDeleteUserModal();
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

export default Users;
