import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 7001;

const start = async () => {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
};

start().then(() => {
    console.log(`Server started on port ${PORT}`);
});
