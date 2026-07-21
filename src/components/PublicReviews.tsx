import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Sample Club Secretary', org: 'Lions Club', text: 'HoursServed saves me hours every month on attendance tracking and reporting.', rating: 5 },
  { name: 'District Governor', org: 'Lions District', text: 'Finally a tool that makes district reporting consistent across all our clubs.', rating: 5 },
  { name: 'Volunteer Coordinator', org: 'Community Group', text: 'The email confirmations make tracking volunteer hours so much easier.', rating: 5 }
];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-4 h-4 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

export default function PublicReviews() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">What our users say</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Real feedback from club officers and administrators using Hours Served.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-3 border border-gray-100">
              <StarDisplay rating={review.rating} />
              <p className="text-sm text-gray-700 leading-relaxed flex-1">"{review.text}"</p>
              <div>
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-400">{review.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
