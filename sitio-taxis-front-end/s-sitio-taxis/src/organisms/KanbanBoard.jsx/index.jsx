import React from "react";
import reorder, { reorderQuoteMap } from "../../pages/DashBoard/reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, styled } from "@mui/material";
import Column from "./Column";

const Container =styled(Box)({

    backgroundColor: "#4C9AFF",
    minHeight:"100vh",
    minWidth:"100vw",
    display:"inline-flex"
  });

function KanbanBoard({
  isCombineEnabled,
  initial,
  useClone,
  containerHeight,
  withScrollableColumns,
}) {
  const [columns, setColumns] = React.useState(initial);

  const [ordered, setOrdered] = React.useState(Object.keys(initial));
  console.log(ordered);
  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(reorderedorder);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    setColumns(data.quoteMap);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={Boolean(containerHeight)}
          isCombineEnabled={isCombineEnabled}
        >
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {ordered?.map((key, index) => {
                console.log(key);
                return (
                  <Column
                    key={key}
                    index={index}
                    title={key}
                    quotes={columns[key]}
                    isScrollable={withScrollableColumns}
                    isCombineEnabled={isCombineEnabled}
                    useClone={useClone}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default KanbanBoard;
