import React from "react"
import ContentLoader from "react-content-loader"

const PeopleCardLoader = (props) => (
    <ContentLoader 
      speed={2}
      width={400}
      height={80}
      viewBox="0 0 400 150"
      backgroundColor="#464849"
      foregroundColor="#949494"
      {...props}
    >
      <circle cx="579" cy="225" r="8" /> 
      <rect x="410" y="215" rx="5" ry="5" width="220" height="10" /> 
      <circle cx="577" cy="224" r="8" /> 
      <rect x="499" y="224" rx="5" ry="5" width="220" height="10" /> 
      <circle cx="576" cy="289" r="8" /> 
      <rect x="529" y="229" rx="5" ry="5" width="220" height="10" /> 
      <circle cx="573" cy="216" r="8" /> 
      <rect x="443" y="210" rx="5" ry="5" width="220" height="10" /> 
      <circle cx="576" cy="217" r="11" /> 
      <circle cx="30" cy="37" r="30" /> 
      <rect x="604" y="219" rx="0" ry="0" width="67" height="18" /> 
      <rect x="544" y="218" rx="0" ry="0" width="65" height="6" /> 
      <rect x="118" y="48" rx="0" ry="0" width="19" height="0" /> 
      <rect x="582" y="219" rx="0" ry="0" width="13" height="3" /> 
      <rect x="578" y="220" rx="0" ry="0" width="28" height="2" /> 
      <rect x="588" y="214" rx="0" ry="0" width="10" height="6" /> 
      <rect x="586" y="218" rx="0" ry="0" width="6" height="5" /> 
      <rect x="346" y="211" rx="0" ry="0" width="1" height="5" /> 
      <rect x="561" y="215" rx="0" ry="0" width="66" height="9" /> 
      <rect x="524" y="193" rx="0" ry="0" width="99" height="58" /> 
      <rect x="528" y="203" rx="0" ry="0" width="79" height="28" /> 
      <rect x="563" y="221" rx="0" ry="0" width="33" height="3" /> 
      <rect x="541" y="196" rx="0" ry="0" width="98" height="53" /> 
      <rect x="568" y="219" rx="0" ry="0" width="31" height="5" /> 
      <rect x="537" y="201" rx="9" ry="9" width="98" height="35" /> 
      <rect x="562" y="217" rx="0" ry="0" width="45" height="12" /> 
      <rect x="537" y="223" rx="0" ry="0" width="81" height="4" /> 
      <rect x="559" y="213" rx="0" ry="0" width="44" height="12" /> 
      <rect x="76" y="14" rx="5" ry="5" width="103" height="12" /> 
      <rect x="77" y="33" rx="5" ry="5" width="72" height="10" /> 
      <rect x="227" y="12" rx="11" ry="11" width="119" height="51" />
    </ContentLoader>
  )
export default PeopleCardLoader
