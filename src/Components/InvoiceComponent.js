import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { encryptStorage } from '../config/Encrypt'
import {Table} from 'react-bootstrap'
function InvoiceComponent() {
    const [invoice, setinvoice] = useState([])
    useEffect(() => {
        axios.post("http://localhost:8899/getinvoice",{id:encryptStorage.getItem('user')[0]._id}).then(
            data=>{
                if(data.data.err=="1"){
                    alert(data.data.msg)
                }
                else{
                    setinvoice(data.data.data)
                }

            }
        )
    }, [])
    return (
        <div style={{padding:"4%"}}>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Invoice link</th>
      <th>Status</th>
      <th>Download</th>
    </tr>
  </thead>
  <tbody>
         {
                        invoice.map((item,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.orderdate}</td>
                                    <td><a href= {`http://localhost:8899/Orderspdf/${item.invoicename}`}  target="_blank" style={{textDecoration:"none"}}>Invoice Link</a></td>
                                    <td style={{color:"red"}}>Pending</td>
                                    <td><a href= {`http://localhost:8899/Orderspdf/${item.invoicename}`}  style={{textDecoration:"none"}} download={"newfile"}>Download </a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default InvoiceComponent
