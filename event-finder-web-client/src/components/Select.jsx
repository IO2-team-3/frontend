
const Select = ({color,text,checked}) => {
    return(
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor={color}
            >
                <input
                    id={color}
                    name="color"
                    type="radio"
                    checked={checked}
                    className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full
                    border border-blue-gray-200 text-${color}-500 transition-all before:absolute before:top-2/4
                    before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4
                    before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity
                    checked:border-${color}-500 checked:before:bg-${color}-500 hover:before:opacity-10`}
                />
                <div
                    className={`pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4
                    text-${color}-500 opacity-0 transition-opacity peer-checked:opacity-100`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                </div>
            </label>
            <label
                className="mt-px cursor-pointer select-none"
                htmlFor={color}
            >
                {text}
            </label>
        </div>
    )
}
export default Select;