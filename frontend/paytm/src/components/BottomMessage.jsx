import { Link } from "react-router-dom";

export default function BottomMessage({label, id, to, text_of_link}) {
    return <div className='flex text-sm text-gray-500 pb-2'>
        {label}
        <Link className='underline text-blue-700 font-semibold' id={id} to={to}>{text_of_link}</Link>
    </div>
}