import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, UserPlus, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        departments: 0,
        recentHires: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/employees?size=1000'); // Fetch enough for stats for now
                const employees = response.data.content || [];
                const departments = new Set(employees.map(e => e.department).filter(Boolean)).size;

                setStats({
                    totalEmployees: employees.length,
                    departments: departments,
                    recentHires: employees.length // Simplified for now
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const navigate = useNavigate();

    const handleCardClick = (type) => {
        if (type === 'total') navigate('/employees');
        if (type === 'recent') navigate('/employees?sort=joinedDate,desc');
        if (type === 'dept') navigate('/employees?sort=department,asc');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    onClick={() => handleCardClick('total')}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]"
                >
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Employees</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.totalEmployees}</p>
                    </div>
                </div>

                <div
                    onClick={() => handleCardClick('recent')}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]"
                >
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Recent Hires</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.recentHires}</p>
                    </div>
                </div>

                <div
                    onClick={() => handleCardClick('dept')}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]"
                >
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Departments</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.departments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
