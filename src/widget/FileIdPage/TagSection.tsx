'use client';

import { useRouter } from 'next/navigation';

interface TagSectionProps {
  tags: string[];
}

export default function TagSection({ tags }: TagSectionProps) {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    // 검색어(q) 파라미터에 태그명을 넣어 목록 페이지로 이동
    router.push(`/files?q=${encodeURIComponent(tag)}`);
  };

  return (
    <ul className="flex w-full flex-wrap gap-2" aria-label="태그 목록">
      {tags.map(tag => (
        <li key={tag}>
          <button
            type="button"
            onClick={() => handleTagClick(tag)}
            className="bg-blue50 hover:bg-blue100 flex w-fit cursor-pointer rounded-md px-2 py-0.5 text-sm font-medium transition-colors"
          >
            #{tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
