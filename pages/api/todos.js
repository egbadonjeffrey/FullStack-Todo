export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { body } = req.body;
        data.push({ ...body });
        return res.status(200).json(data);
      } catch (error) {
        res.status(400).json({
          error: error.message,
        });
      }

      break;

    case "GET":
      try {
        const res = await fetch("/api/todos");
        return res.status(200).json(data);
      } catch (error) {
        res.status(400).json({
          error: error.message,
        });
      }

      break;

    default:
      res.status(200).json({ message: "Welcome to Scarlett's API" });
  }
}
