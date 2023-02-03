import { Box, Button, TextField } from "@mui/material";

type Props = {
  submitButtonText: string;
  onSubmit: (username: string, password: string) => void;
};

export const SignUpForm: React.FC<Props> = ({ submitButtonText, onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username") as string;
    const password = data.get("password") as string;

    onSubmit(username, password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="username"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {submitButtonText}
      </Button>
    </Box>
  );
};
