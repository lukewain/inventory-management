const defaultClassName: string = "rounded-lg p-[6px]";

const links = [
  {
    link: "/",
    text: "Home",
    className: defaultClassName,
  },
  {
    link: "/admin",
    text: "Admin",
    className: defaultClassName,
  },
];

type link = {
  link: string;
  text: string;
  className: string;
};

export { links };
export type { link };
