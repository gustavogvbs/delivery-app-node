interface Props {
  name: string;
  city?: string;
}

export const SlugGenereted = ({ name, city }: Props): string => {
  const slug = name
    .replace(" ", "-")
    .concat(city ? "-" : "")
    .concat(city || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return slug;
};
