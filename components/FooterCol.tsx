import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

interface FooterColProps {
  title: string;
  links: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

const getIconForLabel = (label: string) => {
  switch (label) {
    case "Facebook":
      return <FaFacebookF size={20} />;
    case "Twitter":
      return <FaTwitter size={20} />;
    case "Instagram":
      return <FaInstagram size={20} />;
    default:
      return null;
  }
};

const FooterCol = ({ title, links }: FooterColProps) => {
  return (
    <div className="flex flex-col gap-4 font-normal">
      <h3
        className="text-[17px] text-[#F6973F]"
      >
        {title}
      </h3>

      <ul
        className="flex flex-col gap-4"
      >
        {links.map((link) => (
          <li key={link.label}>
            <div className="flex items-center gap-2">
              {getIconForLabel(link.label)}

              <Link
                href={link.href}
                className="text-[15px] text-[#1e1e1e] dark:text-white opacity-80 w-full"
              >
                {link.label}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCol;
