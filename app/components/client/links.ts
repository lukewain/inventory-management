const links = [
  {
    link: "/",
    text: "Home",
    className:
      "bg-white text-black rounded-lg p-1 hover:bg-black hover:text-white",
  },
];

type link = {
  link: string;
  text: string;
  className: string;
};

export { links };
export type { link };
