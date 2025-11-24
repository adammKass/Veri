import { FiChevronRight } from "react-icons/fi";

//CTA Button on hero section for better code readibility

const CTAButton = ({ path, text }) => {
  return (
    <a
      href={path}
      className="relative group mt-2 w-fit text-white uppercase font-bold text-2xl overflow-hidden"
    >
      <span className="flex items-center gap-2">
        {/* TEXT */}
        <span className="relative">
          {text}

          {/* Underline that slides out on hover */}
          <span
            className="
          absolute left-0 right-0 bottom-0 h-0.5 bg-current
          transition-all duration-300
          group-hover:translate-x-full group-hover:opacity-0
        "
          />
        </span>

        {/* Arrow circle (hidden before hover) */}
        <span
          className="
        w-8 h-8 rounded-full bg-current flex items-center justify-center
        opacity-0 -translate-x-1.5
        transition-all duration-300
        group-hover:opacity-100 group-hover:translate-x-0
      "
        >
          <FiChevronRight className="w-6 h-6 text-black"></FiChevronRight>
        </span>
      </span>
    </a>
  );
};
export default CTAButton;
