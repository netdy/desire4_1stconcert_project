'use client';

import { useState } from 'react';

{/*
        <div className="mb-10">
          <h3 className="text-accent text-sm uppercase tracking-[3px] font-semibold mb-4 text-center">
            ตรวจสอบรายชื่อผู้โดเนท
          </h3>
          <DonorList donors={donors} />
        </div> */}

type Donor = {
  id: number;
  name: string;
  amount: number;
};

export default function DonorList({ donors }: { donors: Donor[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByAmount, setSortByAmount] = useState(false);

  let displayDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortByAmount) {
    displayDonors = displayDonors.slice().sort((a, b) => b.amount - a.amount);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-brand-card border border-brand-border p-4 rounded-lg">
        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Search ..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-[#333] rounded-md py-2 px-4 text-sm text-[#ddd] focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <button
            onClick={() => setSortByAmount(!sortByAmount)}
            className={`text-xs md:text-sm px-4 py-2 rounded-md transition-all border ${
              sortByAmount 
                ? 'bg-accent/10 border-accent text-accent font-semibold' 
                : 'bg-transparent border-[#444] text-[#888] hover:text-[#ddd] hover:border-[#666]'
            }`}
          >
            sort
          </button>
        </div>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-lg overflow-hidden">
        <div className="divide-y divide-[#222]">
          {displayDonors.length > 0 ? displayDonors.map((donor) => (
            <div key={donor.id} className="flex justify-between items-center p-4 hover:bg-[#151515] transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-[#ddd] text-sm md:text-base font-serif">{donor.name}</span>
              </div>
              <div className="text-accent font-bold text-sm md:text-base drop-shadow-md">
                ฿{donor.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-[#888] text-sm">
              {searchTerm ? 'No patrons found matching your search.' : 'No patrons found.'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
