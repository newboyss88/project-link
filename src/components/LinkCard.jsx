import { FaArrowRight } from 'react-icons/fa';

const LinkCard = ({ title, subtitle, url, icon, color, fullWidth }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`card-item relative group overflow-hidden p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] ${fullWidth ? 'h-full' : ''}`}
        >
            {/* Background Gradient Flash */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-2xl`} />

            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />

            <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg shine-icon">
                    {icon}
                </div>

                <div className="p-2.5 rounded-full border border-white/5 text-white/40 group-hover:text-white group-hover:bg-white/20 transition-all transform group-hover:rotate-[-45deg] duration-300">
                    <FaArrowRight />
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:tracking-wide transition-all duration-300">{title}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors mt-1 font-medium">{subtitle}</p>
            </div>
        </a>
    );
};

export default LinkCard;
