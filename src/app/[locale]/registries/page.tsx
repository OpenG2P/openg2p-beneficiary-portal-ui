// "use client";
// import { useState } from "react";
// import { useLocale } from "next-intl";

// import { Pagination } from '@/components/shared';
// import { UpdateRegistryForm } from '@/features/registry/components';
// import { AuthUtil } from '@/features/auth/components';

// import { Registry } from "@/features/registry/types";

// import { usePagination } from "@/shared/hooks/usePagination";

// const myRegistries: Registry[] = [
//     { name: "My Healthcare Registry", id: "12938475639", date: "15/08/2025", action: "Request for Update" },
//     { name: "My Employment Registry", id: "84756392013", date: "05/08/2025", action: "Request for Update" },
//     { name: "My Housing Registry", id: "56473829102", date: "22/07/2025", action: "Request for Update" },
//     { name: "My Education Registry", id: "93847561029", date: "10/07/2025", action: "Request for Update" },
//     { name: "My Pension Registry", id: "38475619283", date: "28/06/2025", action: "Request for Update" },
//     { name: "My Food Security Registry", id: "74638291028", date: "15/06/2025", action: "Request for Update" },
//     { name: "My Skill Development Registry", id: "18273645563", date: "05/06/2025", action: "Request for Update" },
//     { name: "My Social Welfare Registry", id: "92837465547", date: "25/05/2025", action: "Request for Update" },
//     { name: "My Transportation Registry", id: "10293847561", date: "20/05/2025", action: "Request for Update" },
//     { name: "My Energy Subsidy Registry", id: "56473829104", date: "15/05/2025", action: "Request for Update" },
//     { name: "My Housing Development Registry", id: "38475619284", date: "10/05/2025", action: "Request for Update" },
//     { name: "My Education Aid Registry", id: "84756392015", date: "05/05/2025", action: "Request for Update" },
//     { name: "My Pension Support Registry", id: "12938475640", date: "01/05/2025", action: "Request for Update" },
//     { name: "My Food Security Aid Registry", id: "92837465548", date: "25/04/2025", action: "Request for Update" },
//     { name: "My Skill Training Registry", id: "18273645564", date: "15/04/2025", action: "Request for Update" },
//     { name: "My Social Welfare Support Registry", id: "74638291029", date: "05/04/2025", action: "Request for Update" },
// ];

// export default function RegistriesPage() {
//     const lang = useLocale();
//     AuthUtil({ failedRedirectUrl: `/${lang}/login` });

//     const [openForm, setOpenForm] = useState(false);
//     const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null);

//     const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(myRegistries, 8);

//     return (
//         <div className="px-10 py-4 min-h-screen bg-gray-50">
//             <div className="mb-4">
//                 <h1 className="text-2xl font-bold text-gray-800">All Registries</h1>
//             </div>

//             <div className="bg-white rounded-lg overflow-hidden border border-black/20 p-4">
//                 <div className="mb-2 px-4">
//                     <span className="text-lg font-semibold text-black">My Registries</span>
//                     <div className="border-b-4 border-gray-200 mt-1"></div>
//                 </div>

//                 <div className="overflow-x-auto px-4">
//                     <table className="w-full text-left border-collapse min-w-[700px]">
//                         <thead className="border-b-3 border-gray-200">
//                             <tr>
//                                 <th className="pt-4 pb-2 text-sm font-semibold text-black">Registries</th>
//                                 <th className="pt-4 pb-2 text-sm font-semibold text-black">ID</th>
//                                 <th className="pt-4 pb-2 text-sm font-semibold text-black">Date</th>
//                                 <th className="pt-4 pb-2 text-sm font-semibold text-black">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.map((registry, index) => (
//                                 <tr
//                                     key={index}
//                                     className="hover:bg-gray-50 transition-colors duration-150 border-b-3 border-gray-300"
//                                 >
//                                     <td className="py-3 text-gray-900 font-medium">{registry.name}</td>
//                                     <td className="py-3 font-mono text-gray-900 text-sm">{registry.id}</td>
//                                     <td className="py-3 text-gray-900 text-sm">{registry.date}</td>
//                                     <td className="py-3">
//                                         <span
//                                             onClick={() => {
//                                                 setSelectedRegistry(registry);
//                                                 setOpenForm(true);
//                                             }}
//                                             className="text-black text-sm font-medium underline cursor-pointer hover:text-blue-600 transition-colors"
//                                         >
//                                             {registry.action}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={setCurrentPage}
//                     />
//                 </div>
//             </div>

//             {openForm && selectedRegistry && (
//                 <UpdateRegistryForm
//                     registry={selectedRegistry}
//                     onClose={() => setOpenForm(false)}
//                 />
//             )}
//         </div>
//     );
// }


"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';

import { Pagination, SearchInput } from '@/components/shared';
import { UpdateRegistryForm } from '@/features/registry/components';
import { AuthUtil } from '@/features/auth/components';

import { Registry } from "@/features/registry/types";

import { usePagination } from "@/shared/hooks/usePagination";

const myRegistries: Registry[] = [
    { name: "My Healthcare Registry", id: "12938475639", date: "15/08/2025", action: "Request for Update" },
    { name: "My Employment Registry", id: "84756392013", date: "05/08/2025", action: "Request for Update" },
    { name: "My Housing Registry", id: "56473829102", date: "22/07/2025", action: "Request for Update" },
    { name: "My Education Registry", id: "93847561029", date: "10/07/2025", action: "Request for Update" },
    { name: "My Pension Registry", id: "38475619283", date: "28/06/2025", action: "Request for Update" },
    { name: "My Food Security Registry", id: "74638291028", date: "15/06/2025", action: "Request for Update" },
    { name: "My Skill Development Registry", id: "18273645563", date: "05/06/2025", action: "Request for Update" },
    { name: "My Social Welfare Registry", id: "92837465547", date: "25/05/2025", action: "Request for Update" },
    { name: "My Transportation Registry", id: "10293847561", date: "20/05/2025", action: "Request for Update" },
    { name: "My Energy Subsidy Registry", id: "56473829104", date: "15/05/2025", action: "Request for Update" },
    { name: "My Housing Development Registry", id: "38475619284", date: "10/05/2025", action: "Request for Update" },
    { name: "My Education Aid Registry", id: "84756392015", date: "05/05/2025", action: "Request for Update" },
    { name: "My Pension Support Registry", id: "12938475640", date: "01/05/2025", action: "Request for Update" },
    { name: "My Food Security Aid Registry", id: "92837465548", date: "25/04/2025", action: "Request for Update" },
    { name: "My Skill Training Registry", id: "18273645564", date: "15/04/2025", action: "Request for Update" },
    { name: "My Social Welfare Support Registry", id: "74638291029", date: "05/04/2025", action: "Request for Update" },
];

export default function RegistriesPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [openForm, setOpenForm] = useState(false);
    const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRegistries = myRegistries.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.includes(searchQuery)
    );

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(filteredRegistries, 8);

    return (
        <div className="px-4 sm:px-10 py-4 min-h-screen bg-white">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">My Registries</h1>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-black/20">
                <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-lg font-semibold text-[#ED7C22]">List of Registries</span>
                    <div className="w-23/100">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search"
                            className="w-50"
                            bgColor="bg-gray-100"
                            onIconClick={() => console.log("Search triggered:", searchQuery)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse min-w-[700px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-black text-left py-4 px-6">Registries</th>
                                <th className="text-black text-left py-4 px-6">ID</th>
                                <th className="text-black text-left py-4 px-6">
                                    Date
                                    <Image
                                        src={prefixBasePath("/updown_arrow.png")}
                                        alt="Sort"
                                        width={20}
                                        height={20}
                                        className="inline-block cursor-pointer opacity-40"
                                    />
                                </th>
                                <th className="text-black text-left py-4 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((registry, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{registry.name}</td>
                                    <td className="px-6 py-4 font-mono text-gray-900 text-sm">{registry.id}</td>
                                    <td className="px-6 py-4 text-gray-900 text-sm">{registry.date}</td>
                                    <td className="px-6 py-4 ">
                                        <span
                                            onClick={() => {
                                                setSelectedRegistry(registry);
                                                setOpenForm(true);
                                            }}
                                            className="px-2 py-1 text-sm text-[#3399FF] bg-[#3399FF1F] rounded-full font-medium cursor-pointer"
                                        >
                                            {registry.action}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {openForm && selectedRegistry && (
                <UpdateRegistryForm
                    registry={selectedRegistry}
                    onClose={() => setOpenForm(false)}
                />
            )}
        </div>
    );
}
