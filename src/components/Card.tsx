export default ({
  title,
  children,
  className,
}: {
  title: string;
  children: any;
  className?: string;
}) => {
  return (
    <div
      className={`p-5 mt-6 bg-light-50 dark:bg-dark-200 shadow-cardShadow rounded ${className}`}
    >
      <p className="text-dark-50 mb-3 text-xs dark:text-light-50">{title}</p>
      {children}
    </div>
  );
};
