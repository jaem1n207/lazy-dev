import ShortCard from "./short-card";

interface ShortListProps {
  shorts: Queries.HomeQuery["shorts"]["edges"];
}

const ShortList = ({ shorts }: ShortListProps) => {
  return (
    <aside className="aside-scroll foldable:mb-24px pl-36pxr pr-40pxr desktop:pl-24pxr desktop:pr-38pxr foldable:order-2 foldable:mt-48pxr foldable:w-full foldable:px-20pxr">
      <div className="mb-24pxr w-full">
        <h2 className="mb-16pxr text-24pxr font-bold foldable:text-20pxr">Shorts</h2>
        <ul className="flex flex-wrap gap-8pxr">
          {shorts.map((short) => (
            <ShortCard key={short.node.fields?.slug} short={short} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ShortList;
