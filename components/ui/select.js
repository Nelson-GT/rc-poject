const Select = ({ children, ...props }) => (
    <select
        {...props}
        className={`px-4 py-2.5 font-medium text-md text-center focus:outline-none duration-150 shadow-md rounded-lg border border-orange transform transition duration-200 hover:scale-101 ${props.className || ""}`}
    >
        {children}
    </select>
)
export default Select