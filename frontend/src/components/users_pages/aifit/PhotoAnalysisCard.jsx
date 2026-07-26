import { Upload, Wand, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const PhotoAnalysisCard = ({
    uploadedImage,
    imageUrl,
    loading,
    formData,
    handleUpload,
    handleFormChange,
    handleAnalyze
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="group">
                <div className="bg-background rounded-2xl shadow-lg border border-border h-full flex flex-col overflow-hidden" data-aos="fade-up" data-aos-delay={100}>
                    <div className="aspect-square w-full relative overflow-hidden bg-muted flex items-center justify-center">
                        {uploadedImage ? (
                            <img
                                src={URL.createObjectURL(uploadedImage)}
                                alt="Uploaded"
                                className="w-full h-full object-contain bg-background"
                            />
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground font-medium">Upload Your Photo</p>
                            </div>
                        )}

                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                                <div className="text-center space-y-3">
                                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
                                    <p className="text-sm font-medium text-muted-foreground">Analyzing...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 flex flex-col gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Full-Body Photo</h3>
                            <p className="text-sm text-muted-foreground">
                                For best AI results, upload a clear photo showing your full body from head to toe.
                            </p>
                        </div>
                        <label className="cursor-pointer">
                            <div className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300">
                                <Upload className="w-5 h-5" />
                                Choose Image
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="hidden"
                            />
                        </label>
                        <div className="text-xs text-slate-500 space-y-1">
                            <p>• File must be in <span className="text-rose-500 font-medium">.jpg or .jpeg</span> format</p>
                            <p>• Full body should be visible (head to toe)</p>
                            <p>• Good lighting and plain background recommended</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className="bg-background rounded-2xl shadow-lg border border-border p-8 flex flex-col" data-aos="fade-up" data-aos-delay={300}>
                <div className="flex items-start gap-4 mb-8">
                    <div className="bg-primary/10 rounded-lg p-3">
                        <Wand className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">AI Analysis</h2>
                        <p className="text-sm text-muted-foreground mt-1">Auto-filled based on your photo</p>
                    </div>
                </div>

                <div className="space-y-5 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-muted-foreground mb-2">Gender</label>
                        <Input
                            placeholder="Detected from photo"
                            value={formData.gender}
                            onChange={(e) => handleFormChange('gender', e.target.value)}
                            className="rounded-lg border-border"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-muted-foreground mb-2">Body Type</label>
                        <Input
                            placeholder="Detected from photo"
                            value={formData.bodyType}
                            onChange={(e) => handleFormChange('bodyType', e.target.value)}
                            className="rounded-lg border-border"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-muted-foreground mb-2">Skin Tone</label>
                        <Input
                            placeholder="Detected from photo"
                            value={formData.skinTone}
                            onChange={(e) => handleFormChange('skinTone', e.target.value)}
                            className="rounded-lg border-border"
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-muted-foreground mb-2">Age</label>
                            <Input
                                placeholder="Age"
                                value={formData.age}
                                onChange={(e) => handleFormChange('age', e.target.value)}
                                className="rounded-lg border-border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-muted-foreground mb-2">Height (cm)</label>
                            <Input
                                placeholder="Height"
                                value={formData.heightCm}
                                onChange={(e) => handleFormChange('heightCm', e.target.value)}
                                className="rounded-lg border-border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-muted-foreground mb-2">Weight (kg)</label>
                            <Input
                                placeholder="Weight"
                                value={formData.weightKg}
                                onChange={(e) => handleFormChange('weightKg', e.target.value)}
                                className="rounded-lg border-border"
                            />
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAnalyze}
                    disabled={loading || !imageUrl}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing Your Style...
                        </span>
                    ) : (
                        'Get Personalized Recommendations'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default PhotoAnalysisCard;
