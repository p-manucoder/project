import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRequest } from "../../serviceCalls";
import Button from "@mui/material/Button";

function createData(a, b, c, d, e, f) {
  return { a, b, c, d, e, f };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Delete"
  ),
  createData(
    "Ice cream sandwich",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Delete"
  ),
  createData("Eclair", "New title", "22-04-2015", "SKIT Road Jaipur", "Delete"),
  createData(
    "Cupcake",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Delete"
  ),
  createData(
    "Gingerbread",
    "New title",
    "22-04-2015",
    "SKIT Road Jaipur",
    "Delete"
  ),
];

export default function Chats() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await getRequest("/admin/chats-data").then((res) => setChats(res.chats));
    };
    getData();
  }, []);
  return (
    <TableContainer sx={{ margin: 4 }} component={Paper}>
      <Table sx={{ minWidth: 450, padding: 20 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-light">
            <TableCell align="center">Person 1</TableCell>
            <TableCell align="center">Person 2</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chats.map((chat) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {chat.user1}
              </TableCell>
              <TableCell align="center">{chat.user2}</TableCell>

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
