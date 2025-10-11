// libs
import { useRef, useState, useMemo } from "react"
import { useTranslation } from 'react-i18next'
// hooks 
import { useAllCategories } from "../../../hooks/useCategories";
import Headline from "../../../components/AdminComponents/Headline/Headline";
import Modal from "../../../components/AdminComponents/Modals/Modal";
import AddCategory from "../../../components/AdminComponents/Modals/AddCategory/AddCategory";
import CategoryItem from "../../../components/AdminComponents/CategoryItem/CategoryItem";
// components

function Services() {
    const categoryModalRef = useRef();
    const { t } = useTranslation();
    function handleOpenCategoryModal() {
        categoryModalRef.current.open();
    }

    function handleCloseCategoryModal() {
        categoryModalRef.current.close();
    }

    const { data: categoriesResponse, isLoading, isError, error } = useAllCategories();

    const categories = categoriesResponse || [];

    // --- added filtering/search state ---
    const [search, setSearch] = useState("");
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
    const [selectedBranchFilter, setSelectedBranchFilter] = useState("");

    // derive options from loaded categories (defensive about shape)
    const categoryOptions = useMemo(
        () => Array.from(new Set(categories.map(c => c.name || c.title).filter(Boolean))),
        [categories]
    );

    // normalize branch values to 'egypt' | 'saudi' | 'both' | other string
    const normalizeBranch = (raw) => {
        if (raw == null) return null;

        // handle object shape { id, name } or similar
        let val = raw;
        if (typeof raw === "object") {
            // prefer numeric id, then name
            val = raw.id ?? raw.name ?? val;
        }

        // handle arrays like [1,2]
        if (Array.isArray(val)) {
            const s = val.map(v => String(v)).join(",");
            if (s.includes("1") && s.includes("2")) return "both";
            if (s.includes("1")) return "egypt";
            if (s.includes("2")) return "saudi";
            return s;
        }

        const s = String(val).trim().toLowerCase();

        if (s === "1" || s === "egypt") return "egypt";
        if (s === "2" || s === "saudi") return "saudi";
        if (s === "3" || s === "both" || s === "1,2" || s === "2,1") return "both";

        // fallback to the raw string
        return s || null;
    };

    // make branches static: "egypt", "saudi" (All is represented by empty string)
    const branchOptions = ["egypt", "saudi"];

    // when filtering by branch, treat "both" as matching either egypt or saudi
    const matchesBranchFilter = (branchFilter, branchValue) => {
        if (!branchFilter) return true; // 'All' selected
        if (!branchValue) return false;
        if (branchValue === "both") return branchFilter === "egypt" || branchFilter === "saudi";
        return branchValue === branchFilter;
    };

    const filteredCategories = useMemo(() => {
        const q = (search || "").trim().toLowerCase();
        return categories.filter(c => {
            const name = (c.name || c.title || "").toLowerCase();
            const desc = (c.description || "").toLowerCase();

            const branchName = normalizeBranch(c?.branch ?? c?.branchId ?? null) || "";

            const matchesSearch = q ? (name.includes(q) || desc.includes(q)) : true;
            const matchesCategory = selectedCategoryFilter ? ((c.name === selectedCategoryFilter) || (c.title === selectedCategoryFilter)) : true;
            const matchesBranch = matchesBranchFilter(selectedBranchFilter, branchName);

            return matchesSearch && matchesCategory && matchesBranch;
        });
    }, [categories, search, selectedCategoryFilter, selectedBranchFilter]);
    // --- end added filtering/search state ---

    return (
        <div className='p-6 bg-gray-50 shadow-lg'>
            <Headline headlineLabel={t("Services.Service Management")} buttonLabel={t("Services.Add New Category")} buttonIcon="+" handleOpenCategoryModal={handleOpenCategoryModal} />
            <Modal ref={categoryModalRef} title={t("Services.Add New Category")} onClose={handleCloseCategoryModal}>
                <AddCategory onClose={handleCloseCategoryModal} />
            </Modal>

            {/* Filters: category, branch, search */}
            <div className="flex flex-wrap gap-3 items-center my-4">
                <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="border rounded px-3 py-2 bg-white"
                >
                    <option value="">{t("Services.All Categories")}</option>
                    {categoryOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <select
                    value={selectedBranchFilter}
                    onChange={(e) => setSelectedBranchFilter(e.target.value)}
                    className="border rounded px-3 py-2 bg-white"
                >
                    <option value="">{t("Services.All Branches")}</option>
                    {branchOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("Services.Search by name or description")}
                    className="border rounded px-3 py-2 flex-1 min-w-[200px]"
                />

                <button
                    onClick={() => { setSearch(""); setSelectedCategoryFilter(""); setSelectedBranchFilter(""); }}
                    className="ml-2 px-3 py-2 border rounded bg-gray-100"
                    title={t("Services.Clear filters")}
                >
                    {t("Services.Clear")}
                </button>
            </div>

            <ul className='bg-bg shadow rounded'>
                {
                    filteredCategories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))
                }
            </ul>
        </div>
    )
}

export default Services
