import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0; // Disable caching to fetch fresh data on every page load

async function getSheetData() {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/14XrIoeA9exnMHG_7UMcHohUYLdUozCwSVVjkCLmxabw/export?format=csv', { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    const csv = await res.text();
    return csv.split('\n');
  } catch (error) {
    console.error("Failed to fetch sheet data", error);
    return null;
  }
}

export default async function Projects() {
  const lines = await getSheetData();

  const getCellValue = (rowIndex: number, defaultVal: number) => {
    if (!lines || lines.length <= rowIndex) return defaultVal;
    
    // Robust parsing for CSV cells that might contain commas (e.g. "$1,234.00")
    const cols = lines[rowIndex].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const val = cols[1]; // Get value from second column (Column B)
    
    if (val === undefined || val.trim() === '') return defaultVal;
    
    // Remove quotes and non-numeric characters for parsing
    const cleanVal = val.replace(/^"|"$/g, '').replace(/[^0-9.-]+/g, '');
    const num = parseFloat(cleanVal);
    return isNaN(num) ? defaultVal : num;
  };

  // Extract from specific rows (0-indexed, so Row 2 is index 1)
  // HuangXing: Goal Row 2, Raised Row 3
  const hxGoal = getCellValue(1, 30000);
  const hxRaised = getCellValue(2, 0);

  // QiuDingJie: Goal Row 5, Raised Row 6
  const qiuGoal = getCellValue(4, 30000);
  const qiuRaised = getCellValue(5, 0);

  // XingQiu: Goal Row 8, Raised Row 9
  const xqGoal = getCellValue(7, 30000);
  const xqRaised = getCellValue(8, 0);

  // JiangLi: Goal Row 11, Raised Row 12
  const jlGoal = getCellValue(10, 30000);
  const jlRaised = getCellValue(11, 0);

  // JiangHeng: Goal Row 14, Raised Row 15
  const jhGoal = getCellValue(13, 30000);
  const jhRaised = getCellValue(14, 0);

  // Lipeien: Goal Row 17, Raised Row 18
  const lpGoal = getCellValue(16, 30000);
  const lpRaised = getCellValue(17, 0);

  // Desire4: Goal Row 20, Raised Row 21
  const d4Goal = getCellValue(19, 30000);
  const d4Raised = getCellValue(20, 0);

  const members = [
    // { 
    //   id: 7, name: 'Desire4', image: '/images/desire4.png',
    //   raised: `${d4Raised.toLocaleString()}฿`, target: `${d4Goal.toLocaleString()}฿`, 
    //   progress: Math.min(100, Math.round((d4Raised / Math.max(1, d4Goal)) * 100)),
    //   href: '/desire4'
    // },
    { 
      id: 1, name: 'HuangXing', image: '/images/huangxing.png',
      raised: `${hxRaised.toLocaleString()}฿`, target: `${hxGoal.toLocaleString()}฿`, 
      progress: Math.min(100, Math.round((hxRaised / Math.max(1, hxGoal)) * 100)),
      href: '/huangxing'
    },
    { 
      id: 2, name: 'QiuDingJie', image: '/images/qiuqiu.png',
      raised: `${qiuRaised.toLocaleString()}฿`, target: `${qiuGoal.toLocaleString()}฿`, 
      progress: Math.min(100, Math.round((qiuRaised / Math.max(1, qiuGoal)) * 100)),
      href: '/qiudingjie'
    },
    { 
      id: 3, name: 'JiangHeng', image: '/images/jiang.png',
      raised: `${jhRaised.toLocaleString()}฿`, target: `${jhGoal.toLocaleString()}฿`, 
      progress: Math.min(100, Math.round((jhRaised / Math.max(1, jhGoal)) * 100)),
      href: '/jiangheng'
    },
    { 
      id: 4, name: 'LiPeien', image: '/images/peien.png',
      raised: `${lpRaised.toLocaleString()}฿`, target: `${lpGoal.toLocaleString()}฿`, 
      progress: Math.min(100, Math.round((lpRaised / Math.max(1, lpGoal)) * 100)),
      href: '/lipeien'
    },
    { 
      id: 5, name: 'XingQiu', image: '/images/xingqiu.png',
      raised: `${xqRaised.toLocaleString()}฿`, target: `${xqGoal.toLocaleString()}฿`, 
      progress: Math.min(100, Math.round((xqRaised / Math.max(1, xqGoal)) * 100)),
      href: '/xingqiu'
    },
    { 
      id: 6, name: 'JiangLi', image: '/images/jiangli.png',
      raised: `${jlRaised.toLocaleString()}฿`, target: `${jlGoal.toLocaleString()}฿`, 
      progress: Math.min(100, Math.round((jlRaised / Math.max(1, jlGoal)) * 100)),
      href: '/jiangli'
    },
  ];

  return (
    <section className="py-4 md:py-8">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-[1.8rem] md:text-4xl text-[#ffb7b2] font-semibold mb-4">
            โปรเจกต์ทั้งหมด
          </h2>
          <p className="text-[0.9rem] text-[#a0a0a0] leading-relaxed">
           โปรเจกต์ทั้งหมดนี้เกิดขึ้นจากความรักและการสนับสนุนของแฟน ๆ 
เพื่อมอบช่วงเวลาที่ดีที่สุดให้กับ DESIRE4 ในคอนเสิร์ตครั้งแรกที่กรุงเทพฯ 
สามารถเลือกแต่ละเมมเบอร์เพื่อดูรายละเอียดโปรเจกต์ ยอดสนับสนุน 
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-8 mx-auto">
          {members.map(member => {
            const CardWrapper = Link;
            const wrapperProps = { href: member.href };

            return (
              <CardWrapper 
                key={member.id} 
                {...(wrapperProps as any)}
                className={`bg-brand-card rounded-xl p-2.5 md:p-8 transition-all duration-300 ease-in-out border border-brand-border cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-accent group flex flex-col items-center text-center ${member.id === 7 ? 'col-span-2 lg:col-span-3 lg:w-[66%] mx-auto w-full' : ''}`}
              >
                <div className="relative w-12 h-12 md:w-28 md:h-28 rounded-full overflow-hidden mb-2 md:mb-6 border-2 border-accent shrink-0 shadow-lg">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 768px) 48px, 112px"
                  />
                </div>
                
                <h3 className="font-serif text-[0.9rem] md:text-2xl font-semibold mb-0.5 md:mb-2 truncate w-full tracking-tight uppercase">{member.name}</h3>
                <div className="text-[#888] text-[9px] md:text-sm uppercase mb-1.5 md:mb-5 tracking-widest">
                  Target: {member.target}
                </div>
                
                <div className="text-accent text-xl md:text-5xl font-bold mb-3 md:mb-6 tracking-tight drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                  {member.raised}
                </div>
                
                <div className="w-full mt-auto">
                  <div className="flex justify-between items-center text-[9px] md:text-sm mb-1 md:mb-2 px-1">
                    <span className="text-[#666] uppercase tracking-widest font-medium">Progress</span>
                    <span className="text-accent font-bold text-sm md:text-lg">{member.progress}%</span>
                  </div>
                  <div className="w-full h-1 md:h-[6px] bg-[#2a2a2a] rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(212,175,55,0.6)]" 
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
