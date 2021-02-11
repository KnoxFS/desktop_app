import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface CProps {
  onDrop: (files: { name: string; path: string }[]) => void;
}

const Container = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const OverlayContainer = styled.div`
  border: dashed grey 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  z-index: 9999;
`;

const OverlayContent = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  textalign: center;
  color: gray;
  font-size: 36;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DragAndDropContainer: React.FC<CProps> = ({ children, onDrop }) => {
  const dragCounter = useRef(0);

  const [dragging, setDragging] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current += 1;
    if (e?.dataTransfer?.items?.length) {
      setDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current -= 1;
    if (dragCounter.current > 0) return;
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      setDragging(false);
      dragCounter.current = 0;

      const numberOfFiles = e.dataTransfer?.files.length;
      const files = new Array(numberOfFiles).fill(null).map((_, i) => {
        const file = e.dataTransfer?.files?.[i] as any;

        return { name: file.name, path: file.path };
      });

      onDrop(files);

      e.preventDefault();
      e.stopPropagation();
    },
    [onDrop]
  );

  useEffect(() => {
    const divRef = dropRef?.current;

    if (divRef) {
      divRef.addEventListener('dragenter', handleDragIn);
      divRef.addEventListener('dragleave', handleDragOut);
      divRef.addEventListener('dragover', handleDrag);
      divRef.addEventListener('drop', handleDrop);
    }

    return () => {
      divRef?.removeEventListener('dragenter', handleDragIn);
      divRef?.removeEventListener('dragleave', handleDragOut);
      divRef?.removeEventListener('dragover', handleDrag);
      divRef?.removeEventListener('drop', handleDrop);
    };
  }, [handleDragIn, handleDragOut, handleDrop]);

  return (
    <Container ref={dropRef}>
      {dragging && (
        <OverlayContainer>
          <OverlayContent>
            <div>Drop files here</div>
          </OverlayContent>
        </OverlayContainer>
      )}
      {children}
    </Container>
  );
};

export default DragAndDropContainer;
