import React from 'react';
import { Bell, User, LogOut, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, setTheme, fontSize, setFontSize } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors dark:bg-gray-900/80 dark:border-gray-800">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EMS
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                <div className="relative pl-6 border-l border-gray-100 dark:border-gray-800" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-1 transition-colors outline-none"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {user?.username || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {user?.role ? user.role.toLowerCase() : 'Guest'}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <User size={20} />
                        </div>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-14 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-fade-in z-20">
                            <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 md:hidden">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.username}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role?.toLowerCase()}</p>
                            </div>

                            <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
                                <User size={16} />
                                <span>Profile</span>
                            </Link>

                            <div className="px-4 py-2">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</p>

                                {/* Theme Toggle */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                        <Moon size={16} />
                                        <span>Dark Mode</span>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`w-10 h-5 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    >
                                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>

                                {/* Font Size Control */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-1">
                                        <span className="text-xs">A</span>
                                        <span>Text Size</span>
                                        <span className="text-lg">A</span>
                                    </div>
                                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                        {['small', 'medium', 'large'].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setFontSize(size)}
                                                className={`flex-1 text-xs py-1 rounded-md transition-colors ${fontSize === size ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                            >
                                                {size.charAt(0).toUpperCase() + size.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-50 dark:border-gray-800 my-1"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
