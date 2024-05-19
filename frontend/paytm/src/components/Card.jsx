export const Card = ({
    title,
    orderCount,
    amount 
})=>{
    return <div className="group bg-white rounded shadow-md p-10 hover:bg-cardhover-100 hover:text-white">
        <div className="flex text-gray-700 group-hover:text-white">
            {title}
            <div className="pt-1 pl-1">
                <svg className="group-hover:stroke-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
            </div> 
        </div>
        <div className="flex justify-between pt-2">
            <div className="font-semibold text-2xl group-hover:text-white">
                ₹{Math.round(amount * 100) / 100}
            </div>
        </div>
    </div>
}