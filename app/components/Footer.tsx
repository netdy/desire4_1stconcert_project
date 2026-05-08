export default function Footer() {
  return (
    <footer className="bg-[#080808] pt-20 pb-10 border-t border-brand-border text-center relative max-md:pt-16 max-md:pb-8">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="max-w-2xl mx-auto mb-20 max-md:mb-12">
          <h2 className="font-serif text-3xl max-md:text-2xl font-semibold mb-2.5">Thank you for being part of this journey</h2>
          <p className="text-sm text-[#888] italic mb-10">
            &quot;เว็บไซต์นี้จัดทำขึ้นเพื่อโปรเจคของ <br/>
HUANGXING THAILAND, QIUDINGJIE HOME TH, OCEANJIANG TH และ JiangLi Lele TH <br/>
เพื่อร่วมกันส่งต่อความรัก การสนับสนุน และความทรงจำอันพิเศษให้กับ DESIRE4 ในคอนเสิร์ตครั้งแรกที่กรุงเทพฯ <br/>
ขอบคุณแฟน ๆ ทุกคนที่ร่วมเป็นส่วนหนึ่งของโปรเจกต์นี้ไปด้วยกันค่ะ&quot;
          </p>
        </div>
        
        <div className="border-t border-[#222] pt-10 flex flex-col items-center gap-4">
          <p className="text-[0.7rem] text-[#666] leading-relaxed mt-2">
            © 2026 DESIRE4 1st Concert in Thailand 
          </p>
        </div>
      </div>
      
      <button className="absolute bottom-10 right-10 max-md:bottom-5 max-md:right-5 w-10 h-10 rounded-full bg-transparent border border-accent text-accent flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-brand-bg">
        <svg xmlns="http://www.w3.org/http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
      </button>
    </footer>
  );
}
