import clsx from 'clsx';

export interface TagProps {
  text: string;
  color: string;
}

const Tag = ({ text, color }: TagProps) => {
  return (
    <div
      className={clsx(
        'font-label-sm flex w-fit items-center justify-center rounded-md px-2 py-1',
        color
      )}
    >
      {text}
    </div>
  );
};

export default Tag;
