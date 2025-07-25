import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    activeClassName = '',
    children,
    ...props
}) {
    const baseClasses = 'inline-flex items-center text-sm font-medium transition duration-150 ease-in-out focus:outline-none';

    const activeClasses = active
        ? activeClassName ||
          'border-indigo-400 text-gray-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-gray-100'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300';

    return (
        <Link
            {...props}
            className={`${baseClasses} ${activeClasses} ${className}`}
        >
            {children}
        </Link>
    );
}
