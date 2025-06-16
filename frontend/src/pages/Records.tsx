/* import { useEffect, useMemo, useRef, useState } from "react";
import type { Register } from "../@types/Register";
import { useGetRecords } from "../hooks/useSendElapsedTime";
import { isAfter, isBefore, isEqual } from "date-fns";
import {
  Alert,
  alpha,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

type SortFieldType = "date" | "time" | "interval";
type SortOrderType = "asc" | "desc"; */

import {
  Alert,
  Box,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import type { Register } from "../@types/Register";
import { useGetRecords } from "../hooks/useSendElapsedTime";
import { useEffect, useRef, useState } from "react";
import { isAfter, isBefore, isEqual } from "date-fns";
import type { Order } from "../@types/Order";
import type { OrderBy } from "../@types/OrderBy";
import type { Heads } from "../components/customTableHeader";
import CustomTableHead from "../components/customTableHeader";

function parseDate(date: string) {
  const [d, m, y] = date.split("/");
  return new Date(Number(y), Number(m) - 1, Number(d));
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof Register>(
  order: Order,
  orderBy: Key
): (a: Register, b: Register) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function Records() {
  const { getAll, loading, error } = useGetRecords();
  const title = useRef<string>("");

  const heads: Heads[] = [
    { id: "1", label: "Tempo", orderName: "interval" },
    { id: "2", label: "Data", orderName: "date" },
    { id: "3", label: "Hora", orderName: "time" },
  ];

  const [records, setRecords] = useState<Register[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Register[]>([]);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<OrderBy>("interval");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [page, setPage] = useState(0);
  const rowsPerPage = useRef<number>(5);
  const totalRegisters = useRef<number>(0);

  useEffect(() => {
    const get = async () => {
      const response = await getAll();
      if (response.data) {
        const recs = response.data.map((r: Register, idx: number) => {
          return {
            id: idx,
            ...r,
          };
        });
        title.current = response.message;
        totalRegisters.current = recs.length;
        setRecords(recs);
      }
    };
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = [...records];
    if (startDate) {
      filtered = filtered.filter((r) => {
        const start = startDate.split("-").reverse().join("/");
        return (
          isAfter(parseDate(r.date), parseDate(start)) ||
          isEqual(parseDate(r.date), parseDate(start))
        );
      });
    }
    if (endDate) {
      filtered = filtered.filter((r) => {
        const end = endDate.split("-").reverse().join("/");
        return (
          isBefore(parseDate(r.date), parseDate(end)) ||
          isEqual(parseDate(r.date), parseDate(end))
        );
      });
    }

    totalRegisters.current = filtered.length;
    
    filtered = filtered
      .sort(getComparator(order, orderBy))
      .slice(
        page * rowsPerPage.current,
        page * rowsPerPage.current + rowsPerPage.current
      );
    setFilteredRecords(filtered);
  }, [order, orderBy, page, rowsPerPage, startDate, endDate, records]);

  const handleStartFilter = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndFilter = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEndDate(event.target.value);
  };

  const handleRequestSort = (_: unknown, value: OrderBy) => {
    const isAsc = orderBy === value && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(value);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage.current - records.length)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {loading && <Alert severity="info">Calculando dados...</Alert>}
      {error && <Alert severity="error">Erro: {error}</Alert>}
      {!loading && !error && (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
            {title.current}
          </Typography>
          <Typography component="label">
            Data Início
            <Input
              value={startDate}
              type="date"
              onChange={handleStartFilter}
              sx={{ m: 2 }}
            />
          </Typography>
          <Typography component="label">
            Data Final
            <Input
              value={endDate}
              type="date"
              onChange={handleEndFilter}
              sx={{ m: 2 }}
            />
          </Typography>
          <>
            <TableContainer>
              <Table sx={{ minWidth: 500 }} aria-labelledby="tableTitle">
                <CustomTableHead
                  heads={heads}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={filteredRecords.length}
                />
                <TableBody>
                  {filteredRecords.length > 0 && filteredRecords.map((row) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.interval}
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.time}</TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredRecords.length == 0 && (
                    <Alert variant="filled" severity="info">Nenhum registro encontrado.<br />Por favor, verifique os filtros.</Alert>
                  )}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={totalRegisters.current}
              rowsPerPage={rowsPerPage.current}
              page={page}
              onPageChange={handleChangePage}
            />
          </>
        </Paper>
      )}
    </Box>
  );
}
