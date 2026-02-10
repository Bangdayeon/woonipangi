import Button from '@/shared/ui/Button/Button';
import Dropdown from '@/shared/ui/Dropdown/Dropdown';
import { DropdownOption } from '@/shared/ui/Dropdown/Dropdown';
import { useState } from 'react';

import { Character, Club, Event, Illust } from './Lists';

const DEFAULT_CHARACTER = Character.find(o => o.value === '전체 캐릭터') ?? Character[0] ?? null;
const DEFAULT_CLUB = Club.find(o => o.value === '전체 동아리') ?? Club[0] ?? null;
const DEFAULT_EVENT = Event.find(o => o.value === '전체 이벤트') ?? Event[0] ?? null;
const DEFAULT_ILLUST = Illust.find(o => o.value === '전체 일러스트') ?? Illust[0] ?? null;

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
      <Dropdown options={Character} value={character} onSelect={setCharacter} />
      <Dropdown options={Club} value={club} onSelect={setClub} />
      <Dropdown options={Event} value={event} onSelect={setEvent} />
      <Dropdown options={Illust} value={illust} onSelect={setIllust} />
    </div>
  );
}
