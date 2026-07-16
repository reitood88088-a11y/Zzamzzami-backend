"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // 2초 후 홈 화면으로 이동
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="w-full h-full bg-primary flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center"
      >
        {/* 사용자 커스텀 로고 (하얀색 박스와 로고 크기를 동일하게 맞춤) */}
        <div className="mb-6 w-[160px] h-[160px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex items-center justify-center">
          <Image
            src="/images/final-logo.png"
            alt="짬짬이 로고"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <h1
          className="text-white text-[42px] font-bold leading-[1.1] tracking-[-1.0px] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          짬짬이
        </h1>

        <p
          className="text-white/85 text-[18px] font-normal leading-[1.45] tracking-[-0.2px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          오늘 찍은 문장, 내일 바로 복습
        </p>
      </motion.div>
    </main>
  );
}
