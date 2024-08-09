import { useState } from "react";
import clsx from "clsx";

type CommentTooltipProps = {
  content: string;
  children: React.ReactNode;
};

function CommentTooltip({ content, children }: CommentTooltipProps) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    left: 0,
    top: 0
  });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    const top = rect.bottom + window.scrollY + 8;

    setTooltipPosition({ left, top });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <>
      <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {isTooltipVisible && (
        <div
          className={clsx(
            "fixed transform -translate-x-1/2 -translate-y-2 mb-2 p-4",
            "bg-gray-800 text-white rounded-lg shadow-lg z-50 max-w-3xl"
          )}
          style={{
            left: `${tooltipPosition.left}px`,
            top: `${tooltipPosition.top}px`
          }}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
      )}
    </>
  );
}

export default CommentTooltip;
