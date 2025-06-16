import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import type { Order } from "../@types/Order";
import type { OrderBy } from "../@types/OrderBy";
import { visuallyHidden } from "@mui/utils";

export interface Heads {
  id: string;
  label: string;
  orderName: OrderBy;
}

interface CustomTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, value: OrderBy) => void;
  heads: Heads[];
  order: Order;
  orderBy: OrderBy;
  rowCount: number;
}

export default function CustomTableHead(props: CustomTableProps) {
  const { heads, order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (value: OrderBy) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, value);
    };

  return (
    <TableHead>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          background: "#9b2fb2",
        }}
      >
        {heads.map((head) => (
          <TableCell
            id={head.id}
            padding="normal"
            sortDirection={orderBy === head.orderName ? order : false}
            sx={{ color: "white" }}
          >
            <TableSortLabel
              active={orderBy === head.orderName}
              direction={orderBy === head.orderName ? order : "asc"}
              onClick={createSortHandler(head.orderName)}
              sx={{ color: "white" }}
            >
              <span style={{ color: " white" }}>{head.label}</span>
              {orderBy === head.orderName ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
