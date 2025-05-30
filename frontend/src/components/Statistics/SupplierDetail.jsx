import React, { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { Context } from "../../context/Context";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/joy/Typography";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);

  return (
    <>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th scope="row">{row.ID}</th>
        <td>{row.SupplierName}</td>
        <td>{row.ProductName}</td>
        <td>{row.Quantity}</td>
        <td>{row.TotalBill}</td>
      </tr>
      {open && (
        <tr>
          <td style={{ padding: 0 }} colSpan={6}>
            <Sheet
              variant="soft"
              sx={{
                p: 1,
                pl: 6,
                boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)",
              }}
            >
              <Typography level="body-lg" component="div">
                Detail
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="purchases"
                sx={{
                  "& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)":
                    { textAlign: "center" },
                  "--TableCell-paddingX": "0.5rem",
                }}
              >
                <thead>
                  <tr>
                    <th>Supplier ID</th>
                    <th>Product ID</th>
                    <th>Date</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={row.ID}>
                    <td>{row.SupplierId}</td>
                    <td>{row.ProductId}</td>
                    <td>{dayjs(row.Date).format("MMMM DD, YYYY")}</td>
                    <td>{(row.TotalBill / row.Quantity).toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
          </td>
        </tr>
      )}
    </>
  );
}

export default function SupplierDetail() {
  const { host } = useContext(Context);
  const [Suppliers, setSuppliers] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState();
  const [loading, setLoading] = useState(true);

  const handleChangeSupplier = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const getSuppliers = async () => {
    try {
      const url = `${host}/Supplier/getSuppliers`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const json = await response.json();
        console.log(json);
        setSuppliers(json.suppliers);
        setSelectedSupplier(json.suppliers[0].ID);
        return json;
      }
    } catch (error) {
      console.log("Error occurred:", error);
      return [];
    }
  };

  const getSelectedSupplierDetails = async () => {
    try {
      const url = `${host}/Statistics/getSupplierDetail/${selectedSupplier}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const json = await response.json();
        setSelectedSupplierDetail(json.result);
        setLoading(false);
        return json;
      }
    } catch (error) {
      console.log("Error occurred:", error);
      return [];
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      setLoading(true);
      getSelectedSupplierDetails();
    }
  }, [selectedSupplier]);

  return (
    <>
      {Suppliers && (
        <FormControl fullWidth>
          <InputLabel id="supplier-select-label">Supplier</InputLabel>
          <Select
            labelId="supplier-select-label"
            id="supplier-select"
            value={selectedSupplier || ""}
            label="Supplier ID"
            onChange={handleChangeSupplier}
          >
            {Suppliers.map((Supplier) => (
              <MenuItem key={Supplier.ID} value={Supplier.ID}>
                {Supplier.ID + " " + Supplier.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <div className=" mx-auto my-10 shadow-2xl">
        <Sheet>
          {loading ? (
            <p className="text-xl">Loading...</p>
          ) : (
            <Table
              aria-label="collapsible table"
              sx={{
                "& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)":
                  { textAlign: "center" },
                '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
                  {
                    borderBottom: 0,
                  },
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: 40,
                      backgroundColor: "#1976D2",
                      color: "#FFFFFF",
                    }}
                    aria-label="empty"
                  />
                  <th
                    style={{
                      width: "20%",
                      backgroundColor: "#1976D2",
                      color: "#FFFFFF",
                    }}
                  >
                    Order ID
                  </th>
                  <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                    Product
                  </th>
                  <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                    Supplier
                  </th>
                  <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                    Quantity
                  </th>
                  <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                    Total Price (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedSupplierDetail &&
                  selectedSupplierDetail.map((order, index) => (
                    <Row key={order.ID} row={order} />
                  ))}
              </tbody>
            </Table>
          )}
        </Sheet>
      </div>
    </>
  );
}