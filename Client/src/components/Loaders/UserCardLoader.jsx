import React from "react"
import ContentLoader from "react-content-loader"

const UserCardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#1f1f1f"
    foregroundColor="#606060"
    {...props}
  >
    <circle cx="226" cy="46" r="34" /> 
    <rect x="175" y="86" rx="4" ry="4" width="104" height="12" /> 
    <rect x="195" y="109" rx="2" ry="2" width="68" height="6" /> 
    <rect x="195" y="122" rx="2" ry="2" width="68" height="5" /> 
    <rect x="177" y="135" rx="2" ry="2" width="18" height="13" /> 
    <rect x="220" y="134" rx="2" ry="2" width="19" height="14" /> 
    <rect x="262" y="135" rx="2" ry="2" width="18" height="13" />
  </ContentLoader>
)

export default UserCardLoader
