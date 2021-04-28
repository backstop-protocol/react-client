import React, { Component } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const TermsOfUseContent = () => {
  const styleProps = {marginBottom: '0.08in', color: '#00000a', textAlign: 'left', fontFamily: '"Times New Roman", serif', fontSize: '15px'}
  return (
    <Document 
        file={require("../assets/Terms.pdf")}>
      <Page scale={1.5} pageNumber={1}/>
      <Page scale={1.5} pageNumber={2}/>
      <Page scale={1.5} pageNumber={3}/>
      <Page scale={1.5} pageNumber={4}/>
    </Document>
  )
};

export default TermsOfUseContent;

// className="item-content-text"
