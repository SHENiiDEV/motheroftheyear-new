import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:outline-none flex items-center justify-between text-left cursor-pointer hover:border-slate-700 transition shadow-sm"
    >
        <span className={value ? 'text-white font-medium' : 'text-slate-500'}>
            {value || placeholder || 'Select Date of Birth'}
        </span>
        <Calendar className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
    </button>
));

CustomInput.displayName = 'CustomDatePickerInput';

export default function DatePicker({ value, onChange, placeholder, error, className = '' }) {
    // Parse ISO string (YYYY-MM-DD) into Date object
    const selectedDate = value ? new Date(value) : null;

    const handleDateChange = (date) => {
        if (!date) {
            onChange('');
            return;
        }
        // Format to ISO YYYY-MM-DD using local time
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${day}`);
    };

    return (
        <div className={`w-full relative ${className}`}>
            <ReactDatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                customInput={<CustomInput placeholder={placeholder} />}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                yearDropdownItemNumber={90}
                scrollableYearDropdown
                preventOpenOnFocus={true}
            />
            {error && <div className="text-xs text-rose-400 mt-1">{error}</div>}
        </div>
    );
}
