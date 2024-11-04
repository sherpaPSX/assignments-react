const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }
    setTimeout(() => next(), 3000);
});

server.patch("/items/:id/complete", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const db = router.db;
    const item = db.get("items").find({ id }).value();
    if (item) {
        db.get("items")
            .find({ id })
            .assign({ isDone: req.body.isDone, finishedAt: req.body.isDone ? Date.now() : "" })
            .write();

        res.status(200).json({ message: "Item marked as completed", item });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});
