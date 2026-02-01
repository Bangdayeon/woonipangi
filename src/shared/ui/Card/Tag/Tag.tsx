export interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <div
      className={
        'font-label-sm border-gray100 flex w-fit max-w-full items-center justify-center rounded-lg border bg-white px-2 py-0.5 whitespace-nowrap'
      }
    >
      {text}
    </div>
  );
};

export default Tag;
