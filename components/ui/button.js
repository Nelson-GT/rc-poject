const Button = ({ children, ...props }) => (
    <button
        role="button"
        {...props}
        className={`px-4 py-2.5 font-semibold text-md text-center duration-150 shadow-md rounded-lg transform transition duration-200 hover:scale-105 ${props.className || ""}`}
    >
        {children}
    </button>
)
export default Button