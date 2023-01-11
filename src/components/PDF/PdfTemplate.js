// import { pdf } from '@react-pdf/renderer';
// import React from 'react';
// import  {PDF}  from 'react-pdf';

// const PdfTemplate = () => {
//     function onPdfRender() {
//         const pdf1 = new pdf();
//         pdf1.addHTML(PdfTemplate, () => {
//           pdf1.save('invoice.pdf');
//         });
//       }
//     return (
//         <>
//         <PDF>
//             <div style={{ fontSize: 22, marginBottom: 20 }}>
//                 Invoice
//             </div>
//             <div style={{ marginBottom: 10 }}>
//                 Invoice Number: 
//             </div>
//             <div style={{ marginBottom: 10 }}>
//                 Date: 
//             </div>
//             <div style={{ marginBottom: 10 }}>
//                 Customer Name: 
//             </div>
//             <div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Item</th>
//                             <th>Quantity</th>
//                             <th>Price</th>
//                             <th>Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>
                        
//                     </tbody>
//                 </table>
//             </div>
//             <div style={{ marginTop: 20 }}>
//                 Total: 
//             </div>
            
//         </PDF>
//         <button onClick={onPdfRender}> Generate PDF </button>
//        </> 
        
//     );
// };

// export default PdfTemplate;