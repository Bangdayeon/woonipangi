import Button from '@/shared/ui/Button/Button';
import Dropdown from '@/shared/ui/Dropdown/Dropdown';
import { DropdownOption } from '@/shared/ui/Dropdown/Dropdown';
import { useState } from 'react';

import { Character, Club, College } from './Lists';

const DEFAULT_CHARACTER = Character.find(o => o.value === '우니 & 팡이') ?? Character[0] ?? null;
const DEFAULT_CLUB = Club.find(o => o.value === '전체 동아리') ?? Club[0] ?? null;
const DEFAULT_COLLEGE = College.find(o => o.value === '전체 단과대학') ?? College[0] ?? null;

export default function Filter() {
  const [character, setCharacter] = useState<DropdownOption | null>(DEFAULT_CHARACTER);
  const [club, setClub] = useState<DropdownOption | null>(DEFAULT_CLUB);
  const [college, setCollege] = useState<DropdownOption | null>(DEFAULT_COLLEGE);

  const reset = () => {
    setCharacter(DEFAULT_CHARACTER);
    setClub(DEFAULT_CLUB);
    setCollege(DEFAULT_COLLEGE);
  };

  return (
    <div className="flex w-fit gap-3">
      <Button variant="tertiary" radius="full" label="전체" onClick={reset} />
      <Dropdown options={Character} value={character} onSelect={setCharacter} />
      <Dropdown options={Club} value={club} onSelect={setClub} />
      <Dropdown options={College} value={college} onSelect={setCollege} />
    </div>
  );
}
