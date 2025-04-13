import React from "react";

interface SecHeadingProps {
  text: string;
  id?: string;
}

const SecHeading = React.memo(({ text, id }: SecHeadingProps) => {
  return (
    <h2
      id={id}
      className="text-3xl font-extrabold capitalize text-[#1E1E1E] dark:text-white md:text-5xl"
    >
      {text}
    </h2>
  );
});

SecHeading.displayName = "SecHeading";

export default SecHeading;
