type NamebarProps = {
  name?: string;
};

export default function Namebar({ name }: NamebarProps) {

  return <h2>Name: {name || "No name yet"}</h2>;
}