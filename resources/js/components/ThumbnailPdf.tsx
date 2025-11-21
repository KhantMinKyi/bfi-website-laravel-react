import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

// Import worker (Vite / CRA)
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
GlobalWorkerOptions.workerSrc = pdfWorker;

interface Props {
    file: string;
}

export default function ThumbnailPdf({ file }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const pdf: PDFDocumentProxy = await getDocument(file).promise;
                const page = await pdf.getPage(1);

                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext('2d');
                if (!context) return;

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                    canvas: canvas, // REQUIRED for TS
                }).promise;

                setLoaded(true);
            } catch (err) {
                console.error('PDF Load Error:', err);
            }
        };

        loadPdf();
    }, [file]);

    return (
        <div style={{ cursor: 'pointer', width: 'fit-content' }} onClick={() => window.open(file, '_blank')}>
            {!loaded && <p>Loading thumbnail…</p>}
            <canvas ref={canvasRef} />
        </div>
    );
}
