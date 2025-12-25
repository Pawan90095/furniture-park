import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({
    icon: Icon,
    title = "Nothing here yet",
    description = "We couldn't find anything here.",
    actionText,
    actionLink,
    onAction
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            {Icon && (
                <div className="mb-6 text-gray-300">
                    <Icon size={80} strokeWidth={1} />
                </div>
            )}
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                {description}
            </p>
            {(actionText && (actionLink || onAction)) && (
                actionLink ? (
                    <Link
                        to={actionLink}
                        className="bg-stone-900 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                        {actionText}
                    </Link>
                ) : (
                    <button
                        onClick={onAction}
                        className="bg-stone-900 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                        {actionText}
                    </button>
                )
            )}
        </div>
    );
}
