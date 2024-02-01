interface Props {
  name: string;
  prefix?: string;
}

export const SlugGenereted = ({ name, prefix }: Props): string => {
  const slug = name
    .replace(" ", "-")
    .concat(prefix ? "-" : "")
    .concat(prefix || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return slug;
};
