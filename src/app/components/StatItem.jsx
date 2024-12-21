const StatItem = ({ icon, label, value }) => {
  return (
    <div className="flex gap-2 items-center">
      {icon}
      <div className="mr-2 text-base font-semibold flex flex-col ">
        <span className="truncate">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
};

export default StatItem;
