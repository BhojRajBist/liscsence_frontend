// // Sallybus.js

// import React, { useState } from 'react';
// import { Table, Button, Form } from 'react-bootstrap';

// const Sallybus = () => {
//   const [sallybusData, setSallybusData] = useState([]);
//   const [pdfFile, setPdfFile] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPdfFile(file);
//   };

//   const handleUpload = () => {
//     if (pdfFile) {
//       const newData = [...sallybusData, { sn: sallybusData.length + 1, post: '', pdf: pdfFile }];
//       setSallybusData(newData);
//       setPdfFile(null);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Sallybus Table</h2>
//       <Table striped bordered responsive>
//         <thead>
//           <tr>
//             <th>SN</th>
//             <th>Post</th>
//             <th>Sallybus</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sallybusData.map((row) => (
//             <tr key={row.sn}>
//               <td>{row.sn}</td>
//               <td>{row.post}</td>
//               <td>
//                 {row.pdf ? (
//                   <a href={URL.createObjectURL(row.pdf)} target="_blank" rel="noopener noreferrer">
//                     View PDF
//                   </a>
//                 ) : (
//                   'No PDF'
//                 )}
//               </td>
//               <td>
//                 {row.pdf && (
//                   <Button variant="primary" href={URL.createObjectURL(row.pdf)} download>
//                     Download
//                   </Button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <div className="mt-3">
//         <Form>
//           <Form.Group controlId="post">
//             <Form.Label>Post</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Post"
//               onChange={(e) => {
//                 const newData = [...sallybusData];
//                 newData[sallybusData.length - 1].post = e.target.value;
//                 setSallybusData(newData);
//               }}
//             />
//           </Form.Group>
//           <Form.Group controlId="pdfFile">
//             <Form.File
//               label="Choose PDF"
//               onChange={handleFileChange}
//               accept=".pdf"
//               custom
//             />
//           </Form.Group>
//           <Button variant="success" onClick={handleUpload}>
//             Upload
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Sallybus;

