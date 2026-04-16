import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon, Loader2, AlertCircle, Leaf, ShieldCheck, Pill } from "lucide-react";

interface PredictionResult {
  disease_name: string;
  confidence: number;
  treatment: string;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setError(null);
    setResult(null);

    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Invalid file format. Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const clear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const analyze = async () => {
    if (!file) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://cover-2vdr.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error (${res.status}). Please try again later.`);
      }

      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="py-24">
      <div className="max-w-2xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-heading text-center mb-4"
        >
          Upload &amp; Analyze
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12 font-body">
          Drop your crop image below and let AI do the rest.
        </p>

        {/* Dropzone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !preview && inputRef.current?.click()}
          className={`relative glass-card p-8 flex flex-col items-center justify-center min-h-[280px] cursor-pointer transition-all ${
            dragging ? "ring-2 ring-primary border-primary" : ""
          } ${preview ? "cursor-default" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="relative">
                  <img
                    src={preview}
                    alt="Crop preview"
                    className="w-full max-h-80 object-contain rounded-xl"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clear();
                    }}
                    className="absolute top-2 right-2 bg-foreground/70 text-background rounded-full p-1.5 hover:bg-foreground/90 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 text-muted-foreground"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground mb-1">
                    Drag &amp; drop your image here
                  </p>
                  <p className="text-sm">or click to browse · JPG, PNG, WebP · max 10 MB</p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-secondary px-3 py-1.5 rounded-full">
                  <Upload className="w-3 h-3" />
                  Browse files
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl px-4 py-3 text-sm font-body"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analyze Button */}
        {preview && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <button
              onClick={analyze}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing crop health…
                </>
              ) : (
                "Analyze Image"
              )}
            </button>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 glass-card p-6 sm:p-8"
            >
              <h3 className="text-xl font-heading mb-6">Diagnosis Results</h3>

              <div className="grid gap-4">
                {/* Disease Name */}
                <div className="flex items-start gap-4 bg-secondary/60 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-0.5">Disease Detected</p>
                    <p className="font-semibold text-foreground">{result.disease_name}</p>
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex items-start gap-4 bg-secondary/60 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-body mb-0.5">Confidence</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span className="font-semibold text-sm tabular-nums">
                        {result.confidence.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Treatment */}
                <div className="flex items-start gap-4 bg-secondary/60 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Pill className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-0.5">Suggested Treatment</p>
                    <p className="text-sm text-foreground leading-relaxed">{result.treatment}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={clear}
                  className="text-sm font-medium text-primary hover:underline font-body"
                >
                  Analyze another image
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ImageUpload;
