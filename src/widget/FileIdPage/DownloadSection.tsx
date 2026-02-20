'use client';

import Button from '@/shared/ui/Button/Button';
import { download } from '@/shared/utils/download';

interface Props {
  id: number;
  title: string;
  fileUrls: string[];
}

export default function DownloadSection({ id, title, fileUrls }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {fileUrls.map((url, index) => {
        const extensionMatch = url.match(/\.(\w+)(\?|$)/);
        const extension = extensionMatch ? extensionMatch[1].toUpperCase() : 'FILE';
        return (
          <Button
            key={`${id}-file-${index}`}
            variant="tertiary"
            onClick={() => download(url, title, extension)}
            size="sm"
            label={`${extension} 다운`}
          />
        );
      })}
    </div>
  );
}
