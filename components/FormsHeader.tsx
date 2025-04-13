import { useTranslation } from "react-i18next";

const FormsHeader = ({
  title,
  subTitle,
  className,
}: {
  title?: string;
  subTitle: string;
  className?: string;
}) => {
  const { i18n } = useTranslation();
  return (
    <>
      <h1 className={`mb-8 text-center font-extrabold capitalize ${className}`}>
        {title ? title : i18n.language === "ar" ? "بيانات العميل" :"Your customer data for the order"}
      </h1>
      <p className="mb-12 text-center text-base font-medium text-[#262626] dark:text-white lg:text-xl">
        {subTitle}
      </p>
    </>
  );
};

export default FormsHeader;
