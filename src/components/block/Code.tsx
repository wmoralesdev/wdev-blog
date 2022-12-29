import React, { FC } from 'react';
import Refractor from 'react-refractor';
import js from 'refractor/lang/javascript';
import python from 'refractor/lang/python';
import cpp from 'refractor/lang/cpp';
import css from 'refractor/lang/css';
import csharp from 'refractor/lang/csharp';
import { BlockContentModel } from '@models/common';
import { HiOutlineClipboard } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import useWindowSize from '@hooks/useWindowSize';

Refractor.registerLanguage(js);
Refractor.registerLanguage(python);
Refractor.registerLanguage(cpp);
Refractor.registerLanguage(csharp);
Refractor.registerLanguage(css);

interface CodeProps {
    code: BlockContentModel;
}

const Code: FC<CodeProps> = ({ code }) => {
    const { width } = useWindowSize();

    const handleCopy = () => {
        navigator.clipboard.writeText(code.code);
        toast.success('Copied to clipboard', { id: 'code-copied', position: width < 768 ? 'top-center' : 'bottom-right' });
    };

    return (
        <div className="flex flex-col w-full bg-light rounded-lg">
            <div className="relative w-full rounded-t-lg bg-[#171717] inline-flex p-2 gap-1
            md:gap-2"
            >
                <div className="aspect-square w-2 bg-green-500 rounded-full
                md:w-3"
                />
                <div className="aspect-square w-2 bg-yellow-500 rounded-full
                md:w-3"
                />
                <div className="aspect-square w-2 bg-red-500 rounded-full
                md:w-3"
                />
                <button
                    onClick={handleCopy}
                    type="button"
                    className="absolute right-0 top-0 bg-primary rounded-full p-1 cust-transition flex items-center justify-center
                    md:text-2xl md:-right-2 md:-top-2
                    hover:scale-110"
                >
                    <HiOutlineClipboard />
                </button>
            </div>
            <div className="w-full p-2 md:p-4">
                <Refractor
                    language={code.language}
                    value={code.code}
                    markers={code.highlightedLines}
                />
            </div>
        </div>
    );
};

export default Code;
