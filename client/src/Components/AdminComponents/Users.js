import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRequest } from "../../serviceCalls";
import { Button } from "@mui/material";

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

export default function Users() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const getData = async () => {
      getRequest("/admin/users-data").then((res) => setUsers(res.users));
    };
    getData();
  }, []);
  return (
    <TableContainer sx={{ margin: 4 }} component={Paper}>
      <Table sx={{ minWidth: 450, padding: 20 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Profile Pic</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Mobile Number</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              // key={row.name}
              className="bg-light"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {"profile"}
              </TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell
                align="center"
                style={{ maxWidth: "200px", overflow: "auto" }}
              >
                {user.address}
              </TableCell>
              <TableCell align="center">{user.mobileNumber}</TableCell>
              <TableCell align="center">
                <Button variant="contained">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
