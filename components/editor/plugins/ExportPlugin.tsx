// plugins/ExportPlugin.tsx
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import Image from "next/image";

const ExportPlugin = () => {
    const [editor] = useLexicalComposerContext();

    const exportAsPDF = () => {
        editor.update(() => {
            const doc = new jsPDF();
            const textContent =
                document.querySelector(".editor-input")?.textContent || "";
            doc.text(textContent, 10, 10);
            doc.save("document.pdf");
        });
    };

    const exportAsDOCX = async () => {
        editor.update(() => {
            const textContent =
                document.querySelector(".editor-input")?.textContent || "";
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [new TextRun(textContent)],
                            }),
                        ],
                    },
                ],
            });

            Packer.toBlob(doc).then((blob) => {
                saveAs(blob, "document.docx");
            });
        });
    };

    return (
        <div className="export-plugin flex items-center">
            {/* <button onClick={exportAsPDF} className="btn-export"></button> */}
            <button onClick={exportAsDOCX} className="btn-export w-10">
                <Image
                    src="/assets/icons/pdf.png"
                    alt="pdf"
                    width={24}
                    height={24}
                    className=""
                />
            </button>
        </div>
    );
};

export default ExportPlugin;
