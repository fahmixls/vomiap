import React from "react";

type Variant = "default" | "primary" | "success" | "warning" | "danger";
type Size = "small" | "medium" | "large";

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  description?: string | null;
  className?: string;
  // Enhanced A11y props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  isInteractive?: boolean;
  onActivate?: () => void;
}

const DataCard: React.FC<DataCardProps> = ({
  label,
  value,
  icon = null,
  size = "medium",
  description = null,
  className = "",
  ariaLabel,
  ariaDescribedBy,
  isInteractive = false,
  onActivate,
  ...props
}) => {
  const sizes: Record<Size, { label: string; value: string; icon: string }> = {
    small: {
      label: "text-sm",
      value: "text-xl font-bold",
      icon: "w-5 h-5",
    },
    medium: {
      label: "text-base",
      value: "text-3xl font-bold",
      icon: "w-6 h-6",
    },
    large: {
      label: "text-lg",
      value: "text-6xl font-bold",
      icon: "w-8 h-8",
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  const cardId = `data-card-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const labelId = `${cardId}-label`;
  const valueId = `${cardId}-value`;
  const descId = description ? `${cardId}-description` : undefined;

  const describedBy =
    [ariaDescribedBy, descId].filter(Boolean).join(" ") || undefined;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      isInteractive &&
      onActivate &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onActivate();
    }
  };

  const interactiveProps = isInteractive
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: handleKeyDown,
        onClick: onActivate,
      }
    : {
        role: "region",
        tabIndex: -1,
      };

  return (
    <div
      id={cardId}
      className={`${className}`}
      aria-label={ariaLabel || `${label} data card showing ${value}`}
      aria-describedby={describedBy}
      {...interactiveProps}
      {...props}
    >
      {/* Header with icon and label */}
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div
            className={`${currentSize.icon} text-current`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h3
          id={labelId}
          className={`${currentSize.label} font-semibold opacity-90 text-current m-0`}
        >
          {label}
        </h3>
      </div>

      {/* Main value */}
      <div className="mb-2">
        <p
          id={valueId}
          className={`${currentSize.value} leading-tight text-current m-0`}
          aria-labelledby={labelId}
        >
          {value}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p
          id={descId}
          className="text-sm text-current opacity-80 mt-2 m-0"
          role="note"
        >
          {description}
        </p>
      )}

      {/* Enhanced screen reader content */}
      <div className="sr-only">
        <span>
          Data card: {label} shows value {value}
          {description && `. Additional information: ${description}`}
          {isInteractive && ". Press Enter or Space to activate."}
        </span>
      </div>
    </div>
  );
};

export default DataCard;
