import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {row.Date ? new Date(row.Date).toLocaleDateString() : "-"}
        </TableCell>
        <TableCell>{row.Studio || "-"}</TableCell>
        <TableCell>{row.Name || "-"}</TableCell>
        <TableCell>{row.EventDetails || "-"}</TableCell>
        <TableCell>{row.Payment || 0}</TableCell>
        <TableCell>{row.Description || "-"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Duty Details
              </Typography>
              <Table size="small" aria-label="duty details">
                <TableBody>
                  {Array.isArray(row.Duty) && row.Duty.length > 0 ? (
                    row.Duty.map((duty, index) => {
                      const [key, value] = Object.entries(duty)[0];
                      return (
                        <TableRow key={index}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>No Duty Assigned</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Date: PropTypes.string,
    Studio: PropTypes.string,
    Name: PropTypes.string,
    EventDetails: PropTypes.string,
    Payment: PropTypes.number,
    Description: PropTypes.string,
    Duty: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default function FunctionsDetails() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxUsRMk7IC2Yg1Ik2qrPdF8xEb_2Xzim_cVYHswV5MDJQhVaZzf15gjfxKHB2BAizaB/exec"
        );
        const result = await response.json();
        const sortedData = result.data
          .map((item) => ({
            ...item,
            Date: item.Date ? new Date(item.Date) : null,
          }))
          .sort((a, b) => (a.Date && b.Date ? a.Date - b.Date : 0));
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    `${item.EventDetails} ${item.Name} ${
      item.Date ? new Date(item.Date).toLocaleDateString() : ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Functions Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search functions"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>Studio</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Event Details</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <Row key={index} row={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
