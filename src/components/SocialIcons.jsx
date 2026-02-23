import { FaTelegram, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const SocialIcons = () => {
    const socials = [
        { name: 'Telegram', url: 'https://t.me/wwuzbww', icon: <FaTelegram /> },
        { name: 'Instagram', url: 'https://instagram.com/baralov88', icon: <FaInstagram /> },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/botir-aralov-a93187284', icon: <FaLinkedin /> },
        { name: 'GitHub', url: 'https://github.com/newboyss88', icon: <FaGithub /> },
    ];

    return (
        <div className="social-row flex items-center justify-center gap-6 mt-10 p-4">
            {socials.map((social, index) => (
                <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-2xl text-gray-500 hover:text-gray-900 transition-colors duration-200 transform hover:scale-110 active:scale-95"
                >
                    {social.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialIcons;
