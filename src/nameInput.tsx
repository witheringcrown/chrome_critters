type NameInputProps = {
    onNameChange?: (newName: string) => void;
};

export default function NameInput({ onNameChange }: NameInputProps) {
  const userInput: string | null = window.prompt('Name your Chrome Creature:');

  if (userInput !== null && userInput.trim() !== "") {
    const trimmed = userInput.trim();  
    onNameChange?.(trimmed);
    return ;
  }
  return <p>No name entered</p>;
}

