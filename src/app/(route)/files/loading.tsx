import { Skeleton } from '@/shared/ui/Skeleton';
import { PAGE_SIZE } from '@/widget/FilesPage/constants/paginationOptions';

export default function FilesLoading() {
  return (
    <div className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        {/* title */}
        <Skeleton className="mb-5 h-8 w-48 rounded-lg" />

        {/* searchbar */}
        <Skeleton className="mb-10 h-12 w-full rounded-full" />

        {/* card grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} className="aspect-18/20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
