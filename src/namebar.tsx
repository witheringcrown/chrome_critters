type NamebarProps = {
    onNameChange?: (newName: string) => void;
};

function Namebar({ onNameChange }: NamebarProps) {
    return (
      <p>Name</p>

    );
}

export default Namebar;