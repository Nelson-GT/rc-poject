const Button = ({ children, variant = "default", size = "default", ...props }) => {
    const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        default: "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg transform hover:scale-105",
        outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
        ghost: "text-orange-500 hover:bg-orange-50",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        success: "bg-green-500 text-white hover:bg-green-600",
    }

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        default: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    }

    return (
        <button {...props} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${props.className || ""}`}>
            {children}
        </button>
    )
}

export default Button
