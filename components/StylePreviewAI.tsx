
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const HAIRSTYLES = [
  { name: 'Mid Skin Fade', img: 'https://images.unsplash.com/photo-1599351431247-f579338389b1?auto=format&fit=crop&q=80&w=200' },
  { name: 'Buzz Cut', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200' },
  { name: 'Pompadour', img: 'https://images.unsplash.com/photo-1622286332618-f28bd7c16bb8?auto=format&fit=crop&q=80&w=200' },
  { name: 'Taper Fade', img: 'https://images.unsplash.com/photo-1605497745244-5c32b7020ef8?auto=format&fit=crop&q=80&w=200' },
  { name: 'Afro Fade', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=200' },
  { name: 'Man Bun', img: 'https://images.unsplash.com/photo-1512690196160-7c87026e6093?auto=format&fit=crop&q=80&w=200' },
  { name: 'Crop Top', img: 'https://images.unsplash.com/photo-1621605815841-aa8975485d2e?auto=format&fit=crop&q=80&w=200' },
  { name: 'Mullet', img: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?auto=format&fit=crop&q=80&w=200' }
];

const StylePreviewAI: React.FC = () => {
  const [selectedHairstyle, setSelectedHairstyle] = useState(HAIRSTYLES[0].name);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePreview = async () => {
    if (!uploadedImage) return;
    
    setIsLoading(true);
    setResultImage(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const base64Data = uploadedImage.split(',')[1];
      const mimeType = uploadedImage.split(';')[0].split(':')[1];

      const prompt = `The user has uploaded their personal photo.
Your task is to realistically apply the selected hairstyle to the person in the image.

Selected Hairstyle: ${selectedHairstyle}

STRICT RULES:
- Do NOT change the person’s face.
- Do NOT modify skin tone, facial structure, age, or identity.
- Do NOT change the background.
- Do NOT alter clothing or body position.
- Only modify the hair.

STYLE REQUIREMENTS:
- The haircut must look professionally done.
- Blend naturally with the head shape.
- Apply realistic hairline and fade transitions.
- Match lighting and shadows of the original photo.
- Maintain natural hair texture (straight, wavy, curly, afro depending on original).
- Ensure clean edges and barbershop-quality finish.
- High-resolution, ultra-realistic output.

The final image must look like a real professional haircut photo taken in the same environment.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setResultImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate style preview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-blue-600 uppercase italic tracking-tighter">Style Preview AI</h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Upload your photo and see how you'd look with our trending styles. Driven by advanced neural grooming logic.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Upload & Options */}
          <div className="space-y-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">1. Upload Your Intel</h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center cursor-pointer transition-all group overflow-hidden ${
                  uploadedImage ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} className="max-h-80 mx-auto rounded-xl shadow-lg" alt="Uploaded" />
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl group-hover:scale-110 transition-transform">
                      <i className="fas fa-camera"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Click to upload or drag & drop</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Clear front-facing photo recommended</p>
                    </div>
                  </div>
                )}
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">2. Select Hairstyle Objective</h3>
              <div className="grid grid-cols-4 gap-4">
                {HAIRSTYLES.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedHairstyle(style.name)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                      selectedHairstyle === style.name ? 'border-blue-600 shadow-lg' : 'border-slate-100 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={style.img} className="w-full h-full object-cover" alt={style.name} />
                    <div className={`absolute inset-0 flex items-center justify-center bg-blue-600/60 transition-opacity ${
                      selectedHairstyle === style.name ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <i className="fas fa-check text-white text-xl"></i>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                      <p className="text-[8px] text-white font-black uppercase text-center truncate">{style.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={generatePreview}
              disabled={!uploadedImage || isLoading}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                !uploadedImage || isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing Hairline...
                </>
              ) : (
                <>
                  <i className="fas fa-microchip"></i>
                  Generate Style Preview
                </>
              )}
            </button>
          </div>

          {/* Right Column: Result Output */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl sticky top-24 min-h-[500px] flex flex-col items-center justify-center">
            {isLoading ? (
              <div className="text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                   <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-scissors text-blue-600 text-2xl"></i>
                   </div>
                </div>
                <div>
                   <h4 className="text-white font-black italic uppercase tracking-widest text-sm">Applying {selectedHairstyle}</h4>
                   <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Neural Barbering in Progress...</p>
                </div>
              </div>
            ) : resultImage ? (
              <div className="animate-fade-in space-y-8 w-full text-center">
                 <div className="relative group rounded-3xl overflow-hidden border-4 border-white/10 shadow-3xl">
                   <img src={resultImage} className="w-full h-auto mx-auto" alt="AI Generated Result" />
                   <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase italic tracking-widest shadow-lg">
                     Mission Success
                   </div>
                 </div>
                 <div className="flex gap-4 justify-center">
                   <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = resultImage;
                      link.download = `hairforce-ai-style-${selectedHairstyle.toLowerCase().replace(/\s+/g, '-')}.png`;
                      link.click();
                    }}
                    className="bg-white text-slate-950 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                   >
                     Download Results
                   </button>
                   <button 
                    onClick={() => setResultImage(null)}
                    className="border border-white/10 text-white/50 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
                   >
                     Reset Ops
                   </button>
                 </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-3xl text-white/20">
                    <i className="fas fa-image"></i>
                 </div>
                 <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Preview Output Awaiting Upload</p>
              </div>
            )}
          </div>
        </div>

        {/* Requirements Summary */}
        <div className="bg-blue-600/5 rounded-3xl p-10 border border-blue-600/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: 'Identity Locked', text: 'Face, eyes, and bone structure remain 100% original.', icon: 'fa-user-shield' },
             { title: 'Neural Blending', text: 'AI matches lighting and textures of your environment.', icon: 'fa-brain' },
             { title: 'Barber Finish', text: 'Precision fades and sharp edges as per salon standards.', icon: 'fa-scissors' },
             { title: 'High Res', text: 'Ultra-clear output ready for social sharing.', icon: 'fa-expand' }
           ].map((item, i) => (
             <div key={i} className="space-y-3">
                <div className="text-blue-600 text-xl"><i className={`fas ${item.icon}`}></i></div>
                <h5 className="text-slate-900 font-black uppercase text-xs italic tracking-tight">{item.title}</h5>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{item.text}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StylePreviewAI;
