import { Link } from "react-router-dom";

export default function SidebarLink({id, to, text_of_link, d}) {
    return <div className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
        <Link className="flex-1 ms-3 whitespace-nowrap" id={id} to={to}>{text_of_link}</Link>
    </div>
}