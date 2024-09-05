// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { TableHeaderItems } from "../../constants";
import Pagination from "../../ui/Pagination";

function VersionTable() {
  const { isLoading, products } = useProducts();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // console.log(versions);

  // 1) FILTER
  const filterValue = searchParams.get("Category") || "all";

  let filteredProducts;
  if (filterValue === "all") filteredProducts = products;
  if (filterValue === "Coffee Glass")
    filteredProducts = products.filter(
      (product) => product.product_category === "Coffee Glass"
    );
  if (filterValue === "Tea Glass")
    filteredProducts = products.filter(
      (product) => product.product_category === "Tea Glass"
    );
  if (filterValue === "Juice Glass")
    filteredProducts = products.filter(
      (product) => product.product_category === "Juice Glass"
    );
  if (filterValue === "Glass Pots")
    filteredProducts = products.filter(
      (product) => product.product_category === "Glass Pots"
    );
  if (filterValue === "Decorated Glass")
    filteredProducts = products.filter(
      (product) => product.product_category === "Decorated Glass"
    );

  //  2) SORTING
  const sortBy = searchParams.get("sortBy") || "name";

  const [field, direction] = sortBy.split("-");

  console.log(field, direction);

  const modifier = direction === "asc" ? 1 : -1;

  console.log("modifier is ", modifier);

  const sortedVersions = filteredProducts?.sort((a, b) =>
    typeof a[field] === "string"
      ? a[field].localeCompare(b[field]) * modifier
      : (a[field] - b[field]) * modifier
  );

  console.log(modifier, sortedVersions);

  return (
    <Menus>
      <Table columns={TableHeaderItems.columns}>
        <Table.Header>
          {TableHeaderItems.content.map((headerItem) => (
            <div key={headerItem}>{headerItem}</div>
          ))}
        </Table.Header>
        <Table.Body
          // data={versions}
          // data={filteredProducts}
          data={sortedVersions}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />

        <Table.Footer>
          <Pagination count={15} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VersionTable;
