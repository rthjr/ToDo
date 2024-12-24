import React from 'react';

interface ButtonProps {
    param: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ param, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative inline-block text-sm font-medium text-yellow-300 focus:outline-none focus:ring active:text-yellow-400"
        >
            <span
                className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
            ></span>

            <span className="relative block border border-current bg-white px-8 py-3"> {param} </span>
        </button>
    );
}

export default Button;