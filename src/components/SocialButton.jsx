import React from 'react';

const SocialButton = ({ platform, onClick, icon: Icon }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        flex items-center justify-center w-full py-3 px-4 border border-gray-200 rounded-lg
        text-auth-text font-medium hover:bg-gray-50 transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
      "
        >
            {Icon && <span className="mr-3">{Icon}</span>}
            <span className="font-auth-body">Continue with {platform}</span>
        </button>
    );
};

export default SocialButton;
