
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  {
    id: 'projects',
    value: 150,
    suffix: '+',
    label: 'Zrealizowanych projektów',
    icon: Award,
    description: 'Kompleksowych projektów strategicznych dla firm z różnych branż'
  },
  {
    id: 'clients',
    value: 95,
    suffix: '%',
    label: 'Zadowolonych klientów',
    icon: Users,
    description: 'Naszych klientów poleca nasze usługi innym przedsiębiorcom'
  },
  {
    id: 'growth',
    value: 45,
    suffix: '%',
    label: 'Średni wzrost przychodów',
    icon: TrendingUp,
    description: 'To średni wzrost przychodów naszych klientów w pierwszym roku współpracy'
  },
  {
    id: 'experience',
    value: 12,
    suffix: '+',
    label: 'lat doświadczenia',
    icon: Clock,
    description: 'Średnie doświadczenie naszych konsultantów strategicznych'
  }
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView) return;

    const increment = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section-padding bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Nasze <span className="text-yellow-400">Osiągnięcia</span> w Liczbach
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Przez lata budowania marki Strategic Consulting zrealizowaliśmy setki projektów, 
            pomagając polskim firmom osiągać wybitne rezultaty biznesowe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                {/* Icon */}
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-blue-900" />
                </div>

                {/* Number */}
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-blue-100 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Dołącz do Grona Zadowolonych Klientów
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Nasze podejście oparte na partnerstwie, doświadczeniu i praktycznych rozwiązaniach 
              pozwala osiągać wyniki, które przekraczają oczekiwania naszych klientów.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-2">Strategia</div>
                <p className="text-blue-100 text-sm">Planujemy długofalowo z myślą o trwałych rezultatach</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-2">Wykonanie</div>
                <p className="text-blue-100 text-sm">Wspieramy w całym procesie implementacji</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-2">Rezultaty</div>
                <p className="text-blue-100 text-sm">Mierzymy sukces wymiernymi wskaźnikami biznesowymi</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
