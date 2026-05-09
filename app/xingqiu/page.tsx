import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLedgerData() {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/14XrIoeA9exnMHG_7UMcHohUYLdUozCwSVVjkCLmxabw/export?format=csv', { 
        cache: 'no-store',
      }
    );

    if (!res.ok) return { totalForm: 0, totalGoal: 30000, goals: [] };

    const csv = await res.text();
    const rows = csv.split(/\r?\n/).filter((row) => row.trim() !== '');

    let totalGoal = 0;
    let totalForm = 0;
    const rawGoalTitles: string[] = [];
    const rawGoalTargets: number[] = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i]
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map((col) => col.replace(/^"|"$/g, '').trim());

      const name = cols[0];
      const amountRaw = cols[1];

      if (name === 'xingqiu Goal') {
        totalGoal = Number(amountRaw?.replace(/[^0-9.-]/g, '')) || 0;
        for (let j = 3; j < cols.length; j++) {
          if (cols[j]) rawGoalTitles[j] = cols[j];
        }
      } else if (name === 'xingqiu Raised') {
        totalForm = Number(amountRaw?.replace(/[^0-9.-]/g, '')) || 0;
        for (let j = 3; j < cols.length; j++) {
          if (cols[j]) rawGoalTargets[j] = Number(cols[j].replace(/[^0-9.-]/g, '')) || 0;
        }
      }
    }

    const dynamicGoals = [];
    let remainingRaised = totalForm;
    let idCounter = 1;

    for (let j = 3; j < Math.max(rawGoalTitles.length, rawGoalTargets.length); j++) {
      const title = rawGoalTitles[j];
      const target = rawGoalTargets[j];
      if (title && target !== undefined) {
        const raised = Math.min(remainingRaised, target);
        remainingRaised = Math.max(0, remainingRaised - target);
        
        dynamicGoals.push({
          id: idCounter++,
          title,
          target,
          raised,
          progress: target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0
        });
      }
    }

    return { totalForm, totalGoal, goals: dynamicGoals };

  } catch (error) {
    console.error('Failed to fetch ledger data', error);
    return { totalForm: 0, totalGoal: 30000, goals: [] };
  }
}

export default async function XingQiuPage() {
  const { totalForm, totalGoal, goals } = await getLedgerData();

  const TOTAL_GOAL = totalGoal;

  return (
    <main className="min-h-screen bg-brand-bg pt-24 pb-20 px-5 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-accent hover:underline mb-10 text-sm">
          &larr; Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-5xl font-semibold mb-4 tracking-wide drop-shadow-sm text-[#986cff] font-serif">
            XingQiu <br />
            Project 
          </h1>
          <p className="text-[#a0a0a0] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            จากความรักและการสนับสนุนของแฟนๆ <br />
            สู่โปรเจกต์พิเศษเพื่อซิงชิวใน DESIRE4 1st Concert in Bangkok
          </p>
        </div>

        {/* Goals + Total Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">

          {/* Main Goal Card */}
          <div className="lg:col-span-3 bg-brand-card border border-brand-border rounded-3xl p-7 md:p-9 shadow-[0_10px_40px_rgba(0,0,0,0.35)] relative overflow-hidden">

            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(92,156,230,0.15),transparent_40%)] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 mb-10">

              <p className="text-[#777] uppercase text-sm md:text-base font-semibold mb-4 tracking-wider">
                ยอดเงินโดเนททั้งหมด
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                <div>
                  <h2 className="text-5xl md:text-7xl font-bold text-[#986cff] leading-none drop-shadow-md">
                     {totalForm.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}฿
                  </h2>

                  <p className="text-[#999] text-base md:text-lg mt-4">
                    เป้าหมายรวมของโปรเจกต์ทั้งหมด
                  </p>
                </div>

                <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl px-6 py-5 min-w-[160px] shadow-lg shadow-black/20">
                  <p className="text-[#666] uppercase text-[10px] md:text-xs mb-2 tracking-widest font-medium">
                    Total Goal
                  </p>

                  <p className="text-accent text-3xl md:text-4xl font-bold tracking-tight">
                    {totalGoal.toLocaleString()}฿
                  </p>
                </div>

              </div>
            </div>

            {/* Goals */}
            <div className="space-y-6 relative z-10">
              {goals.map((goal) => {
                const isCompleted = goal.progress >= 100;

                return (
                  <div key={goal.id} className={`p-5 rounded-2xl transition-all duration-500 border ${isCompleted ? 'bg-accent/[0.03] border-accent/20 shadow-[inset_0_0_20px_rgba(212,175,55,0.03)]' : 'bg-transparent border-transparent p-0'}`}>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className={`text-base md:text-lg tracking-[2px] uppercase font-semibold transition-colors duration-500 ${isCompleted ? 'text-accent drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-white'}`}>
                          {goal.title}
                        </h3>
                        
                        {isCompleted && (
                          <span className="inline-block px-2 py-[2px] rounded bg-accent/20 text-accent border border-accent/50 text-[9px] uppercase font-bold tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.3)] animate-[pulse_3s_ease-in-out_infinite]">
                            Achieved
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <p className={`font-semibold text-sm ${isCompleted ? 'text-accent drop-shadow-md' : 'text-[#986cff]'}`}>
                          {goal.progress}%
                        </p>
                      </div>
                    </div>

                    <p className={`text-sm md:text-base mb-4 ${isCompleted ? 'text-[#aaa]' : 'text-[#777]'}`}>
                      เป้าหมาย ฿{goal.target.toLocaleString()}
                    </p>

                    {/* Progress Bar */}
                    <div className={`w-full h-2.5 rounded-full overflow-hidden border transition-colors duration-500 ${isCompleted ? 'bg-[#111] border-accent/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-[#161616] border-[#222]'}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-[#d4af37] via-[#fff4cc] to-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.6)]' 
                            : 'bg-gradient-to-r from-[#1e3a8a] via-[#4a90e2] to-[#d4af37] shadow-[0_0_8px_rgba(74,144,226,0.3)]'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      >
                        {isCompleted && (
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                        )}
                      </div>
                    </div>

                    <div className={`flex justify-between mt-3 text-xs md:text-sm ${isCompleted ? 'text-[#999]' : 'text-[#777]'}`}>
                      <span>
                        {goal.raised.toLocaleString()}฿
                      </span>

                      <span className={isCompleted ? 'text-accent font-medium' : ''}>
                        {goal.target.toLocaleString()}฿
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Donation Details Section */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-7 md:p-9 shadow-lg mb-14 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-accent mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg">💰</span>
              รายละเอียดการร่วมโดเนท
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bank Account Info */}
              <div className="space-y-4">
                <p className="text-[#aaa] text-sm md:text-base leading-relaxed">
                  สามารถร่วมสนับสนุนโปรเจกต์ได้ที่บัญชีด้านล่างนี้:
                </p>
                <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 space-y-4 shadow-inner">
                  <div>
                    <p className="text-[#666] text-[10px] uppercase tracking-widest mb-1 font-bold">ธนาคาร / Bank</p>
                    <p className="text-white font-medium">กรุงเทพ (Bangkok Bank)</p>
                  </div>
                  <div>
                    <p className="text-[#666] text-[10px] uppercase tracking-widest mb-1 font-bold">เลขบัญชี / Account Number</p>
                    <p className="text-[#986cff] text-2xl md:text-3xl font-bold tracking-wider">098-9-536438</p>
                  </div>
                  <div>
                    <p className="text-[#666] text-[10px] uppercase tracking-widest mb-1 font-bold">ชื่อบัญชี / Account Name</p>
                    <p className="text-white font-medium text-lg">Kamonchanok Kosulawath</p>
                  </div>
                </div>
              </div>

              {/* Links & CTA */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                  <p className="text-[#aaa] text-sm mb-5 leading-relaxed">
                    ติดตามประกาศและรายละเอียดเพิ่มเติมได้ที่ (X):
                  </p>
                  <Link 
                    href="https://x.com/HuangXingTH/status/2018323567864406151?s=20" 
                    target="_blank"
                    className="flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 transition-all py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    ดูบน X
                  </Link>
                </div>
                
                <div className="bg-[#111] p-4 rounded-xl border border-dashed border-[#333]">
                  <p className="text-[#666] text-xs leading-relaxed">
                    *หากโอนแล้วอย่าลืมกรอกฟอร์มกันนะคะ
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
        {/*
        <div className="mb-10">
          <h3 className="text-accent text-sm uppercase tracking-[3px] font-semibold mb-4 text-center">
            ตรวจสอบรายชื่อผู้โดเนท
          </h3>
          <DonorList donors={donors} />
        </div> */}
      </div>
    </main>
  );
}
