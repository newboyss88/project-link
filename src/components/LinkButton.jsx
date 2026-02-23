import { FaArrowRight } from 'react-icons/fa';

const LinkButton = ({ title, url, icon }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item group relative flex items-center justify-between w-full mx-auto max-w-[680px] p-4 bg-white rounded-full sm:rounded-3xl border border-gray-200 mt-4 link-button-hover shadow-sm overflow-hidden"
        >
            {/* Icon Placeholder (Left) - To keep text perfectly centered even if no icon */}
            <div className="flex-none w-10 flex items-center justify-center text-xl text-gray-500 group-hover:text-blue-600 transition-colors">
                {icon}
            </div>

            {/* Main Title (Center) */}
            <div className="flex-grow text-center z-10">
                <h3 className="text-[16px] sm:text-[18px] font-semibold text-gray-800 group-hover:text-black transition-colors">
                    {title}
                </h3>
            </div>

            {/* Action Area (Right) - Three dots or arrow, Linktree usually uses three dots, we'll use a subtle arrow */}
            <div className="flex-none w-10 flex justify-end items-center text-gray-300 group-hover:text-gray-500 transition-colors">
                <FaArrowRight className="transform -rotate-45 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
        </a>
    );
};

export default LinkButton;
