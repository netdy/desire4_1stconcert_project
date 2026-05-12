export default function Hero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[80vh] flex items-center justify-center text-center px-5 py-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-10 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-top opacity-80"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-brand-bg"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl animate-[fadeIn_1.5s_ease-out]">
        <p className="text-accent text-sm tracking-[3px] uppercase mb-2.5 font-semibold drop-shadow-md">
          BANGKOK &middot; 2026
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-semibold mb-5 [text-shadow:0_0_30px_rgba(212,175,55,0.5)]">
          Eternal Beginning <br /> Desire4 Concert in Bangkok
        </h1>
        <p className="text-base md:text-sm text-gray-200 mb-10 italic font-light leading-relaxed drop-shadow-md">
          &quot;คอนเสิร์ทครั้งแรกของ DESIRE4 ในกรุงเทพฯ <br />
          จะถูกเติมเต็มด้วยความรัก การสนับสนุน และความทรงจำที่แฟน ๆ ร่วมสร้างไปด้วยกัน&quot;
        </p>
      </div>
    </section>
  );
}
