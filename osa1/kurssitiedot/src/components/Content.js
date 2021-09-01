import React from 'react'
import Part from './Part'

const Content = (props) => (
  <>
    <Part part={props.part[0]} exercises={props.exercises[0]} />
    <Part part={props.part[1]} exercises={props.exercises[1]} />
    <Part part={props.part[2]} exercises={props.exercises[2]} />
  </>
)

export default Content
