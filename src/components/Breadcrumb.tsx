interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-neutral-500 hover:text-neutral-800 transition-colors font-light uppercase tracking-wider"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-neutral-800 font-light uppercase tracking-wider">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-neutral-300">/</span>
          )}
        </div>
      ))}
    </nav>
  );
}
