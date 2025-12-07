"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  BookOpen,
  Play,
  Sparkles,
  GraduationCap,
  Clock,
  ArrowRight,
  Rocket,
  ArrowLeft,
  Brain,
  Palette,
} from "lucide-react";
import { trainingModules } from "./training-modules-data-v2";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

  // Training Content Component
function TrainingContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  // Derive category from URL
  const selectedCategory = searchParams.get('category');
  
  const moduleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToModule = (moduleId: string) => {
    const element = moduleRefs.current[moduleId];
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setActiveModule(moduleId);
    }
  };
  
  const handleCategorySelect = (categoryId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', categoryId);
      // scroll to top when category changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push(`/szkolenia/dzieci?${params.toString()}`);
  }

  const handleReturnToCategories = () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('category');
      router.push(`/szkolenia/dzieci?${params.toString()}`);
  }

  // Define categories and their module indices
  const categories = [
    {
      id: "podstawy",
      title: "Podstawy z AI",
      icon: <Image src="/kids-icon-future.png" alt="Podstawy z AI" width={80} height={80} className="drop-shadow-md" />,
      description: "Zrozum jak działa AI: sieci neuronowe, promptowanie i bezpieczeństwo",
      color: "from-blue-500 to-cyan-600",
      modules: trainingModules.slice(12),
    },
    {
      id: "nauka",
      title: "Nauka Szkoła Przedmioty",
      icon: <Image src="/kids-icon-science.png" alt="Nauka" width={80} height={80}className="drop-shadow-md" />,
      description: "Jak wykorzystać AI do nauki przedmiotów szkolnych",
      color: "from-purple-500 to-indigo-600",
      modules: trainingModules.slice(0, 10),
    },
    {
      id: "polski",
      title: "Język Polski",
      icon: <Image src="/kids-icon-polish.png" alt="Język Polski" width={80} height={80} className="drop-shadow-md" />,
      description: "Lektury, gramatyka i ortografia z pomocą AI",
      color: "from-pink-500 to-rose-600",
      modules: trainingModules.slice(10, 12),
    },
  ];

  const currentCategoryData = categories.find((c) => c.id === selectedCategory);
  const filteredModules = currentCategoryData ? currentCategoryData.modules : [];

  useEffect(() => {
    if (filteredModules.length > 0 && !activeModule) {
      setActiveModule(filteredModules[0].id);
    }
  }, [filteredModules, activeModule]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-24">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 relative z-10">
                {/* Content - Text Only */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-white max-w-4xl mx-auto"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-100">Szkolenie Online</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                    Wykorzystanie AI do <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Efektywnej Nauki</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Kompleksowe szkolenie z wykorzystania Claude i Gemini w edukacji.
                    Wybierz ścieżkę poniżej, aby rozpocząć.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 relative max-w-4xl mx-auto"
                  >
                    <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                      <video
                        controls
                        className="w-full h-full object-cover"
                      >
                        <source src="/ai-w-nauce-praktyczny-przewodnik.mp4" type="video/mp4" />
                        Twoja przeglądarka nie obsługuje wideo.
                      </video>
                    </div>
                  </motion.div>
                </motion.div>
            </div>

        </section>

        {/* Main Content */}
        <section className="py-12 min-h-[600px]">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {!selectedCategory ? (
                /* Category Selection View */
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className="cursor-pointer group"
                    >
                      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                        <CardContent className="p-8 flex flex-col items-center text-center h-full">
                          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {category.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-slate-600 mb-8 leading-relaxed">
                            {category.description}
                          </p>
                          <div className="mt-auto">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                              Rozpocznij moduł <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Modules View */
                <motion.div
                  key="modules"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-8">
                    <Button
                      variant="ghost"
                      onClick={handleReturnToCategories}
                      className="group text-slate-600 hover:text-purple-600 hover:bg-purple-50 pl-0"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      Wróć do wyboru ścieżki
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <motion.aside
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="lg:col-span-3"
                    >
                      <div className="sticky top-24 space-y-4">
                        <Card className="border-slate-200 shadow-md bg-white/80 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${currentCategoryData?.color}`}>
                                    {currentCategoryData?.id === 'nauka' && <Sparkles className="w-5 h-5 text-white" />}
                                    {currentCategoryData?.id === 'polski' && <BookOpen className="w-5 h-5 text-white" />}
                                    {currentCategoryData?.id === 'podstawy' && <Rocket className="w-5 h-5 text-white" />}
                                </div>
                              <h3 className="font-bold text-slate-800 leading-tight">
                                {currentCategoryData?.title}
                              </h3>
                            </div>

                            <nav className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
                              {filteredModules.map((module, index) => {
                                const globalIndex = trainingModules.findIndex(m => m.id === module.id) + 1;
                                return (
                                <button
                                  key={module.id}
                                  onClick={() => scrollToModule(module.id)}
                                  className={`w-full text-left p-3 rounded-xl transition-all group relative overflow-hidden ${
                                    activeModule === module.id
                                      ? "bg-purple-600 text-white shadow-md"
                                      : "hover:bg-purple-50 text-slate-600"
                                  }`}
                                >
                                  <div className="flex items-start gap-3 relative z-10">
                                    <span className={`text-xs font-bold mt-0.5 px-2 py-0.5 rounded-md ${
                                        activeModule === module.id 
                                        ? "bg-white/20 text-white" 
                                        : "bg-slate-100 text-slate-500"
                                    }`}>
                                        {globalIndex}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-medium leading-snug mb-1">
                                        {module.title}
                                      </div>
                                      <div className={`text-xs flex items-center gap-1 ${
                                          activeModule === module.id ? "text-purple-100" : "text-slate-400"
                                      }`}>
                                        <Clock className="w-3 h-3" />
                                        {module.duration}
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              )})}
                            </nav>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.aside>

                    {/* Content */}
                    <div className="lg:col-span-9 space-y-8">
                      {filteredModules.map((module, index) => {
                         const globalIndex = trainingModules.findIndex(m => m.id === module.id) + 1;
                         return (
                        <motion.div
                          key={module.id}
                          ref={(el) => {
                            moduleRefs.current[module.id] = el;
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5 }}
                          className="scroll-mt-28"
                        >
                          <Card className="border-0 shadow-xl overflow-hidden bg-white ring-1 ring-slate-100">
                            <CardContent className="p-0">
                              {/* Header */}
                              <div className={`bg-gradient-to-r ${currentCategoryData?.color} px-8 py-6 text-white`}>
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner border border-white/30">
                                    {globalIndex}
                                  </div>
                                  <div>
                                    <h2 className="text-2xl font-bold text-white shadow-sm">
                                      {module.title}
                                    </h2>
                                    <div className="flex items-center gap-4 mt-1 text-purple-100 text-sm font-medium">
                                        <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full">
                                            <Clock className="w-3.5 h-3.5" />
                                            {module.duration}
                                        </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Media Content */}
                              <div className="bg-slate-950">
                                {module.video ? (
                                  <div className="w-full max-w-5xl mx-auto p-6 lg:p-8">
                                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                                      <video
                                        controls
                                        controlsList="nodownload noplaybackrate"
                                        disablePictureInPicture
                                        onContextMenu={(e) => e.preventDefault()}
                                        className="w-full h-full"
                                        poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect fill='%231e293b' width='1600' height='900'/%3E%3Ctext fill='white' font-size='32' font-family='Arial' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${module.title}%3C/text%3E%3C/svg%3E`}
                                      >
                                        <source src={module.video} type="video/mp4" />
                                        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
                                      </video>
                                    </div>
                                  </div>
                                ) : (module as any).audio1 && (module as any).audio2 ? (
                                  <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800">
                                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                      {[
                                        { src: (module as any).audio1, title: "Instrukcja 1", sub: "Podsumowanie" },
                                        { src: (module as any).audio2, title: "Instrukcja 2", sub: "Zaawansowane" }
                                      ].map((audio, i) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
                                            <Play className="w-6 h-6 fill-current" />
                                          </div>
                                          <h4 className="text-lg font-bold text-white mb-1">{audio.title}</h4>
                                          <p className="text-slate-400 text-sm mb-4">{audio.sub}</p>
                                          <audio controls className="w-full h-8 invert hue-rotate-180">
                                            <source src={audio.src} type="audio/mpeg" />
                                          </audio>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (module as any).audio ? (
                                  <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-md w-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                                                <Play className="w-6 h-6 fill-current" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white">Instrukcja Głosowa</h4>
                                                <p className="text-slate-400 text-sm">Posłuchaj nagrania</p>
                                            </div>
                                        </div>
                                        <audio controls className="w-full h-8 invert hue-rotate-180">
                                            <source src={(module as any).audio} type="audio/mpeg" />
                                        </audio>
                                    </div>
                                  </div>
                                ) : null}
                              </div>

                              {/* Text Content */}
                              <div className="p-8 lg:p-10">
                                <div className="training-content max-w-none prose prose-lg prose-slate prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-purple-600 hover:prose-a:text-purple-700 prose-strong:text-slate-900">
                                  {module.content}
                                </div>
                              </div>

                              {/* Footer */}
                              <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
                                <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    Moduł {globalIndex}
                                </div>
                                {index < filteredModules.length - 1 && (
                                    <button 
                                        onClick={() => {
                                            const nextId = filteredModules[index + 1].id;
                                            scrollToModule(nextId);
                                        }}
                                        className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
                                    >
                                        Następny moduł <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )})}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Main Page Component
export default function SzkoleniePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/szkolenia/dzieci");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <TrainingContent />;
}
