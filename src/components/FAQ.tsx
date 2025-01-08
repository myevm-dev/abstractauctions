import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  { question: "What is Abstract Auctions?", answer: "Abstract Auctions is a decentralized platform for creating and participating in auctions on Abstract Chain." },
  { question: "How do I participate in an auction?", answer: "To participate, connect your wallet, browse auctions, and place bids." },
  { question: "What are Bid Credits?", answer: "Bid Credits are a Yield Bearing Version of Wrapped Pengu. This makes all bids in waiting productive and creates better outcomes for auctions." },
  { question: "How do I create an auction?", answer: "Click on 'Create' in the navigation bar, fill in the auction details, and submit it to the blockchain." },
  { question: "Can I Cancel an Auction?", answer: "No, to promote a healthy platform we require all auctions to play out." },
  { question: "Can I Cancel a Bid?", answer: "If your bid is winning, you may not cancel your bid, if you have been outbid you may withdraw your bid." },
  { question: "Are thier Fees on this Platform?", answer: "Auction Creators get charged a 3% Fee on the final bid and all bids get charged a 0.33% fee on submission." },

];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#02de73]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#02de73] rounded-lg p-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            {/* Question */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span className="text-sm text-[#02de73]">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {/* Answer */}
            {activeIndex === index && (
              <p className="mt-4 text-[#02de73]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
