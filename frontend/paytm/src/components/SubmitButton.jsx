export default function SubmitButton({button_name, id, onClick}) {
    return <div className="flex flex-col p-5">
        <input onClick={onClick} id={id} className="w-64 h-10 bg-black text-white border border-gray-300 rounded-md shadow-sm" type="submit" value={button_name} />
    </div>
}