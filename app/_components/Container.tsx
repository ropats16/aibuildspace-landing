import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
};

export function Container({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--container-content)] px-6 sm:px-8 lg:px-12 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
