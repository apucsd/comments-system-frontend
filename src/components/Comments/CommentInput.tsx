import React, { useState, useRef, useEffect } from 'react';

interface CommentInputProps {
    onPost: (text: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ onPost, placeholder = 'Add a comment...', autoFocus = false }) => {
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handlePost = () => {
        if (!text.trim()) return;
        onPost(text);
        setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlePost();
        }
    };

    // Auto-resize textarea
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="flex items-center gap-3 p-3 border-t border-gray-100 bg-white">
            <textarea
                ref={inputRef}
                value={text}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none resize-none text-sm placeholder-gray-500 max-h-24 py-1"
                rows={1}
            />
            <button
                onClick={handlePost}
                disabled={!text.trim()}
                className={`text-sm font-semibold transition-colors ${text.trim() ? 'text-blue-500 hover:text-blue-700 cursor-pointer' : 'text-blue-200 cursor-default'
                    }`}
            >
                Post
            </button>
        </div>
    );
};

export default CommentInput;
