import React from 'react'
import { useSelector } from 'react-redux'

export default function Attendance() {
  let selector = useSelector((state)=>state);
  console.log(selector)
  return (
    <div>Attendance</div>
  )
}
