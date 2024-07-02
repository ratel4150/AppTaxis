import { Box, Typography, styled } from '@mui/material';
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';



function QuoteList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <QuoteItem
                quote={quotes[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : null
      }
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
            </ScrollContainer>
          ) : (
            <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}


const Container =styled('div')({
    margin: "8px",
    display: "flex",
    flexDirection: "column",
  });

  const Title = styled('h4')({
    padding: "8px",
    transition: 'background-color ease 0.2s',
    flexGrow: 1,
    userSelect: 'none',
    position: 'relative',
    '&:focus': {
      outline: `2px solid #998dd9`,
      outlineOffset: '2px',
    },
  });


  const Header =styled('div')((isDragging)=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
    backgroundColor: isDragging ? "#E3FCEF" : "#EBECF0",
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: "#E3FCEF",
    },
  }));

function Column({title,quotes,index}) {
    
  return (
    <Draggable draggableId={title} index={index}>
    {(provided, snapshot) => (
      <Container ref={provided.innerRef} {...provided.draggableProps}>
        <Header isDragging={snapshot.isDragging}>
          <Title
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
            aria-label={`${title} quote list`}
          >
            {title}
          </Title>
        </Header>
      {/*   <QuoteList
          listId={title}
          listType="QUOTE"
          style={{
            backgroundColor: snapshot.isDragging ? "#E3FCEF" : null
          }}
          quotes={quotes}
          internalScroll={props.isScrollable}
          isCombineEnabled={Boolean(props.isCombineEnabled)}
          useClone={Boolean(props.useClone)}
        />  */}
      </Container>
    )}
  </Draggable>
  )
}

export default Column