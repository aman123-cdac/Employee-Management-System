import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, Trash2, Edit, Plus, User, MapPin, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeList = () => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 9;

    const location = useLocation();

    useEffect(() => {
        // Debounce search to avoid too many API calls
        const delayDebounceFn = setTimeout(() => {
            fetchEmployees(0); // Reset to page 0 on new search
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage, location.search]);

    const fetchEmployees = async (page) => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const sort = searchParams.get('sort');

            let url = `/employees?page=${page}&size=${pageSize}`;
            if (sort) {
                url += `&sort=${sort}`;
            }
            if (searchTerm) {
                url += `&search=${searchTerm}`;
            }

            const response = await api.get(url);
            setEmployees(response.data.content || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                setEmployees(employees.filter((emp) => emp.id !== id));
                toast.success('Employee deleted successfully');
            } catch (error) {
                console.error('Error deleting employee:', error);
                if (error.response && error.response.status === 403) {
                    toast.error('Permission denied: Only Admins can delete employees');
                } else {
                    toast.error('Failed to delete employee');
                }
            }
        }
    };

    // Server-side search means we display 'employees' directly
    const filteredEmployees = employees;

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Team Members</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your employees</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-white dark:placeholder-gray-500"
                        />
                    </div>
                    {user?.role === 'ADMIN' && (
                        <Link
                            to="/add-employee"
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
                        >
                            <Plus size={20} />
                            <span className="hidden md:inline">Add Member</span>
                        </Link>
                    )}
                </div>
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed transition-colors duration-300">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No employees found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or add a new team member.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((emp) => (
                        <div key={emp.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <Link to={`/employee/${emp.id}`} className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-inner cursor-pointer hover:opacity-90 transition-opacity">
                                    {emp.photo ? (
                                        <img src={emp.photo} alt={emp.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-300 font-bold text-xl">
                                            {emp.name?.charAt(0)}
                                        </div>
                                    )}
                                </Link>
                                {user?.role === 'ADMIN' && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            to={`/edit-employee/${emp.id}`}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    <Link to={`/employee/${emp.id}`}>{emp.name}</Link>
                                </h3>
                                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">{emp.companyRole || 'No Role'}</p>

                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <Briefcase size={16} className="text-gray-400 dark:text-gray-500" />
                                        <span>{emp.department || 'No Dept'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                        <MapPin size={16} className="text-gray-400 dark:text-gray-500" />
                                        <span>{emp.address || 'No Address'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
