import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const Table = ({ rows, columns, handleViewClick, handleUpdateClick, handleDeleteClick }) => {
  return (
    <div style={{ height: "80vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        getRowHeight={() => 150}
        components={{
          Toolbar: () => (
            <div style={{ display: "flex" }}>
              <Button onClick={() => handleViewClick(1)}>View</Button>
              <Button onClick={() => handleUpdateClick(1)}>Update</Button>
              <Button onClick={() => handleDeleteClick(1)}>Delete</Button>
            </div>
          ),
        }}
      />
    </div>
  )
}

export default Table
