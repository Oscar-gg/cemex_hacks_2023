import { twMerge } from "tailwind-merge";

const Description = ({
  description,
  className,
}: {
  description: string;
  className?: string;
}) => {
  return <h2 className={twMerge("text-gray-600", className)}>{description}</h2>;
};

export default Description;
