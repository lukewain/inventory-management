interface CItem {
  header: string;
  content: string;
  buttonContent: string;
  url: string;
}

const CarouselItems: Array<CItem> = [
  {
    header: "Devices",
    content: "View, modify and create devices!",
    buttonContent: "Manage Devices",
    url: "/admin/devices",
  },
  {
    header: "Users",
    content: "View, modify and create users",
    buttonContent: "Manage Users",
    url: "/admin/users",
  },
];

export type { CItem };
export { CarouselItems };
