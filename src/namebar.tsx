type NamebarProps = {
  name?: string;
};

export default function Namebar({ name }: NamebarProps) {

  return <h1>{name || "No name yet"}</h1>;
}