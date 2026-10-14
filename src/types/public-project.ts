
export type PublicProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string | null;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
};
