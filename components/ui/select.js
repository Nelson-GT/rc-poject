// No es necesario "use client" si solo es JSX o si este componente no tiene estado o efectos de React.
// Si este componente se usara en un cliente React, entonces sí sería necesario.
// import * as React from "react"; // Si se usa React, aún se necesita importar

const Select = ({ label, error, children, ...props }) => {
    const baseClasses = "w-full px-4 py-3 text-base border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700";
    const errorClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";
    const defaultClasses = "border-gray-300 hover:border-gray-400";

    const combinedClasses = `${baseClasses} ${
        error ? errorClasses : defaultClasses
    } ${props.className || ""}`;

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            <select
                {...props}
                className={combinedClasses}
            >
                {children}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
    };

// Si necesitaras un <option> de ejemplo:
/*
const OptionExample = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};
*/

// Para usarlo:
/*
<Select label="Tu Opcion" error={null}>
  <option value="opcion1">Opción 1</option>
  <option value="opcion2">Opción 2</option>
</Select>
*/

// Las exportaciones serían solo para el Select nativo:
export default Select;