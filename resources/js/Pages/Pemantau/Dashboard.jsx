import SidebarPemantau from '@/Layouts/SidebarPemantau';
import Header from '@/Components/Header';
import FlashPopup from '@/Components/FlashPopup';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ModalKonfirmasiUndangan from '@/Components/ModalKonfirmasiUndangan';

import { FaChartBar, FaCheckDouble } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';

export default function Dashboard({ }) {
    const stats = [
        {
            icon: <FaChartBar size={32} className="text-blue-900" />,
            value: 14,
            label: 'Total Kegiatan',
        },
        {
            icon: (
                <div className="text-yellow-400 flex items-center gap-1">
                    <HiOutlineCalendar size={28} />
                    <HiOutlineArrowRight size={20} />
                </div>
            ),
            value: 28,
            label: 'Akan datang',
        },
        {
            icon: <MdOutlineAccessTime size={32} className="text-green-500" />,
            value: 28,
            label: 'Sedang Berlangsung',
        },
        {
            icon: <FaCheckDouble size={32} className="text-sky-500" />,
            value: 28,
            label: 'Selesai',
        },
    ];

    return (
        <div className="flex justify-start">
            <SidebarPemantau />

            <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <FlashPopup />

                <main className="pt-28 px-6">
                    <div className="bg-[#F5F7FA] p-8 mx-auto">
                        <h2 className="text-xl font-semibold text-center mb-6">Dashboard</h2>

                        {/* Grid Full Width */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-lg shadow p-4 flex items-center gap-4 w-full"
                                >
                                    <div>{item.icon}</div>
                                    <div>
                                        <div className="text-xl font-semibold">{item.value}</div>
                                        <div className="text-sm text-gray-700">{item.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
