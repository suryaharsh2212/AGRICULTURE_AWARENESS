import React, { useState, useEffect } from 'react';
import { surveysAPI } from '../../services/api';
import { FileSpreadsheet, Download, RefreshCw, Users, Database } from 'lucide-react';
import * as XLSX from 'xlsx';

const SurveyResponses = () => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchResponses = async () => {
        setLoading(true);
        try {
            const data = await surveysAPI.getAll();
            setResponses(data.data || []);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to fetch responses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResponses();
    }, []);

    const exportToExcel = () => {
        if (responses.length === 0) return;

        // Prepare data for Excel
        const dataForExport = responses.map(res => ({
            'Name': res.name,
            'WhatsApp': res.whatsappNumber,
            'Address': res.address,
            'Major Crop': res.crop,
            'Farming Type': res.farmingType,
            'Land Size': res.landSize,
            'Soil Type': res.soilType,
            'Seed Preference': res.seedPreference,
            'Challenges/Reason': res.reason,
            'Date Submitted': new Date(res.createdAt).toLocaleString()
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Responses");

        // Download file
        XLSX.writeFile(workbook, `Survey_Responses_Full_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Loading responses...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Database className="text-green-600" />
                        Survey Responses
                    </h1>
                    <p className="text-gray-500 text-sm">Monitor and manage farmer survey data</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchResponses}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                        title="Refresh Data"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <button
                        onClick={exportToExcel}
                        disabled={responses.length === 0}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileSpreadsheet size={18} />
                        <span>Export to Excel</span>
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Respondents</p>
                        <p className="text-2xl font-bold text-gray-800">{responses.length}</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
                    <p>{error}</p>
                    <button onClick={fetchResponses} className="underline font-medium">Retry</button>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Farmer Name</th>
                                <th className="px-6 py-4">WhatsApp</th>
                                <th className="px-6 py-4">Crop & Type</th>
                                <th className="px-6 py-4">Land & Soil</th>
                                <th className="px-6 py-4">Seed Preference</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {responses.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-400 italic">
                                        No survey responses found yet.
                                    </td>
                                </tr>
                            ) : (
                                responses.map((res) => (
                                    <tr key={res._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{res.name}</div>
                                            <div className="text-xs text-gray-400">{res.address}</div>
                                        </td>
                                        <td className="px-6 py-4 text-green-600 font-mono text-sm">{res.whatsappNumber}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{res.crop}</div>
                                            <div className="text-xs text-blue-600">{res.farmingType}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">{res.landSize}</div>
                                            <div className="text-xs text-amber-600">{res.soilType}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">{res.seedPreference}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                                            {new Date(res.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SurveyResponses;
