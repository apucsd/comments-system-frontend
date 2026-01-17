import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User', size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
    };

    return (
        <div className={`rounded-full overflow-hidden bg-gray-200 border border-gray-100 shrink-0 ${sizeClasses[size]} ${className}`}>
            <img
                src={src || `https://ui-avatars.com/api/?name=${alt}&background=random`}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Avatar;
