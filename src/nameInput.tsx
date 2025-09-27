import { useState } from 'react';

type NameInputProps = {
  onNameChange?: (newName: string) => void;
};

export default function NameInput({ onNameChange }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitted name:', name);

    if (name.trim() !== "") {
      const trimmed = name.trim();
      onNameChange?.(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}