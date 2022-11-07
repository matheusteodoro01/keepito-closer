import React from "react";
import { Box, CircularProgress, Container } from "@material-ui/core";

export default function Loading() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        minHeight={"490px"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    </Container>
  );
}
