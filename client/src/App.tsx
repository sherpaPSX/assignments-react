import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";

export const App = () => (
    <ThemeProvider>
        <Container>
            <Layout>
                <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
                <List />
                <Footer />
            </Layout>
        </Container>
    </ThemeProvider>
);
