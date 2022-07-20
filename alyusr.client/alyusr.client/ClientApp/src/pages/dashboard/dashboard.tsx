import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
export const DashboardPage: FC<{}> = () => {
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    console.log(new Date().toString());
  }, []);
  // useItems();
  return (
    <>
      <p>DashBoard Page</p>
      {/* <input
        type="text"
        onChange={(e) => {
          search.set("query", e.target.value);
          setSearch(search, {
            replace: true,
          });
        }}
      /> */}
    </>
  );
};
// function TestPage1({ query }: { query: string | null }) {
//   return <></>;
// }
// export const TesPage: FC<{ query?: string | null }> = ({ query }) => {
//   return <></>;
// };
// export function useItems() {
//   const [searchParams] = useSearchParams();
//   console.log("item", new Date().toString(), searchParams.get("query"));
// }
