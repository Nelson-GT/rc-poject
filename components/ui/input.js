const Input = ({ children, ...props }) => (
    <input
        {...props}
        className={`px-4 py-2.5 font-medium text-md text-start focus:outline-none duration-150 shadow-md rounded-lg border border-orange ${props.className || ""}`}
    >
        {children}
    </input>
)
export default Input