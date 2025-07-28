const Input = ({ label, error, ...props }) => (
    <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <input
        {...props}
        className={`w-full px-4 py-3 text-base border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 ${
            error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 hover:border-gray-400"
        } ${props.className || ""}`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
)

export default Input
