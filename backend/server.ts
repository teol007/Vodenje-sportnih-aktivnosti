import { app } from "./app";

const PORT = process.env.PORT || 1234;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
