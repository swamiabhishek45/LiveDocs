// plugins/SpellCheckPlugin.tsx
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const SpellCheckPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.update(() => {
            const contentEditable = document.querySelector(
                ".editor-input"
            ) as HTMLElement;
            if (contentEditable) {
                contentEditable.setAttribute("spellcheck", "true"); // Enable spellcheck
            }
        });
    }, [editor]);

    return null;
};

export default SpellCheckPlugin;
