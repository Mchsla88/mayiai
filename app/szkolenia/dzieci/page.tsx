"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sparkles,
  GraduationCap,
  Award,
  Clock,
  Users,
  LogOut,
  ArrowRight,
  Rocket,
} from "lucide-react";
import toast from "react-hot-toast";
import { SimpleLoginForm } from "@/components/simple-login-form";
import { trainingModules } from "./training-modules-data-v2";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Login Form removed - using SimpleLoginForm component instead

// Training Content Component
function TrainingContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeModule, setActiveModule] = useState(trainingModules[0].id);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Szkolenie Online
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wykorzystanie AI do Efektywnej Nauki
              </h1>

              <p className="text-xl text-white/90 mb-6">
                Kompleksowe szkolenie z wykorzystania Claude i Gemini w edukacji
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Table of Contents - Sticky Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3"
              >
                <div className="sticky top-24 space-y-4">
                  <Card className="border-2 border-purple-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-lg">Spis Treści</h3>
                      </div>

                      <nav className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
                  {/* Section 1: Nauka Szkoła Przedmioty */}
                  <div className="px-4 py-2 mt-2 mb-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Nauka Szkoła Przedmioty
                  </div>
                  {trainingModules.slice(0, 10).map((module, index) => (
                    <motion.button
                      key={module.id}
                      onClick={() => scrollToModule(module.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all group ${
                        activeModule === module.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activeModule === module.id
                              ? "bg-white/20"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          <span className="text-sm font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {module.title}
                          </div>
                          <div
                            className={`text-xs flex items-center gap-1 ${
                              activeModule === module.id
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            {module.duration}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}

                  {/* Section 2: Język Polski */}
                  <div className="px-4 py-2 mt-6 mb-1 text-xs font-bold text-gray-500 uppercase tracking-wider border-t border-gray-200 pt-4">
                    Język Polski
                  </div>
                  {trainingModules.slice(10, 12).map((module, i) => {
                    const index = i + 10;
                    return (
                      <motion.button
                        key={module.id}
                        onClick={() => scrollToModule(module.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all group ${
                          activeModule === module.id
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              activeModule === module.id
                                ? "bg-white/20"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {module.title}
                            </div>
                            <div
                              className={`text-xs flex items-center gap-1 ${
                                activeModule === module.id
                                  ? "text-white/80"
                                  : "text-gray-500"
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              {module.duration}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* Section 3: Akademia Przyszłości */}
                  <div className="px-4 py-2 mt-6 mb-1 text-xs font-bold text-gray-500 uppercase tracking-wider border-t border-gray-200 pt-4">
                    Akademia Przyszłości
                  </div>
                  {trainingModules.slice(12).map((module, i) => {
                    const index = i + 12;
                    return (
                      <motion.button
                        key={module.id}
                        onClick={() => scrollToModule(module.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all group ${
                          activeModule === module.id
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              activeModule === module.id
                                ? "bg-white/20"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {module.title}
                            </div>
                            <div
                              className={`text-xs flex items-center gap-1 ${
                                activeModule === module.id
                                  ? "text-white/80"
                                  : "text-gray-500"
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              {module.duration}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Łączny czas:</span>
                    <span className="font-bold text-purple-600">
                      ~76 minut
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Poziom:</span>
                    <span className="font-bold text-purple-600">
                      Początkujący
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download PDF */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-bold text-blue-700 mb-2">
                    Prompty AI
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Pobierz plik z promptami i wyjaśnieniami
                  </p>
                  <a
                    href="/prompty_ai_szkolenie.html"
                    target="_blank"
                    download
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Pobierz PDF z promptami
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.aside>

        {/* Modules Content */}
        <div className="lg:col-span-9 space-y-12">
          {/* Section 1: Nauka Szkoła Przedmioty */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-200"></div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-purple-100">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-purple-900 uppercase tracking-wide">
                    Nauka Szkoła Przedmioty
                  </h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-200"></div>
              </div>
              
              <AnimatePresence mode="wait">
                {trainingModules.slice(0, 10).map((module, index) => (
                  <motion.div
                    key={module.id}
                    ref={(el) => {
                      moduleRefs.current[module.id] = el;
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="scroll-mt-24 mb-12 last:mb-0"
                  >
                    <Card className="border-2 border-purple-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        {/* Module Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                          
                          <div className="relative flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
                                  <span className="font-bold text-lg">
                                    {index + 1}
                                  </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white shadow-black/5 drop-shadow-sm">
                                  {module.title}
                                </h2>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white/90 font-medium pl-1">
                                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                  <Clock className="w-4 h-4" />
                                  {module.duration}
                                </span>
                              </div>
                            </div>

                            {(module.video || (module as any).audio) && (
                              <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg group cursor-pointer hover:scale-110 transition-transform">
                                  <Play className="w-7 h-7 text-white fill-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Module Content Grid */}
                        <div className="flex flex-col">
                          {/* Video First - Full Width */}
                          {module.video ? (
                            <div className="bg-slate-950 flex items-center justify-center p-6 lg:p-10">
                              <div className="w-full max-w-5xl">
                                <div
                                  className="relative bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                                  style={{ aspectRatio: "16/9" }}
                                  onContextMenu={(e) => e.preventDefault()}
                                >
                                  <video
                                    controls
                                    controlsList="nodownload noplaybackrate"
                                    disablePictureInPicture
                                    onContextMenu={(e) => e.preventDefault()}
                                    className="w-full h-full"
                                    poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect fill='%236B21A8' width='1600' height='900'/%3E%3Ctext fill='white' font-size='32' font-family='Arial' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${module.title}%3C/text%3E%3C/svg%3E`}
                                  >
                                    <source
                                      src={module.video}
                                      type="video/mp4"
                                    />
                                    Twoja przeglądarka nie obsługuje
                                    odtwarzacza wideo.
                                  </video>
                                </div>
                                <p className="text-sm text-slate-400 mt-4 text-center flex items-center justify-center gap-2">
                                  <Play className="w-4 h-4" />
                                  Obejrzyj materiał wideo, aby kontynuować
                                </p>
                              </div>
                            </div>
                          ) : (module as any).audio1 &&
                            (module as any).audio2 ? (
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-8">
                              <div className="w-full max-w-4xl">
                                <div className="space-y-6">
                                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                      <Play className="w-10 h-10 text-white fill-white" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2 text-center">
                                      Instrukcja Głosowa 1
                                    </h4>
                                    <p className="text-white/80 mb-6 text-center font-medium">
                                      Podsumowanie i wskazówki praktyczne
                                    </p>
                                    <audio
                                      controls
                                      className="w-full max-w-xl mx-auto"
                                      style={{
                                        filter:
                                          "invert(1) hue-rotate(180deg)",
                                      }}
                                    >
                                      <source
                                        src={(module as any).audio1}
                                        type="audio/mpeg"
                                      />
                                      Twoja przeglądarka nie obsługuje
                                      odtwarzacza audio.
                                    </audio>
                                  </div>
                                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                      <Play className="w-10 h-10 text-white fill-white" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2 text-center">
                                      Instrukcja Głosowa 2
                                    </h4>
                                    <p className="text-white/80 mb-6 text-center font-medium">
                                      Zaawansowane techniki i strategie
                                    </p>
                                    <audio
                                      controls
                                      className="w-full max-w-xl mx-auto"
                                      style={{
                                        filter:
                                          "invert(1) hue-rotate(180deg)",
                                      }}
                                    >
                                      <source
                                        src={(module as any).audio2}
                                        type="audio/mpeg"
                                      />
                                      Twoja przeglądarka nie obsługuje
                                      odtwarzacza audio.
                                    </audio>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (module as any).audio ? (
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-8">
                              <div className="w-full max-w-3xl text-center">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <Play className="w-10 h-10 text-white fill-white" />
                                  </div>
                                  <h4 className="text-2xl font-bold text-white mb-2">
                                    Instrukcja Głosowa
                                  </h4>
                                  <p className="text-white/80 mb-6 font-medium">
                                    Przesłuchaj szczegółową instrukcję głosową
                                    dla tego modułu
                                  </p>
                                  <audio
                                    controls
                                    className="w-full max-w-xl mx-auto"
                                    style={{
                                      filter: "invert(1) hue-rotate(180deg)",
                                    }}
                                  >
                                    <source
                                      src={(module as any).audio}
                                      type="audio/mpeg"
                                    />
                                    Twoja przeglądarka nie obsługuje
                                    odtwarzacza audio.
                                  </audio>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-12 border-b border-purple-100">
                              <div className="text-center">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-purple-100">
                                  <BookOpen className="w-10 h-10 text-purple-600" />
                                </div>
                                <p className="text-purple-900 font-medium">
                                  Ten moduł zawiera materiały tekstowe
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Text Content Below */}
                          <div className="p-8 lg:p-10 bg-white">
                            <div className="training-content max-w-none">
                              {module.content}
                            </div>
                          </div>
                        </div>

                        {/* Module Footer */}
                        <div className="border-t border-gray-100 px-8 py-4 bg-gray-50/50 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <GraduationCap className="w-5 h-5 text-purple-400" />
                            <span>
                              Moduł {index + 1} z {trainingModules.length}
                            </span>
                          </div>
                          {index < trainingModules.length - 1 && (
                            <button 
                              onClick={() => {
                                const nextId = trainingModules[index + 1].id;
                                const element = moduleRefs.current[nextId];
                                if (element) {
                                  const offset = 100;
                                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                  window.scrollTo({
                                    top: elementPosition - offset,
                                    behavior: "smooth",
                                  });
                                }
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
                ))}
              </AnimatePresence>
            </div>

            {/* Section 2: Język Polski */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8 pt-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-200"></div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-purple-100">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-purple-900 uppercase tracking-wide">
                    Język Polski
                  </h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-200"></div>
              </div>

              <AnimatePresence mode="wait">
                {trainingModules.slice(10, 12).map((module, i) => {
                  const index = i + 10;
                  return (
                    <motion.div
                      key={module.id}
                      ref={(el) => {
                        moduleRefs.current[module.id] = el;
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="scroll-mt-24 mb-12 last:mb-0"
                    >
                      <Card className="border-2 border-purple-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0">
                          {/* Module Header */}
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                            
                            <div className="relative flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
                                    <span className="font-bold text-lg">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <h2 className="text-2xl font-bold text-white shadow-black/5 drop-shadow-sm">
                                    {module.title}
                                  </h2>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/90 font-medium pl-1">
                                  <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Clock className="w-4 h-4" />
                                    {module.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-8 lg:p-10 bg-white">
                            <div className="training-content max-w-none">
                              {module.content}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="border-t border-gray-100 px-8 py-4 bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                              <GraduationCap className="w-5 h-5 text-purple-400" />
                              <span>
                                Moduł {index + 1} z {trainingModules.length}
                              </span>
                            </div>
                            {index < trainingModules.length - 1 && (
                            <button 
                              onClick={() => {
                                const nextId = trainingModules[index + 1].id;
                                const element = moduleRefs.current[nextId];
                                if (element) {
                                  const offset = 100;
                                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                  window.scrollTo({
                                    top: elementPosition - offset,
                                    behavior: "smooth",
                                  });
                                }
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
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Section 3: Akademia Przyszłości */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8 pt-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-200"></div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-purple-100">
                  <Rocket className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-purple-900 uppercase tracking-wide">
                    Akademia Przyszłości
                  </h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-200"></div>
              </div>

              <AnimatePresence mode="wait">
                {trainingModules.slice(12).map((module, i) => {
                  const index = i + 12;
                  return (
                    <motion.div
                      key={module.id}
                      ref={(el) => {
                        moduleRefs.current[module.id] = el;
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="scroll-mt-24 mb-12 last:mb-0"
                    >
                      <Card className="border-2 border-purple-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0">
                          {/* Module Header */}
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                            
                            <div className="relative flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
                                    <span className="font-bold text-lg">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <h2 className="text-2xl font-bold text-white shadow-black/5 drop-shadow-sm">
                                    {module.title}
                                  </h2>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/90 font-medium pl-1">
                                  <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Clock className="w-4 h-4" />
                                    {module.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-8 lg:p-10 bg-white">
                            <div className="training-content max-w-none">
                              {module.content}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="border-t border-gray-100 px-8 py-4 bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                              <GraduationCap className="w-5 h-5 text-purple-400" />
                              <span>
                                Moduł {index + 1} z {trainingModules.length}
                              </span>
                            </div>
                            {index < trainingModules.length - 1 && (
                            <button 
                              onClick={() => {
                                const nextId = trainingModules[index + 1].id;
                                const element = moduleRefs.current[nextId];
                                if (element) {
                                  const offset = 100;
                                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                  window.scrollTo({
                                    top: elementPosition - offset,
                                    behavior: "smooth",
                                  });
                                }
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
                  );
                })}
              </AnimatePresence>
            </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* End Video Modal - Full Screen */}
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
