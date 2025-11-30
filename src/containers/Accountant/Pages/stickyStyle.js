import styled from 'styled-components';

const TableContainer  = styled.div`
   table {
     tr:nth-child(odd){
          .name{
            position:sticky;
            left:0;
            background: white;
          }
     }
     tr:nth-child(even){
          .name{
            position:sticky;
            left:0;
            background: #f0faff;
          }
     }
   }
`
export {TableContainer}