// plugins/WordCountPlugin.tsx
import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

const WordCountPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const updateWordCount = () => {
            editor.update(() => {
                const textContent = $getRoot().getTextContent();
                const wordCount = textContent
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length;
                setWordCount(wordCount);
            });
        };

        const unsubscribe = editor.registerUpdateListener(() => {
            updateWordCount();
        });

        return () => unsubscribe();
    }, [editor]);

    return (
        <div className="word-count text-white flex items-center m-2">
            <p className="text-sm text-cyan-600">Word Count: {wordCount}</p>
        </div>
    );
};

export default WordCountPlugin;
