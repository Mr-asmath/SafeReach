import React from "react";
import { navigateTo } from "./next-navigation";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  replace?: boolean;
};

export default function Link({ href, replace = false, onClick, target, ...props }: LinkProps) {
  return (
    <a
      href={href}
      target={target}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0 ||
          target === "_blank" ||
          href.startsWith("http") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          return;
        }
        event.preventDefault();
        navigateTo(href, replace);
      }}
      {...props}
    />
  );
}
