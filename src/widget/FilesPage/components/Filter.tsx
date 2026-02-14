import Button from '@/shared/ui/Button/Button';
import Dropdown from '@/shared/ui/Dropdown/Dropdown';
import { DropdownOption } from '@/shared/ui/Dropdown/Dropdown';
import { useState } from 'react';

import { CHARACTER, DEPARTMENT, EVENT, ILLUST } from '../constants/filterOptions';

const DEFAULT_CHARACTER = CHARACTER.find(o => o.value === 'all_character') ?? CHARACTER[0] ?? null;
const DEFAULT_CLUB = DEPARTMENT.find(o => o.value === 'all_department') ?? DEPARTMENT[0] ?? null;
const DEFAULT_EVENT = EVENT.find(o => o.value === 'all_event') ?? EVENT[0] ?? null;
const DEFAULT_ILLUST = ILLUST.find(o => o.value === 'all_illust') ?? ILLUST[0] ?? null;

export default function Filter() {
  const [character, setCharacter] = useState<DropdownOption | null>(DEFAULT_CHARACTER);
  const [club, setClub] = useState<DropdownOption | null>(DEFAULT_CLUB);
  const [event, setEvent] = useState<DropdownOption | null>(DEFAULT_EVENT);
  const [illust, setIllust] = useState<DropdownOption | null>(DEFAULT_ILLUST);

  const reset = () => {
    setCharacter(DEFAULT_CHARACTER);
    setClub(DEFAULT_CLUB);
    setEvent(DEFAULT_EVENT);
    setIllust(DEFAULT_ILLUST);
  };

  return (
    <div className="flex w-fit gap-3">
      <Button variant="tertiary" radius="full" label="전체" onClick={reset} />
      <Dropdown options={CHARACTER} value={character} onSelect={setCharacter} />
      <Dropdown options={DEPARTMENT} value={club} onSelect={setClub} />
      <Dropdown options={EVENT} value={event} onSelect={setEvent} />
      <Dropdown options={ILLUST} value={illust} onSelect={setIllust} />
    </div>
  );
}
