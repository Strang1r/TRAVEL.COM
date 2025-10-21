type AmenityItemProps = {
  icon: React.ReactNode;
  label: string;
};

const AmenityItem = ({ icon, label }: AmenityItemProps) => {
  return (
    <span>
      {icon}
      {label}
    </span>
  );
};

export default AmenityItem;