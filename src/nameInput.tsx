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
    <>
      <h2>Your critter hatched! Give them a name.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={name}
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
    
  );
}