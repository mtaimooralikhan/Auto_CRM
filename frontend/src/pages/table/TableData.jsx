import React, { useState,useEffect  } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {tableSlice} from '../../Store/tableSlice';
import { useDispatch } from 'react-redux';
import {deleteCarSlice} from '../../Store/deleteCarSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TableData = () => {
  // const deleteBtn = {backgroundColor: '#FF0000'};
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] =  useState(false); 

  const handleClose = () => {
    setLoading(false);
  };

  const onButtonClick = (e, id, btn) => {
    setLoading(true);
    e.stopPropagation();
    if(btn === "update"){
      navigation(`/car/update-car/${id}`);
      setLoading(false);
    }else if(btn === "delete"){
      dispatch(deleteCarSlice(id)).then((result) => {
        if(result){
          setLoading(false);
          dispatch(tableSlice()).then((result) => {
            if(result){
              setLoading(false);
              console.log("Result", result);
                setTableData(result.payload.data);
            }
          });
          navigation('/list-car');
        }
      });
    }
    //do whatever you want with the row
};

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'color', headerName: 'Color', width: 150 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'make', headerName: 'Make', width: 150 },
        { field: 'registration_no', headerName: 'Registeration No', width: 200 },
        { field: '__v', headerName: 'Version', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
          return (
            <>
              {/* <Button style={deleteBtn}
                onClick={(e) => onButtonClick(e,params.row._id, "delete")}
                variant="contained"
              >
                Delete
              </Button> */}
              <EditIcon onClick={(e) => onButtonClick(e,params.row._id, "update")}/>
              <DeleteIcon onClick={(e) => onButtonClick(e,params.row._id, "delete")}/>
            </>
       
          );
        } }
      ]

      useEffect(() => {
        dispatch(tableSlice()).then((result) => {
          if(result){
            console.log("Result", result);
              setTableData(result.payload.data);
          }
        });
      }, []);

  return (
   <div>
     <DataGrid
      sx={{ flexGrow: 1, p: 3 }}
       rows={tableData}
       columns={columns}
       pageSize={12}
       getRowId={(row) =>  row._id}
     />

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
   </div>
  )
}

export default TableData;