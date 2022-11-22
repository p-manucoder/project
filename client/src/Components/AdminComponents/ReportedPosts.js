import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(a, b, c, d, e, f) {
  return { a, b, c, d, e, f };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Found",
    "Delete"
  ),
  createData(
    "Ice cream sandwich",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Found",
    "Delete"
  ),
  createData(
    "Eclair",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Found",
    "Delete"
  ),
  createData(
    "Cupcake",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Found",
    "Delete"
  ),
  createData(
    "Gingerbread",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Found",
    "Delete"
  ),
];

export default function ReportedPosts() {
  return (
    <TableContainer sx={{ margin: 4 }} component={Paper}>
      <Table sx={{ minWidth: 450, padding: 20 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Images</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Reported On</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Reported By</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.a}
              </TableCell>
              <TableCell align="right">{row.b}</TableCell>
              <TableCell align="right">{row.c}</TableCell>
              <TableCell align="right">{row.d}</TableCell>
              <TableCell align="right">{row.e}</TableCell>
              <TableCell align="right">{row.f}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
