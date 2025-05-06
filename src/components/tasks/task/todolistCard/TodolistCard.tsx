import styled from "styled-components"
import { Paper } from "@mui/material"
import { AddItemForm } from "../../../addItemForm/AddItemForm.tsx"
import { StyledTextGreetingList } from "../taskStyles/AddTodolistCardStyles.tsx"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import React, { useCallback, useState } from "react"

type TodolistCardProps = {
  addItem: (title: string) => void
}

export const TodolistCard = React.memo((props: TodolistCardProps) => {
  const [editMode, setEditMode] = useState(false)

  const addTodolistGreetingHandler = useCallback((title: string) => props.addItem(title), [props.addItem])

  return (
    <>
      <StyledPaper
        editMode={editMode}
        elevation={3}
        onMouseEnter={() => setEditMode(true)}
        onMouseLeave={() => setEditMode(false)}
      >
        {editMode ? (
          <div>
            <AddItemForm addItem={addTodolistGreetingHandler} />
            <StyledTextGreetingList>Write something</StyledTextGreetingList>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <AddCircleOutlineIcon color={"primary"} style={{ height: "200px", width: "200px" }} />
          </div>
        )}
      </StyledPaper>
    </>
  )
})

interface StyledPaperProps {
  editMode: boolean
}

export const StyledPaper = styled(Paper)<StyledPaperProps>`
  padding: 30px;
  max-width: 376px;
  width: 100%;
  height: 500px;
  position: relative;
`
