import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";

export default function CommentBox() {
  return (
    <FormControl sx={{ width: "100%" }}>
      <h5>Add a reply</h5>
      <Textarea
        placeholder="Type your reply here…"
        minRows={3}
        endDecorator={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "var(--Textarea-paddingBlock)",
              pt: "var(--Textarea-paddingBlock)",
              borderTop: "1px solid",
              borderColor: "divider",
              flex: "auto",
            }}
          >
            <Button sx={{ ml: "auto" }}>Send</Button>
          </Box>
        }
        sx={{
          width: "100%",
          minWidth: 300,
        }}
      />
    </FormControl>
  );
}
