
import { memo } from 'react';
import { React } from 'react'; 
const InputField = memo(function InputField({label, placeholder, id, onChange, type}) {
    return <div className="flex flex-col p-2 items-start">
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
        <input type={type} onChange={onChange} id={id} className="w-64 h-10 border border-gray-300 rounded-md shadow-sm" placeholder={" "+ placeholder} />
    </div>
});

export default InputField;