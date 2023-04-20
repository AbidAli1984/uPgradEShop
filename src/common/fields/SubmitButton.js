import { Button } from "@mui/material";

const SubmitButton = ({ text }) => {
  return (
    <Button
      type="submit"
      sx={{ marginTop: 2 }}
      fullWidth
      variant="contained"
      color="info"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
