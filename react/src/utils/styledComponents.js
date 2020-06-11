import styled from 'styled-components';

export const underNavUnderline = {
  borderBottomWidth: '3px',
  bordeBottomStyle: 'solid',
  borderBottomColor: 'blue',
};


export const Time = styled.p`
color: white !important;
    margin-left: 20px;
    font-size: 24px;
    list-style-type: none;
    border-bottom-color: rgb(14, 14, 31);
    border-bottom-style: solid;
    padding: 5px;
`;

const List = styled.li`
    color: white !important;
    margin-left: 20px;
    font-size: 24px;
    list-style-type: none;
    border-bottom-color: rgb(14, 14, 31);
    border-bottom-style: solid;
    padding: 2px;
    &:hover {
        border-bottom-style: solid;
        border-bottom-color: blue;
        border-bottom-width: 3px;
        cursor: pointer;
    }
    &:active {
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: blue;
    }
`;
// const List = styled.li`
//     color: white !important;
//     margin-left: 20px;
//     font-size: 24px;
//     list-style-type: none;
//     border-bottom-color: rgb(14, 14, 31);
//     border-bottom-style: solid;
//     padding: 5px;
//     &:hover {
//         border-bottom-style: solid;
//         border-bottom-color: blue;
//         border-bottom-width: 3px;
//         cursor: pointer;
//     }
//     &:active {
//         border-bottom-width: 3px;
//         border-bottom-style: solid;
//         border-bottom-color: blue;
//     }
// `;

export default List;
