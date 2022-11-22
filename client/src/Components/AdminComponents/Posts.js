import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRequest, postRequest } from "../../serviceCalls";
import { Button } from "@mui/material";
import PillTab from "../PillTab";
import toast from "react-hot-toast";

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

export default function Posts() {
  const deletePost = async (postId) => {
    await getRequest(`/admin/delete-post?postId=${postId}`).then((res) => {
      if (res.status == "success") {
        let temp = posts;
        temp = temp.filter((pst) => pst._id !== postId);
        setPosts(temp);
        toast.success("Post Deleted Successfully!");
      } else toast.error("Some Error Occured. Please try Again!");
    });
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      getRequest("/admin/posts-data").then((res) => setPosts(res.posts));
    };
    getData();
  }, []);
  return (
    <TableContainer sx={{ margin: 4 }} component={Paper}>
      <Table sx={{ minWidth: 450, padding: 20 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-light ">
            <TableCell align="center" className="bg-light">
              Images
            </TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Posted On</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              // key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                <div className="admin-img-pages">
                  {post.photos.map((pic) => (
                    <img src={`${pic}`} />
                  ))}
                </div>
              </TableCell>
              <TableCell align="cnter">{post.name}</TableCell>
              <TableCell align="cnter">{post.postedOn.substr(0, 10)}</TableCell>
              <TableCell align="cnter">{post?.location?.address}</TableCell>
              <TableCell align="cnter">
                <PillTab text={post.action} />
              </TableCell>
              <TableCell align="cnter">
                <Button
                  variant="contained"
                  onClick={(e) => deletePost(post._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
